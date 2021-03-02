import React from "react";
import {AuthLaborContextType, AuthRes, SignInParams, SignUpParams,} from "../../types";
import {apiAuth} from "../../helpers/auth-api"
import BunnyConstants, {EBusinessInfo} from "../../constants/constants";
import {AxiosResponse, Method} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";
import {ANDROID_CLIENT_ID, ANDROID_CLIENT_ID_FOR_EXPO, IOS_CLIENT_ID, IOS_CLIENT_ID_FOR_EXPO} from "@env";
import _ from "lodash";
import {businessInfo, businessSuccess} from "../../helpers";

type Config = {
    accessTokenPersistenceKey: string,
    refreshTokenPersistenceKey: string,
    storageType?: 'LOCAL_STORAGE' | 'NONE'
}

const config: Config = {
    accessTokenPersistenceKey: BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY,
    refreshTokenPersistenceKey: BunnyConstants.REFRESH_TOKEN_PERSISTENCE_KEY,
    storageType: 'LOCAL_STORAGE'
}

type refreshAuthParams = {
    refreshToken: string,
    accessTokenPath: string,
    refreshApiMethod: Method,
    refreshApiPath: string,
}

const getAccessToken = async () => {
    return await AsyncStorage.getItem(config.accessTokenPersistenceKey)
}

const signIn = async (params: SignInParams) => {
    const {data} = await apiAuth.put<SignInParams, AxiosResponse<AuthRes>>(`/auth/login`, params)
    const {access_token, refresh_token, user} = data
    if (access_token && refresh_token) {
        await AsyncStorage.setItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY, access_token)
        await AsyncStorage.setItem(BunnyConstants.REFRESH_TOKEN_PERSISTENCE_KEY, refresh_token)
    } else {
        return businessInfo(EBusinessInfo.NO_ACCESS_TOKEN_OR_REFRESH_TOKEN_RESPONDED)
    }
    if (user) {
        await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(user))
    } else {
        return businessInfo(EBusinessInfo.NO_USER_INFO_RESPONDED)
    }
    return businessSuccess({accessToken: access_token, user: user})
}

const signInDummy = async () => {
    await AsyncStorage.setItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY, 'access_token_dummy')
    const userDummy = {email: 'dummy@dummy.com', nickname: 'dummy nickname'}
    await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(userDummy))
    return businessSuccess({
        accessToken: 'access_token_dummy',
        user: userDummy
    })
};

const signInGoogle = async () => {
    const loginResult = await Google.logInAsync({
        iosClientId: `${IOS_CLIENT_ID_FOR_EXPO}`,
        androidClientId: `${ANDROID_CLIENT_ID_FOR_EXPO}`,
        iosStandaloneAppClientId: `${IOS_CLIENT_ID}`,
        androidStandaloneAppClientId: `${ANDROID_CLIENT_ID}`,
    });
    if (loginResult) {
        switch (loginResult.type) {
            case "cancel":
                return businessInfo(EBusinessInfo.G00GLE_LOGIN_CANCELED)
            case "success":
                const {accessToken, user} = loginResult;
                if (accessToken) {
                    await AsyncStorage.setItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY, accessToken)
                    await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(user))
                    return businessSuccess(loginResult)
                } else {
                    return businessInfo(EBusinessInfo.GOOGLE_ACCESS_TOKEN_NOT_EXISTS)
                }
            default:
                return businessInfo(EBusinessInfo.GOOGLE_LOGIN_RESULT_TYPE_INVALID)
        }
    } else {
        return businessInfo(EBusinessInfo.NO_GOOGLE_LOGIN_RESULT)
    }
};

const signUp = async (reqParams: SignUpParams) => {
    const res = await apiAuth.post<SignUpParams, AxiosResponse<AuthRes>>(`/auth/register`, reqParams)
    const {data} = res;
    if (data) {
        if (data.access_token) {
            await AsyncStorage.setItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY, data.access_token)
        } else {
            return businessInfo(EBusinessInfo.NO_ACCESS_TOKEN_RESPONDED)
        }
        if (data.user) {
            await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(data.user))
        } else {
            return businessInfo(EBusinessInfo.NO_USER_INFO_RESPONDED)
        }
        return businessSuccess(data);

    } else {
        return businessInfo(EBusinessInfo.NO_DATA_RESPONDED)
    }
}

const signOutAndRemove = async () => {
    await AsyncStorage.removeItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY);
    await AsyncStorage.removeItem(BunnyConstants.REFRESH_TOKEN_PERSISTENCE_KEY);
    await AsyncStorage.removeItem(BunnyConstants.USER_PERSISTENCE_KEY);
    return businessSuccess(true)
};

const refreshAuth = async () => {
    const refreshToken = await AsyncStorage.getItem(BunnyConstants.REFRESH_TOKEN_PERSISTENCE_KEY);
    apiAuth.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`;
    const accessTokenPath = 'access_token';
    const refreshApiMethod = 'put';
    const refreshApiPath = '/auth/refresh';
    const res = await apiAuth.request({method: refreshApiMethod, url: refreshApiPath})
    if (res.data) {
        const accessToken = _.get(res.data, accessTokenPath);
        if (accessToken) {
            await AsyncStorage.setItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY, accessToken)
            return businessSuccess(accessToken)
        } else {
            return businessInfo(EBusinessInfo.NO_ACCESS_TOKEN_RESPONDED)
        }
    } else {
        return businessInfo(EBusinessInfo.NO_DATA_RESPONDED)
    }
}

export const authLaborContext = {
    authFunctions: {
        signIn,
        signInGoogle,
        signInDummy,
        signOutAndRemove,
        signUp,
        refreshAuth,
        getAccessToken
    },
    authedResult: {
        isLoading: true,
        isSignOut: false,
        accessToken: undefined,
        redirection: undefined
    }
}

export const AuthLaborContext = React.createContext<AuthLaborContextType>(authLaborContext);
