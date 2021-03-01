import React from "react";
import {AuthLaborContextType, AuthRes, SignInPayload, SignUpPayload,} from "../../types";
import {apiAuth} from "./auth-api"
import BunnyConstants from "../../constants/constants";
import {AxiosResponse, Method} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";
import {ANDROID_CLIENT_ID, ANDROID_CLIENT_ID_FOR_EXPO, IOS_CLIENT_ID, IOS_CLIENT_ID_FOR_EXPO} from "@env";
import _ from "lodash";

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

const signIn = async (params: SignInPayload) => {
    const {data} = await apiAuth.put<SignInPayload, AxiosResponse<AuthRes>>(`/auth/login`, params)
    const {access_token, refresh_token, user} = data
    if (access_token && refresh_token) {
        await AsyncStorage.setItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY, access_token)
        await AsyncStorage.setItem(BunnyConstants.REFRESH_TOKEN_PERSISTENCE_KEY, refresh_token)
    } else {
        // result = dispatch(sysError({error: new BusinessLogicError('No access_token or refresh_token responded')}))
    }
    if (user) {
        await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(user))
    } else {
        // result = dispatch(sysError({error: new BusinessLogicError('No user info responded')}))
    }
    return {accessToken: access_token, user: user}
}

const signInDummy = async () => {
    let result;
    try {
        await AsyncStorage.setItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY, 'access_token_dummy')
        const userDummy = {email: 'dummy@dummy.com', nickname: 'dummy nickname'}
        await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(userDummy))
        result = {
            accessToken: 'access_token_dummy',
            user: userDummy
        };
        return result;
    } catch (err) {
        // result = dispatch(sysError({error: err}))
    }
    return result;
};

const signInGoogle = async () => {
    let result;
    try {
        const loginResult = await Google.logInAsync({
            iosClientId: `${IOS_CLIENT_ID_FOR_EXPO}`,
            androidClientId: `${ANDROID_CLIENT_ID_FOR_EXPO}`,
            iosStandaloneAppClientId: `${IOS_CLIENT_ID}`,
            androidStandaloneAppClientId: `${ANDROID_CLIENT_ID}`,
        });
        if (loginResult) {
            switch (loginResult.type) {
                case "cancel":
                    // result = dispatch(sysWarn({warn: "Google login canceled"}));
                    break
                case "success":
                    const {accessToken, user} = loginResult;
                    if (accessToken) {
                        try {
                            await AsyncStorage.setItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY, accessToken)
                            await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(user))
                            return result = loginResult;
                        } catch (err) {
                            // result = dispatch(sysError({error: err}))
                        }
                    } else {
                        // result = dispatch(sysError({error: new BusinessLogicError('accessToken is null')}))
                    }
                    break
                default:
                // result = dispatch(sysError({error: new BusinessLogicError('Google loginResult has returned type neither success nor cancel')}));
            }
        } else {
            // result = dispatch(sysError({error: new BusinessLogicError('No login result')}))
        }
    } catch (e) {
        // result = dispatch(sysError({error: e}))
    }
    return result;
};

const signUp = async (reqParams: SignUpPayload) => {
    let result;
    try {
        const res = await apiAuth.post<SignUpPayload, AxiosResponse<AuthRes>>(`/auth/register`, reqParams)
        const {data} = res;
        if (data) {
            if (data.access_token) {
                await AsyncStorage.setItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY, data.access_token)
            } else {
                // dispatch(sysError({error: new BusinessLogicError('No access_token responded')}))
            }

            if (data.user) {
                await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(data.user))
            } else {
                // dispatch(sysError({error: new BusinessLogicError('No user info responded')}))
            }
            result = data
        } else {
            // result = dispatch(sysError({error: new BusinessLogicError('No data')}))
        }
    } catch (err) {
        // result = dispatch(sysError({error: err}))
    }
    return result;
}

const signOutAndRemove = async () => {
    let result;
    try {
        await AsyncStorage.removeItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY);
        await AsyncStorage.removeItem(BunnyConstants.REFRESH_TOKEN_PERSISTENCE_KEY);
        await AsyncStorage.removeItem(BunnyConstants.USER_PERSISTENCE_KEY);
        result = true;
    } catch (err) {
        // result = dispatch(sysError({error: err}))
    }
    return result;
};

const refreshAuth = async () => {
    // const {refreshToken, accessTokenPath, refreshApiMethod, refreshApiPath} = params;
    const refreshToken = await AsyncStorage.getItem(BunnyConstants.REFRESH_TOKEN_PERSISTENCE_KEY);
    apiAuth.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`;
    const accessTokenPath = 'access_token';
    const refreshApiMethod = 'put';
    const refreshApiPath = '/auth/refresh';
    const res = await apiAuth.request({method: refreshApiMethod, url: refreshApiPath})
    if (res.data) {
        const accessToken = _.get(res.data, accessTokenPath);
        if (accessToken) {
            return accessToken
        } else {
            return undefined;
        }
    } else {
        return undefined;
    }
}
export const authLaborContext = {
    authFunctions: {
        signIn,
        signInGoogle,
        signInDummy,
        signOutAndRemove,
        signUp,
        refreshAuth
    },
    authedResult: {
        isLoading: true,
        isSignOut: false,
        accessToken: undefined,
        redirection: undefined
    }
}

export const AuthLaborContext = React.createContext<AuthLaborContextType>(authLaborContext);
