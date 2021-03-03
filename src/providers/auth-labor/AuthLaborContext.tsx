import React from "react";
import {AuthContextConfig, AuthLaborContextType, AuthRes, BusinessLogicReturn, SignInParams, SignUpParams,} from "../../types";
import {apiAuth} from "../../helpers/auth-api"
import BunnyConstants, {EBusinessLogicInfo} from "../../constants/constants";
import {AxiosResponse} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";
import {ANDROID_CLIENT_ID, ANDROID_CLIENT_ID_FOR_EXPO, IOS_CLIENT_ID, IOS_CLIENT_ID_FOR_EXPO} from "@env";
import _ from "lodash";
import {businessLogicInfo, businessSuccess} from "../../helpers";
import {EventRegister} from 'react-native-event-listeners'


const config: AuthContextConfig = {
    signInAPIMethod: 'PUT',
    signInAPIPath: '/auth/login',
    registerAPIMethod: 'POST',
    registerAPIPath: '/auth/register',
    refreshAPIMethod: 'PUT',
    refreshAPIPath: '/auth/refresh',
    accessTokenValuePath: 'access_token',
    refreshTokenValuePath: 'refresh_token',
    userValuePath: 'user',
    accessTokenPersistenceKey: BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY,
    refreshTokenPersistenceKey: BunnyConstants.REFRESH_TOKEN_PERSISTENCE_KEY,
    storageType: 'LOCAL_STORAGE',
}

const {
    accessTokenPersistenceKey, refreshTokenPersistenceKey,
    signInAPIPath, registerAPIPath, accessTokenValuePath, refreshAPIMethod,
    signInAPIMethod, registerAPIMethod, refreshAPIPath, refreshTokenValuePath,
    userValuePath
} =
    config;

const getAccessToken = async () => {
    const accessToken = await AsyncStorage.getItem(accessTokenPersistenceKey)
    EventRegister.emit('get-access-token-success', accessToken)
    return accessToken
}

const signIn = async (params: SignInParams) => {
    const res = await apiAuth.request<SignInParams, AxiosResponse<AuthRes>>({method: signInAPIMethod, url: signInAPIPath, data: params})
    if (!res) {
        return businessLogicInfo(EBusinessLogicInfo.NO_AUTH_API_RESPONDED)
    }
    const {data} = res;
    if (!data) {
        return businessLogicInfo(EBusinessLogicInfo.NO_DATA_RESPONDED)
    }
    const accessToken = _.get(data, accessTokenValuePath);
    const refreshToken = _.get(data, refreshTokenValuePath);
    const user = _.get(data, userValuePath);
    if (!(accessToken && refreshToken)) {
        await signOut()
        return businessLogicInfo(EBusinessLogicInfo.NO_ACCESS_TOKEN_OR_REFRESH_TOKEN_RESPONDED)
    } else {
        await AsyncStorage.setItem(accessTokenPersistenceKey, accessToken)
        await AsyncStorage.setItem(refreshTokenPersistenceKey, refreshToken)
    }
    if (!user) {
        await signOut()
        return businessLogicInfo(EBusinessLogicInfo.NO_USER_INFO_RESPONDED)
    } else {
        await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(user))
    }
    const result = {accessToken, refreshToken, user}
    EventRegister.emit('sign-in-success', result)
    return businessSuccess(result)
}

const signInDummy = async () => {
    await AsyncStorage.setItem(accessTokenPersistenceKey, 'access_token_dummy')
    const userDummy = {email: 'dummy@dummy.com', nickname: 'dummy nickname'}
    await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(userDummy))
    const result = {
        accessToken: 'access_token_dummy',
        user: userDummy
    }
    EventRegister.emit('sign-in-dummy-success', result)
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
        return businessLogicInfo(EBusinessLogicInfo.NO_GOOGLE_LOGIN_RESULT)
    }

    switch (loginResult.type) {
        case "cancel":
            return businessLogicInfo(EBusinessLogicInfo.GOOGLE_LOGIN_CANCELED)
        case "success":
            const {accessToken, user} = loginResult;
            if (!accessToken) {
                return businessLogicInfo(EBusinessLogicInfo.GOOGLE_ACCESS_TOKEN_NOT_EXISTS)
            }
            await AsyncStorage.setItem(accessTokenPersistenceKey, accessToken)
            await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(user))
            EventRegister.emit('sign-in-google-success', loginResult)
            return businessSuccess(loginResult)
        default:
            return businessLogicInfo(EBusinessLogicInfo.GOOGLE_LOGIN_RESULT_TYPE_INVALID)
    }
};

const signUp = async (params: SignUpParams) => {
    const res = await apiAuth.request({method: registerAPIMethod, url: registerAPIPath, data: params})
    if (!res) {
        return businessLogicInfo(EBusinessLogicInfo.NO_AUTH_API_RESPONDED)
    }
    const {data} = res;
    if (!data) {
        return businessLogicInfo(EBusinessLogicInfo.NO_DATA_RESPONDED)
    }
    const accessToken = _.get(data, accessTokenValuePath)
    const user = _.get(data, userValuePath)
    if (accessToken) {
        await AsyncStorage.setItem(accessTokenPersistenceKey, accessToken)
    } else {
        return businessLogicInfo(EBusinessLogicInfo.NO_ACCESS_TOKEN_RESPONDED)
    }
    if (user) {
        await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(user))
    } else {
        return businessLogicInfo(EBusinessLogicInfo.NO_USER_INFO_RESPONDED)
    }
    const result = {accessToken, user}
    EventRegister.emit('sign-up-success', result)
    return businessSuccess(result);
}

const signOut = async () => {
    await AsyncStorage.removeItem(accessTokenPersistenceKey);
    await AsyncStorage.removeItem(refreshTokenPersistenceKey);
    await AsyncStorage.removeItem(BunnyConstants.USER_PERSISTENCE_KEY);
    EventRegister.emit('sign-out-and-remove-success', true)
    return businessSuccess(true)
};

const refreshAuth = async (): Promise<BusinessLogicReturn> => {
    const refreshToken = await AsyncStorage.getItem(refreshTokenPersistenceKey);
    apiAuth.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`;
    const res = await apiAuth.request({method: refreshAPIMethod, url: refreshAPIPath})
    if (!res) {
        return businessLogicInfo(EBusinessLogicInfo.NO_AUTH_API_RESPONDED)
    }
    const {data} = res;
    if (!data) {
        await signOut()
        return businessLogicInfo(EBusinessLogicInfo.NO_DATA_RESPONDED)
    }
    const accessToken = _.get(data, accessTokenValuePath);
    if (!accessToken) {
        await signOut()
        return businessLogicInfo(EBusinessLogicInfo.NO_ACCESS_TOKEN_RESPONDED)
    }
    await AsyncStorage.setItem(accessTokenPersistenceKey, accessToken)
    EventRegister.emit('refresh-auth-success', accessToken)
    return businessSuccess(accessToken)
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
    },
    // eventTarget
}

export const AuthLaborContext = React.createContext<AuthLaborContextType>(authLaborContext);
