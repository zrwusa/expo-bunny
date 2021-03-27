import React from "react";
import {AuthContextConfig, AuthLaborContextType, AuthRes, BLResult, TriggerType, SignInParams, SignUpParams, User,} from "../../types";
import {apiAuth} from "../../helpers/auth-api"
import BunnyConstants, {EBLMsg} from "../../constants/constants";
import {AxiosResponse} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";
import {ANDROID_CLIENT_ID, ANDROID_CLIENT_ID_FOR_EXPO, IOS_CLIENT_ID, IOS_CLIENT_ID_FOR_EXPO} from "@env";
import _ from "lodash";
import {blError, blSuccess} from "../../helpers";
import {EventRegister} from "react-native-event-listeners";


const config: AuthContextConfig = {
    signInAPIMethod: 'PUT',
    signInAPIPath: '/auth/login',
    registerAPIMethod: 'POST',
    registerAPIPath: '/auth/register',
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
    signInAPIPath, registerAPIPath, accessTokenValuePath, refreshAPIMethod,
    signInAPIMethod, registerAPIMethod, refreshAPIPath, refreshTokenValuePath,
    userValuePath
} =
    config;


const signInOrSignUp = async (res: any) => {
    if (!res) {
        return blError(EBLMsg.NO_AUTH_API_RESPONDED)
    }
    const {data} = res;
    if (!data) {
        await checkIsSignedInAndSyncToProvider()
        return blError(EBLMsg.NO_DATA_RESPONDED)
    }
    const accessToken = _.get(data, accessTokenValuePath);
    const refreshToken = _.get(data, refreshTokenValuePath);
    const accessTokenExp = _.get(data, accessTokenExpValuePath);
    const refreshTokenExp = _.get(data, refreshTokenExpValuePath);

    const user = _.get(data, userValuePath);
    if (!(accessToken && refreshToken)) {
        await checkIsSignedInAndSyncToProvider()
        return blError(EBLMsg.NO_ACCESS_TOKEN_OR_REFRESH_TOKEN_RESPONDED)
    } else {
        await AsyncStorage.setItem(accessTokenPersistenceKey, accessToken)
        await AsyncStorage.setItem(refreshTokenPersistenceKey, refreshToken)
        await AsyncStorage.setItem(accessTokenExpPersistenceKey, accessTokenExp.toString())
        await AsyncStorage.setItem(refreshTokenExpPersistenceKey, refreshTokenExp.toString())
    }
    if (!user) {
        await checkIsSignedInAndSyncToProvider()
        return blError(EBLMsg.NO_USER_INFO_RESPONDED)
    } else {
        await AsyncStorage.setItem(userPersistenceKey, JSON.stringify(user))
    }
    const result = {accessToken, refreshToken, user, isSignedIn: true}
    await checkIsSignedInAndSyncToProvider()
    return blSuccess(result)
}

const signIn = async (params: SignInParams) => {
    const res = await apiAuth.request<SignInParams, AxiosResponse<AuthRes>>({method: signInAPIMethod, url: signInAPIPath, data: params})
    const inOrUpResult = await signInOrSignUp(res);
    if (inOrUpResult.success) {
        EventRegister.emit('signInSuccess', inOrUpResult.data)
    }
    return inOrUpResult;
}

const signInDummy = async () => {
    const accessToken = 'access_token_dummy';
    const refreshToken = 'refresh_token_dummy';
    const user = {email: 'dummy@dummy.com', nickname: 'dummy nickname'};
    await AsyncStorage.setItem(accessTokenPersistenceKey, 'access_token_dummy')
    await AsyncStorage.setItem(refreshTokenPersistenceKey, 'refresh_token_dummy')
    await AsyncStorage.setItem(accessTokenExpPersistenceKey, '3043008000000')
    await AsyncStorage.setItem(refreshTokenExpPersistenceKey, '3043008000000')
    await AsyncStorage.setItem(userPersistenceKey, JSON.stringify(user))
    const result = {
        accessToken,
        refreshToken,
        user,
        isSignedIn: true
    }
    EventRegister.emit('signInDummySuccess', result)
    await checkIsSignedInAndSyncToProvider()
    return blSuccess(result)
};

const signInGoogle = async () => {
    const loginResult = await Google.logInAsync({
        iosClientId: `${IOS_CLIENT_ID_FOR_EXPO}`,
        androidClientId: `${ANDROID_CLIENT_ID_FOR_EXPO}`,
        iosStandaloneAppClientId: `${IOS_CLIENT_ID}`,
        androidStandaloneAppClientId: `${ANDROID_CLIENT_ID}`,
    });
    if (!loginResult) {
        return blError(EBLMsg.NO_GOOGLE_LOGIN_RESULT)
    }

    switch (loginResult.type) {
        case "cancel":
            await checkIsSignedInAndSyncToProvider()
            return blError(EBLMsg.GOOGLE_LOGIN_CANCELED)
        case "success":
            const {accessToken, refreshToken, user} = loginResult;
            if (!accessToken || !refreshToken) {
                await checkIsSignedInAndSyncToProvider()
                return blError(EBLMsg.GOOGLE_ACCESS_TOKEN_OR_REFRESH_TOKEN_NOT_EXISTS)
            }
            await AsyncStorage.setItem(accessTokenPersistenceKey, accessToken)
            await AsyncStorage.setItem(refreshTokenPersistenceKey, refreshToken)
            await AsyncStorage.setItem(userPersistenceKey, JSON.stringify(user))
            const result = {
                accessToken,
                refreshToken,
                user,
                isSignedIn: true
            }
            EventRegister.emit('signInGoogleSuccess', result)
            await checkIsSignedInAndSyncToProvider()
            return blSuccess(result)
        default:
            await checkIsSignedInAndSyncToProvider()
            return blError(EBLMsg.GOOGLE_LOGIN_RESULT_TYPE_INVALID)
    }
};

const signUp = async (params: SignUpParams) => {
    const res = await apiAuth.request({method: registerAPIMethod, url: registerAPIPath, data: params})
    const inOrUpResult = await signInOrSignUp(res);
    if (inOrUpResult.success) {
        EventRegister.emit('signUpSuccess', inOrUpResult.data)
    }
    return inOrUpResult;
}

const signOut = async (triggerType?: TriggerType) => {
    await AsyncStorage.removeItem(accessTokenPersistenceKey);
    await AsyncStorage.removeItem(refreshTokenPersistenceKey);
    await AsyncStorage.removeItem(userPersistenceKey);
    await AsyncStorage.removeItem(accessTokenExpPersistenceKey)
    await AsyncStorage.removeItem(refreshTokenExpPersistenceKey)
    EventRegister.emit('signOutSuccess', true)
    await checkIsSignedInAndSyncToProvider()
    if (triggerType) {
        await authTrigger(triggerType)
    }
    return blSuccess(true)
};

const refreshAuth = async (): Promise<BLResult> => {
    const refreshToken = await AsyncStorage.getItem(refreshTokenPersistenceKey);
    apiAuth.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`;
    const res = await apiAuth.request({method: refreshAPIMethod, url: refreshAPIPath})
    if (!res) {
        await checkIsSignedInAndSyncToProvider()
        return blError(EBLMsg.NO_AUTH_API_RESPONDED)
    }
    const {data} = res;
    if (!data) {
        await checkIsSignedInAndSyncToProvider()
        return blError(EBLMsg.NO_DATA_RESPONDED)
    }
    const accessToken = _.get(data, accessTokenValuePath);
    const accessTokenExp = _.get(data, accessTokenExpValuePath);
    if (!accessToken) {
        await checkIsSignedInAndSyncToProvider()
        return blError(EBLMsg.NO_ACCESS_TOKEN_RESPONDED)
    }
    await AsyncStorage.setItem(accessTokenPersistenceKey, accessToken)
    await AsyncStorage.setItem(accessTokenExpPersistenceKey, accessTokenExp)
    EventRegister.emit('refreshAuthSuccess', accessToken)
    await checkIsSignedInAndSyncToProvider()
    return blSuccess(accessToken)
}

const getPersistenceAuthInfo = async () => {
    const accessToken = await AsyncStorage.getItem(accessTokenPersistenceKey)
    const refreshToken = await AsyncStorage.getItem(refreshTokenPersistenceKey)
    const user = await AsyncStorage.getItem(userPersistenceKey)
    const accessTokenExp = await AsyncStorage.getItem(accessTokenExpPersistenceKey)
    const refreshTokenExp = await AsyncStorage.getItem(refreshTokenExpPersistenceKey)
    return {accessToken, accessTokenExp, refreshToken, refreshTokenExp, user: user ? JSON.parse(user) as User : null};
    // EventRegister.emit('getPersistenceAuthInfo', persistenceAuthInfo)
    // return persistenceAuthInfo
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
                await signOut('AUTO')
                // clearInterval(itvID)
            }
        }
    }, 1000)
}


const checkIsSignedInAndSyncToProvider = async () => {
    const {refreshToken} = await getPersistenceAuthInfo()
    let isSignedIn = !!refreshToken;
    EventRegister.emit('checkIsSignedInAndSyncToProvider', isSignedIn)
    return isSignedIn;
}

export const authLaborContext: AuthLaborContextType = {
    authFunctions: {
        signIn,
        signInGoogle,
        signInDummy,
        signOut,
        signUp,
        refreshAuth,
        getPersistenceAuthInfo,
        authTrigger
    },
    authResult: {
        isSignedIn: false,
        accessToken: '',
        refreshToken: '',
        user: {},
        triggerUUID: '',
        triggerType: undefined,
        triggerReference: ''
    }
}

export const AuthLaborContext = React.createContext<AuthLaborContextType>(authLaborContext);
