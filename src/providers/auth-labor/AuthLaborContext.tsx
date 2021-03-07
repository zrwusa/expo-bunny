import React from "react";
import {AuthContextConfig, AuthLaborContextType, AuthRes, BLReturn, SignInParams, SignUpParams,} from "../../types";
import {apiAuth} from "../../helpers/auth-api"
import BunnyConstants, {EBLInfo} from "../../constants/constants";
import {AxiosResponse} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";
import {ANDROID_CLIENT_ID, ANDROID_CLIENT_ID_FOR_EXPO, IOS_CLIENT_ID, IOS_CLIENT_ID_FOR_EXPO} from "@env";
import _ from "lodash";
import {blInfo, businessSuccess} from "../../helpers";
import {EventRegister} from 'react-native-event-listeners'


const config: AuthContextConfig = {
    signInAPIMethod: 'PUT',
    signInAPIPath: '/auth/login',
    registerAPIMethod: 'POST',
    registerAPIPath: '/auth/register',
    refreshAPIMethod: 'PUT',
    refreshAPIPath: '/auth/refresh',
    accessTokenValuePath: 'accessToken',
    refreshTokenValuePath: 'refreshToken',
    userValuePath: 'user',
    accessTokenPersistenceKey: BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY,
    refreshTokenPersistenceKey: BunnyConstants.REFRESH_TOKEN_PERSISTENCE_KEY,
    userPersistenceKey: BunnyConstants.USER_PERSISTENCE_KEY,
    storageType: 'LOCAL_STORAGE',
}

const {
    accessTokenPersistenceKey, refreshTokenPersistenceKey, userPersistenceKey,
    signInAPIPath, registerAPIPath, accessTokenValuePath, refreshAPIMethod,
    signInAPIMethod, registerAPIMethod, refreshAPIPath, refreshTokenValuePath,
    userValuePath
} =
    config;


const signInOrSignUp = async (res: any) => {
    if (!res) {
        return blInfo(EBLInfo.NO_AUTH_API_RESPONDED)
    }
    const {data} = res;
    if (!data) {
        return blInfo(EBLInfo.NO_DATA_RESPONDED)
    }
    const accessToken = _.get(data, accessTokenValuePath);
    const refreshToken = _.get(data, refreshTokenValuePath);
    const user = _.get(data, userValuePath);
    if (!(accessToken && refreshToken)) {
        await signOut()
        return blInfo(EBLInfo.NO_ACCESS_TOKEN_OR_REFRESH_TOKEN_RESPONDED)
    } else {
        await AsyncStorage.setItem(accessTokenPersistenceKey, accessToken)
        await AsyncStorage.setItem(refreshTokenPersistenceKey, refreshToken)
    }
    if (!user) {
        await signOut()
        return blInfo(EBLInfo.NO_USER_INFO_RESPONDED)
    } else {
        await AsyncStorage.setItem(userPersistenceKey, JSON.stringify(user))
    }
    const result = {accessToken, refreshToken, user, isSignedIn: true}
    return businessSuccess(result)
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
    await AsyncStorage.setItem(userPersistenceKey, JSON.stringify(user))
    const result = {
        accessToken,
        refreshToken,
        user,
        isSignedIn: true
    }
    EventRegister.emit('signInDummySuccess', result)
    return businessSuccess(result)
};

const signInGoogle = async () => {
    const loginResult = await Google.logInAsync({
        iosClientId: `${IOS_CLIENT_ID_FOR_EXPO}`,
        androidClientId: `${ANDROID_CLIENT_ID_FOR_EXPO}`,
        iosStandaloneAppClientId: `${IOS_CLIENT_ID}`,
        androidStandaloneAppClientId: `${ANDROID_CLIENT_ID}`,
    });
    if (!loginResult) {
        return blInfo(EBLInfo.NO_GOOGLE_LOGIN_RESULT)
    }

    switch (loginResult.type) {
        case "cancel":
            return blInfo(EBLInfo.GOOGLE_LOGIN_CANCELED)
        case "success":
            const {accessToken, refreshToken, user} = loginResult;
            if (!accessToken || !refreshToken) {
                return blInfo(EBLInfo.GOOGLE_ACCESS_TOKEN_OR_REFRESH_TOKEN_NOT_EXISTS)
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
            return businessSuccess(result)
        default:
            return blInfo(EBLInfo.GOOGLE_LOGIN_RESULT_TYPE_INVALID)
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

const signOut = async () => {
    await AsyncStorage.removeItem(accessTokenPersistenceKey);
    await AsyncStorage.removeItem(refreshTokenPersistenceKey);
    await AsyncStorage.removeItem(userPersistenceKey);
    EventRegister.emit('signOutSuccess', true)
    return businessSuccess(true)
};

const refreshAuth = async (): Promise<BLReturn> => {
    const refreshToken = await AsyncStorage.getItem(refreshTokenPersistenceKey);
    apiAuth.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`;
    const res = await apiAuth.request({method: refreshAPIMethod, url: refreshAPIPath})
    if (!res) {
        return blInfo(EBLInfo.NO_AUTH_API_RESPONDED)
    }
    const {data} = res;
    if (!data) {
        await signOut()
        return blInfo(EBLInfo.NO_DATA_RESPONDED)
    }
    const accessToken = _.get(data, accessTokenValuePath);
    if (!accessToken) {
        await signOut()
        return blInfo(EBLInfo.NO_ACCESS_TOKEN_RESPONDED)
    }
    await AsyncStorage.setItem(accessTokenPersistenceKey, accessToken)
    EventRegister.emit('refreshAuthSuccess', accessToken)
    return businessSuccess(accessToken)
}

const getAccessToken = async () => {
    const accessToken = await AsyncStorage.getItem(accessTokenPersistenceKey)
    EventRegister.emit('get-access-token-success', accessToken)
    return accessToken
}

export const authLaborContext: AuthLaborContextType = {
    authFunctions: {
        signIn,
        signInGoogle,
        signInDummy,
        signOut,
        signUp,
        refreshAuth,
        getAccessToken,
    },
    authResult: {
        isSignedIn: false,
        accessToken: '',
        refreshToken: '',
        user: {}
    }
}

export const AuthLaborContext = React.createContext<AuthLaborContextType>(authLaborContext);
