import api from "../../common/api";
import {RestoreAuth, RestoreAuthGoogle, SignOut, SysError, SysWarn} from "../../types/actions";
import {RestoreAuthGooglePayload, RestoreAuthPayload, SignInPayload, SignOutPayload} from "../../types/payloads";
import {EAuth} from "../../types/constants";
import * as Google from "expo-google-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IOS_CLIENT_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID_FOR_EXPO, ANDROID_CLIENT_ID_FOR_EXPO} from '@env';
import {Action, ActionCreator, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {sysError, sysWarn} from "../sys/actions";
import {Auth} from "../../types/models";

export const signIn: ActionCreator<ThunkAction<Promise<Action>, Auth, void, RestoreAuth>> = (reqParams: SignInPayload) => {
    return async (dispatch: Dispatch<RestoreAuth | SysError>): Promise<Action> => {
        let result;
        try {
            const res = await api.post(`/auth/login`, reqParams)
            await AsyncStorage.setItem('accessToken', res.data.access_token)
            await AsyncStorage.setItem('user', JSON.stringify(res.data.user))
            result = dispatch(restoreAuth(res.data))
        } catch (err) {
            result = dispatch(sysError({error: err.toString()}))
        }
        return result;
    };
};

export const signInDummy: ActionCreator<ThunkAction<Promise<Action>, Auth, void, RestoreAuth>> = () => {
    return async (dispatch: Dispatch<RestoreAuth | SysError>): Promise<Action> => {
        let result;
        try {
            await AsyncStorage.setItem('accessToken', 'access_token_dummy')
            const userDummy = {email: 'dummy@dummy.com', nickname: 'dummy nickname'}
            await AsyncStorage.setItem('user', JSON.stringify(userDummy))
            result = dispatch(restoreAuth({
                access_token: 'access_token_dummy',
                user: userDummy
            }))
        } catch (err) {
            result = dispatch(sysError({error: err.toString()}))
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
            switch (loginResult.type) {
                case "cancel":
                    result = dispatch(sysWarn({warn: "Google login canceled"}));
                    debugger
                    break
                case "success":
                    if (loginResult.accessToken) {
                        try {
                            await AsyncStorage.setItem('accessToken', loginResult.accessToken)
                            await AsyncStorage.setItem('user', JSON.stringify(loginResult.user))
                            result = dispatch(restoreAuthGoogle(loginResult));
                        } catch (err) {
                            result = dispatch(sysError({error: err.toString()}))
                        }
                    } else {
                        result = dispatch(sysError({error: 'accessToken gives null'}))
                    }
                    break
                default:
                    result = dispatch(sysError({error: 'Google loginResult has returned type neither success nor cancel'}));
            }
        } catch (err) {
            result = dispatch(sysError({error: err.toString()}));
        }
        return result;
    };
};

export const signOutAndRemove: ActionCreator<ThunkAction<Promise<Action>, Auth, void, SignOut>> = () => {
    return async (dispatch: Dispatch<SignOut | SysError>): Promise<Action> => {
        let result;
        try {
            await AsyncStorage.removeItem('accessToken')
            result = dispatch(signOut({}));

        } catch (err) {
            result = dispatch(sysError({error: err.toString()}))
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

export type AuthActions = SignOut | RestoreAuth | RestoreAuthGoogle ;
