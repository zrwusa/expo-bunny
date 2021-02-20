import api from "../../utils/api";
import {RestoreAuth, RestoreAuthGoogle, RestoreAuthRedirection, SignOut, SysError, SysWarn} from "../../types/actions";
import {
    RegisterPayload,
    RestoreAuthGooglePayload,
    RestoreAuthPayload,
    RestoreAuthRedirectionPayload,
    SignInPayload,
    SignOutPayload
} from "../../types/payloads";
import {EAuth} from "../../utils/constants";
import * as Google from "expo-google-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IOS_CLIENT_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID_FOR_EXPO, ANDROID_CLIENT_ID_FOR_EXPO} from '@env';
import {Action, ActionCreator, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {BusinessLogicError, sysError, sysWarn} from "../sys/actions";
import {Auth, AuthRes} from "../../types/models";
import {AxiosResponse} from "axios";
import BunnyConstants from "../../utils/constants";


export const signIn: ActionCreator<ThunkAction<Promise<Action>, Auth, void, RestoreAuth>> = (reqParams: SignInPayload) => {
    return async (dispatch: Dispatch<RestoreAuth | SysError>): Promise<Action> => {
        let result;

        try {
            const res = await api.post<SignInPayload, AxiosResponse<AuthRes>>(`/auth/login`, reqParams)
            const {data} = res;
            if (res.data) {
                data.access_token
                    ? await AsyncStorage.setItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY, data.access_token)
                    : dispatch(sysError({error: new BusinessLogicError('No access_token responded')}))
                data.user
                    ? await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(data.user))
                    : dispatch(sysError({error: new BusinessLogicError('No user info responded')}))
                result = dispatch(restoreAuth(data))
            } else {
                result = dispatch(sysError({error: new BusinessLogicError('No data')}))
            }
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };
};

export const signInDummy: ActionCreator<ThunkAction<Promise<Action>, Auth, void, RestoreAuth>> = () => {
    return async (dispatch: Dispatch<RestoreAuth | SysError>): Promise<Action> => {
        let result;
        try{
        await AsyncStorage.setItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY, 'access_token_dummy')
        const userDummy = {email: 'dummy@dummy.com', nickname: 'dummy nickname'}
        await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(userDummy))
        result = dispatch(restoreAuth({
            access_token: 'access_token_dummy',
            user: userDummy
        }))
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };
};

export const signInGoogle: ActionCreator<ThunkAction<Promise<Action>, Auth, void, RestoreAuthGoogle>> = () => {
    return async (dispatch: Dispatch<SysWarn | SysError | RestoreAuthGoogle>): Promise<Action> => {
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
                        result = dispatch(sysWarn({warn: "Google login canceled"}));
                        break
                    case "success":
                        const {accessToken, user} = loginResult;
                        if (accessToken) {
                            try {
                                await AsyncStorage.setItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY, accessToken)
                                await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(user))
                                result = dispatch(restoreAuthGoogle(loginResult));
                            } catch (err) {
                                result = dispatch(sysError({error: err}))
                            }
                        } else {
                            result = dispatch(sysError({error: new BusinessLogicError('accessToken is null')}))
                        }
                        break
                    default:
                        result = dispatch(sysError({error: new BusinessLogicError('Google loginResult has returned type neither success nor cancel')}));
                }
            } else {
                result = dispatch(sysError({error: new BusinessLogicError('No login result')}))
            }
        } catch (e) {
            result = dispatch(sysError({error: e}))
        }
        return result;
    };
};

export const register: ActionCreator<ThunkAction<Promise<Action>, Auth, void, RestoreAuth>> = (reqParams: RegisterPayload) => {
    return async (dispatch: Dispatch<RestoreAuth | SysError>): Promise<Action> => {
        let result;
        try {
            const res = await api.post<RegisterPayload, AxiosResponse<AuthRes>>(`/auth/register`, reqParams)
            const {data} = res;
            console.log('---res',res)
            if (res.data) {
                data.access_token
                    ? await AsyncStorage.setItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY, data.access_token)
                    : dispatch(sysError({error: new BusinessLogicError('No access_token responded')}))
                data.user
                    ? await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(data.user))
                    : dispatch(sysError({error: new BusinessLogicError('No user info responded')}))
                result = dispatch(restoreAuth(data))
            } else {
                result = dispatch(sysError({error: new BusinessLogicError('No data')}))
            }
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };
};

export const signOutAndRemove: ActionCreator<ThunkAction<Promise<Action>, Auth, void, SignOut>> = () => {
    return async (dispatch: Dispatch<SignOut | SysError>): Promise<Action> => {
        let result;
        try {
            await AsyncStorage.removeItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY)
            await AsyncStorage.removeItem(BunnyConstants.USER_PERSISTENCE_KEY)
            result = dispatch(signOut({}));
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };
};

export const restoreAuth: (payload: RestoreAuthPayload) => RestoreAuth = (payload) => {
    return {
        type: EAuth.RESTORE_AUTH,
        payload: payload,
    };
};

export const restoreAuthRedirection: (payload: RestoreAuthRedirectionPayload) => RestoreAuthRedirection = (payload) => {
    return {
        type: EAuth.RESTORE_AUTH_REDIRECTION,
        payload: payload,
    };
};

const signOut: (payload: SignOutPayload) => SignOut = (payload) => {
    return {
        type: EAuth.SIGN_OUT,
        payload: payload,
    };
};

const restoreAuthGoogle: (payload: RestoreAuthGooglePayload) => RestoreAuthGoogle = (payload) => {
    return {
        type: EAuth.RESTORE_AUTH_GOOGLE,
        payload: payload,
    };
};

export type AuthActions = SignOut | RestoreAuth | RestoreAuthGoogle | RestoreAuthRedirection ;
