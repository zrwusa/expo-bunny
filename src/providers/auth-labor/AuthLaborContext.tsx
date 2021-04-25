import React from "react";
import {
    AuthContextConfig,
    AuthLaborContextType,
    AuthRes,
    BLResult,
    LoginParams,
    PersistenceAuthParam,
    PersistenceAuthParamKey,
    SignUpParams,
    TriggerType,
    User,
} from "../../types";
import {apiAuth} from "../../helpers/auth-api"
import BunnyConstants, {EBLMsg} from "../../constants/constants";
import {AxiosResponse} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";
import {ANDROID_CLIENT_ID, ANDROID_CLIENT_ID_FOR_EXPO, FACEBOOK_APP_ID, IOS_CLIENT_ID, IOS_CLIENT_ID_FOR_EXPO} from "@env";
import _ from "lodash";
import {blError, blSuccess} from "../../helpers";
import {EventRegister} from "react-native-event-listeners";
// import * as AppAuth from "expo-app-auth";
import {firebase} from "../../firebase/firebase";
import * as Facebook from "expo-facebook";

// // When configured correctly, URLSchemes should contain your REVERSED_CLIENT_ID
// const {URLSchemes} = AppAuth;
// console.log('---URLSchemes', URLSchemes)

const config: AuthContextConfig = {
    loginAPIMethod: 'PUT',
    loginAPIPath: '/auth/login',
    signUpAPIMethod: 'POST',
    signUpAPIPath: '/auth/register',
    refreshAPIMethod: 'PUT',
    refreshAPIPath: '/auth/refresh',
    accessTokenValuePath: 'accessToken',
    accessTokenExpValuePath: 'accessTokenExp',
    refreshTokenValuePath: 'refreshToken',
    refreshTokenExpValuePath: 'refreshTokenExp',
    userValuePath: 'user',
    accessTokenPersistenceKey: BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY,
    accessTokenExpPersistenceKey: BunnyConstants.ACCESS_TOKEN_EXP_PERSISTENCE_KEY,
    refreshTokenPersistenceKey: BunnyConstants.REFRESH_TOKEN_PERSISTENCE_KEY,
    refreshTokenExpPersistenceKey: BunnyConstants.REFRESH_TOKEN_EXP_PERSISTENCE_KEY,
    userPersistenceKey: BunnyConstants.USER_PERSISTENCE_KEY,
    storageType: 'LOCAL_STORAGE',
}

const {
    accessTokenPersistenceKey, accessTokenExpValuePath,
    accessTokenExpPersistenceKey,
    refreshTokenPersistenceKey, refreshTokenExpValuePath, refreshTokenExpPersistenceKey,
    userPersistenceKey,
    loginAPIPath, signUpAPIPath, accessTokenValuePath, refreshAPIMethod,
    loginAPIMethod, signUpAPIMethod, refreshAPIPath, refreshTokenValuePath,
    userValuePath
} = config;


const firebaseResponseDeal = (response: any) => {
    return JSON.parse(JSON.stringify(response))
}


const persistenceAuth = async ({accessToken, refreshToken, user, accessTokenExp, refreshTokenExp}: PersistenceAuthParam) => {
    accessToken && await AsyncStorage.setItem(accessTokenPersistenceKey, accessToken)
    accessTokenExp && await AsyncStorage.setItem(accessTokenExpPersistenceKey, accessTokenExp)
    refreshTokenExp && await AsyncStorage.setItem(refreshTokenExpPersistenceKey, refreshTokenExp)
    refreshToken && await AsyncStorage.setItem(refreshTokenPersistenceKey, refreshToken)
    user && await AsyncStorage.setItem(userPersistenceKey, JSON.stringify(user))
}

const triggerLogin = async (result: BLResult) => {
    const {success, data} = result;
    if (success) {
        await persistenceAuth(data)
    }
    EventRegister.emit('login', result)
    await checkIsLogin()
}

const loginOrSignUp = async (res: any) => {
    let result: BLResult;
    if (!res) {
        result = blError(EBLMsg.NO_AUTH_API_RESPONDED)
        await triggerLogin(result)
        return result;
    }
    const {data} = res;
    if (!data) {
        result = blError(EBLMsg.NO_DATA_RESPONDED)
        await triggerLogin(result)
        return result;
    }
    const accessToken = _.get(data, accessTokenValuePath);
    const refreshToken = _.get(data, refreshTokenValuePath);
    const accessTokenExp = _.get(data, accessTokenExpValuePath);
    const refreshTokenExp = _.get(data, refreshTokenExpValuePath);

    const user = _.get(data, userValuePath);
    if (!(accessToken && refreshToken)) {
        result = blError(EBLMsg.NO_ACCESS_TOKEN_OR_REFRESH_TOKEN_RESPONDED)
        await triggerLogin(result)
        return result;
    }
    if (!user) {
        result = blError(EBLMsg.NO_USER_INFO_RESPONDED)
        await triggerLogin(result)
        return result;
    }

    result = blSuccess({accessToken, accessTokenExp, refreshToken, refreshTokenExp, user})
    await triggerLogin(result)
    return result
}

const bunnyLogin = async (params: LoginParams) => {
    const res = await apiAuth.request<LoginParams, AxiosResponse<AuthRes>>({method: loginAPIMethod, url: loginAPIPath, data: params})
    return await loginOrSignUp(res);
}

const bunnySignUp = async (params: SignUpParams) => {
    const res = await apiAuth.request({method: signUpAPIMethod, url: signUpAPIPath, data: params})
    return await loginOrSignUp(res);
}

const bunnyRefreshAuth = async (): Promise<BLResult> => {
    const refreshToken = await AsyncStorage.getItem(refreshTokenPersistenceKey);
    apiAuth.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`;
    const res = await apiAuth.request({method: refreshAPIMethod, url: refreshAPIPath})
    let result: BLResult;
    if (!res) {
        result = blError(EBLMsg.NO_AUTH_API_RESPONDED)
        EventRegister.emit('bunnyRefreshAuth', result)
        return result
    }
    const {data} = res;
    if (!data) {
        result = blError(EBLMsg.NO_DATA_RESPONDED)
        EventRegister.emit('bunnyRefreshAuth', result)
        return result
    }
    const accessToken = _.get(data, accessTokenValuePath);
    const accessTokenExp = _.get(data, accessTokenExpValuePath);
    if (!accessToken) {
        result = blError(EBLMsg.NO_ACCESS_TOKEN_RESPONDED)
        EventRegister.emit('bunnyRefreshAuth', result)
        return result
    }
    await persistenceAuth({accessToken, accessTokenExp})
    result = blSuccess(accessToken)
    EventRegister.emit('bunnyRefreshAuth', result)
    return result
}

const logOut = async (triggerType?: TriggerType) => {
    const {success, message} = await removePersistenceAuth()
    let result: BLResult;
    if (success) {
        result = blSuccess(true)
        EventRegister.emit('LogOut', result)
        await checkIsLogin()
        if (triggerType) {
            await authTrigger(triggerType)
        }
        return result
    } else {
        result = blError(message)
        EventRegister.emit('LogOut', result)
        await checkIsLogin()
        return result
    }
};

const dummyLogin = async () => {
    const accessToken = 'access_token_dummy';
    const refreshToken = 'refresh_token_dummy';
    const user = {
        email: 'dummy@dummy.com',
        nickname: 'dummy nickname'
    };
    const accessTokenExp = '3043008000000';
    const refreshTokenExp = '3043008000000';
    const result = blSuccess({
        accessToken,
        accessTokenExp,
        refreshToken,
        refreshTokenExp,
        user
    })
    await triggerLogin(result)
    return result
}

const googleLogin = async (isFirebase: boolean) => {
    const googleResponse = await Google.logInAsync({
        iosClientId: `${IOS_CLIENT_ID_FOR_EXPO}`,
        androidClientId: `${ANDROID_CLIENT_ID_FOR_EXPO}`,
        iosStandaloneAppClientId: `${IOS_CLIENT_ID}`,
        androidStandaloneAppClientId: `${ANDROID_CLIENT_ID}`,
    });
    let result: BLResult;
    if (!googleResponse) {
        const result = blError(EBLMsg.NO_GOOGLE_LOGIN_RESULT)
        await triggerLogin(result)
        return result
    }
    switch (googleResponse.type) {
        case 'cancel':
            result = blError(EBLMsg.GOOGLE_LOGIN_CANCELED)
            await triggerLogin(result)
            return result
        case 'success':
            const {idToken, accessToken, refreshToken, user} = googleResponse;
            if (!accessToken || !refreshToken) {
                result = blError(EBLMsg.GOOGLE_ACCESS_TOKEN_OR_REFRESH_TOKEN_NOT_EXISTS)
                await triggerLogin(result)
                return result
            }

            if (isFirebase) {
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
                const firebaseResponse = await firebase.auth().signInWithCredential(credential);
                const firebaseResponseDealt = firebaseResponseDeal(firebaseResponse)
                const result = blSuccess({
                    accessToken: firebaseResponseDealt.user.stsTokenManager.accessToken,
                    refreshToken: firebaseResponseDealt.user.stsTokenManager.refreshToken,
                    accessTokenExp: firebaseResponseDealt.user.stsTokenManager.expirationTime.toString(),
                    user: firebaseResponse.user,
                })
                await triggerLogin(result)
                return result
            } else {
                const result = blSuccess({
                    accessToken,
                    refreshToken,
                    user,
                })
                await triggerLogin(result)
                return result
            }
        default:
            result = blError(EBLMsg.GOOGLE_LOGIN_RESULT_TYPE_INVALID)
            await triggerLogin(result)
            return result
    }
};

const facebookLogin = async (isFirebase: boolean) => {
    let result: BLResult;

    await Facebook.initializeAsync({
        appId: FACEBOOK_APP_ID,
    });
    const facebookResponse = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
    });
    const {type} = facebookResponse;
    switch (type) {
        case 'cancel':
            result = blError(EBLMsg.FACEBOOK_LOGIN_CANCELED)
            await triggerLogin(result)
            return result
        case 'success':
            // @ts-ignore
            const {token} = facebookResponse;
            if (isFirebase) {
                const credential = firebase.auth.FacebookAuthProvider.credential(token);
                const firebaseResponse = await firebase.auth().signInWithCredential(credential)
                const firebaseResponseDealt = firebaseResponseDeal(firebaseResponse)

                const result = blSuccess({
                    accessToken: firebaseResponseDealt.user.stsTokenManager.accessToken,
                    refreshToken: firebaseResponseDealt.user.stsTokenManager.refreshToken,
                    accessTokenExp: firebaseResponseDealt.user.stsTokenManager.expirationTime.toString(),
                    user: firebaseResponseDealt.user,
                })
                await triggerLogin(result)
                return result
            } else {
                // todo accessToken refreshToken not correct
                // Get the user's name using Facebook's Graph API
                const facebookGetMeResponse = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                const user = await facebookGetMeResponse.json()

                const result = blSuccess({
                    accessToken: token,
                    user,
                })
                await triggerLogin(result)
                return result
            }

        default :
            result = blError(EBLMsg.FACEBOOK_LOGIN_RESULT_TYPE_INVALID)
            await triggerLogin(result)
            return result
    }
};

const firebaseEmailLogin = async (email: string, password: string) => {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password)
    let result: BLResult;
    if (!response || !response.user) {
        result = blError(EBLMsg.FIREBASE_EMAIL_LOGIN_NO_RESPONSE_OR_USER)
        await triggerLogin(result)
        return result
    }
    const stringifyRes = firebaseResponseDeal(response)

    const uid = response.user.uid
    const usersRef = firebase.firestore().collection('users')
    const firestoreDocument = await usersRef.doc(uid).get()
    if (!firestoreDocument.exists) {
        result = blError(EBLMsg.FIREBASE_EMAIL_LOGIN_NOT_EXIST_USER)
        await triggerLogin(result)
        return result
    }
    const user = firestoreDocument.data();
    result = blSuccess({
        accessToken: stringifyRes.user.stsTokenManager.accessToken,
        accessTokenExp: stringifyRes.user.stsTokenManager.expirationTime.toString(),
        refreshToken: stringifyRes.user.stsTokenManager.refreshToken,
        user
    })
    await triggerLogin(result)
    return result
}

const firebaseEmailSignUp = async (email: string, password: string) => {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
    let result: BLResult;
    if (!response || !response.user) {
        result = blError(EBLMsg.FIREBASE_EMAIL_SIGN_UP_NO_RESPONSE_OR_USER)
        await triggerLogin(result)
        return result
    }
    const stringifyRes = firebaseResponseDeal(response)
    const uid = stringifyRes.user.uid
    const data = {
        id: uid,
        email: email,
    };
    const usersRef = firebase.firestore().collection('users')
    await usersRef.doc(uid).set(data);
    result = blSuccess({
        accessToken: stringifyRes.user.stsTokenManager.accessToken,
        accessTokenExp: stringifyRes.user.stsTokenManager.expirationTime.toString(),
        refreshToken: stringifyRes.user.stsTokenManager.refreshToken,
        user: stringifyRes.user
    })
    await triggerLogin(result)
    return result

}

const firebaseSendOTP = async (phoneInfoOptions: firebase.auth.PhoneInfoOptions | string,
                               applicationVerifier: firebase.auth.ApplicationVerifier) => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneInfoOptions,
        // @ts-ignore
        applicationVerifier
    );
    return blSuccess({verificationId})
}

const firebaseConfirmOTP = async (verificationId: string, verificationCode: string) => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
    );
    const firebasePhoneResponse = await firebase.auth().signInWithCredential(credential)
    const firebaseResponseDealt = firebaseResponseDeal(firebasePhoneResponse)

    const result = blSuccess({
        accessToken: firebaseResponseDealt.user.stsTokenManager.accessToken,
        refreshToken: firebaseResponseDealt.user.stsTokenManager.refreshToken,
        accessTokenExp: firebaseResponseDealt.user.stsTokenManager.expirationTime.toString(),
        user: firebaseResponseDealt.user,
    })
    await triggerLogin(result)
    return result
}

const firebaseResetPassword = async (email: string) => {
    await firebase.auth().sendPasswordResetEmail(email)
    return blSuccess(true)
}

const removePersistenceAuth = async (authParam?: PersistenceAuthParamKey[]) => {
    if (authParam && authParam.length > 0) {
        authParam.includes('accessToken') && await AsyncStorage.removeItem(accessTokenPersistenceKey)
        authParam.includes('accessTokenExp') && await AsyncStorage.removeItem(accessTokenExpPersistenceKey)
        authParam.includes('refreshToken') && await AsyncStorage.removeItem(refreshTokenPersistenceKey)
        authParam.includes('refreshTokenExp') && await AsyncStorage.removeItem(refreshTokenExpPersistenceKey)
        authParam.includes('user') && await AsyncStorage.removeItem(userPersistenceKey)
        return blSuccess(true)
    }
    await AsyncStorage.removeItem(accessTokenPersistenceKey)
    await AsyncStorage.removeItem(accessTokenExpPersistenceKey)
    await AsyncStorage.removeItem(refreshTokenExpPersistenceKey)
    await AsyncStorage.removeItem(refreshTokenPersistenceKey)
    await AsyncStorage.removeItem(userPersistenceKey)
    return blSuccess(true)
}


const getPersistenceAuth = async () => {
    const accessToken = await AsyncStorage.getItem(accessTokenPersistenceKey)
    const refreshToken = await AsyncStorage.getItem(refreshTokenPersistenceKey)
    const user = await AsyncStorage.getItem(userPersistenceKey)
    const accessTokenExp = await AsyncStorage.getItem(accessTokenExpPersistenceKey)
    const refreshTokenExp = await AsyncStorage.getItem(refreshTokenExpPersistenceKey)
    return {accessToken, accessTokenExp, refreshToken, refreshTokenExp, user: user ? JSON.parse(user) as User : null};
}

const authTrigger = (triggerType: TriggerType) => {
    EventRegister.emit('authTrigger', triggerType)
}

const checkTokenExp = () => {
    const itvID = setInterval(async () => {
        const refreshTokenExp = await AsyncStorage.getItem(refreshTokenExpPersistenceKey)
        const now = new Date()
        let exp = new Date(0);
        if (refreshTokenExp) {
            exp.setUTCSeconds(parseInt(refreshTokenExp));
            if (now > exp) {
                await logOut('AUTO')
                // clearInterval(itvID)
            }
        }
    }, 1000)
}


const checkIsLogin = async () => {
    const {accessToken} = await getPersistenceAuth()
    let isLogin = !!accessToken;
    EventRegister.emit('checkIsLogin', blSuccess(isLogin))
    return isLogin;
}


export const authLaborContext: AuthLaborContextType = {
    authFunctions: {
        bunnyLogin,
        googleLogin,
        facebookLogin,
        firebaseSendOTP,
        firebaseConfirmOTP,
        firebaseEmailLogin,
        firebaseEmailSignUp,
        firebaseResetPassword,
        dummyLogin,
        logOut,
        bunnySignUp,
        bunnyRefreshAuth,
        getPersistenceAuth,
        authTrigger
    },
    authResult: {
        isLogin: false,
        accessToken: '',
        refreshToken: '',
        user: {},
        triggerUUID: '',
        triggerType: undefined,
        triggerReference: ''
    }
}

export const AuthLaborContext = React.createContext<AuthLaborContextType>(authLaborContext);
