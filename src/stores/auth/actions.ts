import api from "../../common/api";
import {RestoreToken, RestoreTokenGoogle, SignOut, SysError, SysWarn} from "../../types/actions";
import {RestoreTokenGooglePayload, RestoreTokenPayload, SignInPayload, SignOutPayload} from "../../types/payloads";
import {EAuth} from "../../types/constants";
import * as Google from "expo-google-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IOS_CLIENT_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID_FOR_EXPO, ANDROID_CLIENT_ID_FOR_EXPO} from '@env';
import {Action, ActionCreator, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {sysError, sysWarn} from "../sys/actions";
import {Auth} from "../../types/models";

export const signIn: ActionCreator<ThunkAction<Promise<Action>, Auth, void, RestoreToken>> = (reqParams: SignInPayload) => {
    return async (dispatch: Dispatch<RestoreToken | SysError>): Promise<Action> => {
        let r;
        try {
            const res = await api.post(`/auth/login`, reqParams)
            await AsyncStorage.setItem('accessToken', res.data.user.access_token)
            r = dispatch(restoreToken(res.data.user))
        } catch (e) {
            r = dispatch(sysError({error: e.toString()}))
        }
        return r;
    };
};

export const signInDummy: ActionCreator<ThunkAction<Promise<Action>, Auth, void, RestoreToken>> = () => {
    return async (dispatch: Dispatch<RestoreToken | SysError>): Promise<Action> => {
        let r;
        try {
            await AsyncStorage.setItem('accessToken', 'access_token_dummy')
            r = dispatch(restoreToken({access_token:'access_token_dummy'}))
        } catch (e) {
            r = dispatch(sysError({error: e.toString()}))
        }
        return r;
    };
};

export const signInGoogle: ActionCreator<ThunkAction<Promise<Action>, Auth, void, RestoreTokenGoogle>> = () => {
    return async (dispatch: Dispatch<SysWarn | SysError | RestoreTokenGoogle>): Promise<Action> => {
        let r;
        try {
            const loginResult = await Google.logInAsync({
                iosClientId: `${IOS_CLIENT_ID_FOR_EXPO}`,
                androidClientId: `${ANDROID_CLIENT_ID_FOR_EXPO}`,
                iosStandaloneAppClientId: `${IOS_CLIENT_ID}`,
                androidStandaloneAppClientId: `${ANDROID_CLIENT_ID}`,
            });
            switch (loginResult.type) {
                case "cancel":
                    r = dispatch(sysWarn({warn: "Google login canceled"}));
                    break
                case "success":
                    if (loginResult.accessToken) {
                        try {
                            await AsyncStorage.setItem('accessToken', loginResult.accessToken)
                            r = dispatch(restoreTokenGoogle(loginResult));
                        } catch (e) {
                            r = dispatch(sysError({error: e.toString()}))
                        }
                    } else {
                        r = dispatch(sysError({error: 'accessToken gives null'}))
                    }
                    break
                default:
                    r = dispatch(sysError({error: 'Google loginResult has returned type neither success nor cancel'}));
            }
        } catch (e) {
            r = dispatch(sysError({error: e.toString()}));
        }
        return r;
    };
};

export const signOutAndRemove: ActionCreator<ThunkAction<Promise<Action>, Auth, void, SignOut>> = () => {
    return async (dispatch: Dispatch<SignOut | SysError>): Promise<Action> => {
        let r;
        try {
            await AsyncStorage.removeItem('accessToken')
            r = dispatch(signOut({}));

        } catch (e) {
            r = dispatch(sysError({error: e.toString()}))
        }
        return r;
    };
};

export const restoreToken: (payload: RestoreTokenPayload) => RestoreToken = (payload) => {
    return {
        type: EAuth.RESTORE_TOKEN,
        payload: payload,
    };
};

const signOut: (payload: SignOutPayload) => SignOut = (payload) => {
    return {
        type: EAuth.SIGN_OUT,
        payload: payload,
    };
};

const restoreTokenGoogle: (payload: RestoreTokenGooglePayload) => RestoreTokenGoogle = (payload) => {
    return {
        type: EAuth.RESTORE_TOKEN_GOOGLE,
        payload: payload,
    };
};

export type AuthActions = SignOut | RestoreToken | RestoreTokenGoogle ;