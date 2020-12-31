import {AxiosError} from "axios";
import api from "../../common/api";
import {AuthFailed, AuthWarn, RestoreToken, RestoreTokenGoogle, SignOut} from "../../types/actions";
import {
    AuthFailedPayload,
    AuthWarnPayload,
    RestoreTokenGooglePayload,
    RestoreTokenPayload,
    SignInPayload,
    SignOutPayload
} from "../../types/payloads";
import {EAuth} from "../../types/constants";
import {ThunkResult} from "../../types/thunk";
import * as Google from "expo-google-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IOS_CLIENT_ID_FOR_EXPO} from '@env';

export const signIn = (data: SignInPayload): ThunkResult<Promise<void>> => (dispatch) => {
    return api.post(`/auth/login`, data)
        .then((res) => {
            AsyncStorage.setItem('accessToken', res.data.user.access_token)
            dispatch(restoreToken(res.data.user))
        })
        .catch((err: AxiosError) => {
            dispatch(authFailed({error: JSON.stringify(err)}))
        });
};

export const signInGoogle = (): ThunkResult<Promise<void>> => (dispatch) => {
    return Google.logInAsync({
        iosClientId: `${IOS_CLIENT_ID_FOR_EXPO}`,
        // androidClientId: `${ANDROID_CLIENT_ID_FOR_EXPO}`,
        // iosStandaloneAppClientId: `${IOS_CLIENT_ID}`,
        // androidStandaloneAppClientId: `${ANDROID_CLIENT_ID}`,

    })
        .then((logInResult) => {
            switch (logInResult.type) {
                case "cancel":
                    dispatch(authWarn({warn: "Login canceled"}));
                    break
                case "success":
                    AsyncStorage.setItem('accessToken', logInResult.accessToken);
                    dispatch(restoreTokenGoogle(logInResult));
                    break
                default:
            }
        })
        .catch((err) => {
            dispatch(authFailed({error: JSON.stringify(err)}))
        });
};

export const signOutAndRemove = (): ThunkResult<Promise<void>> => (dispatch) => {
    return AsyncStorage.removeItem('accessToken')
        .then(() => {
            dispatch(signOut({}));
        })
        .catch((err) => {
            dispatch(authFailed({error: JSON.stringify(err)}))
        });
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

const authFailed: (payload: AuthFailedPayload) => AuthFailed = (payload) => {
    return {
        type: EAuth.AUTH_FAIL,
        payload: payload,
    };
};

const authWarn: (payload: AuthWarnPayload) => AuthWarn = (payload) => {
    return {
        type: EAuth.AUTH_WARN,
        payload: payload,
    };
};

export type AuthActions = SignOut | RestoreToken | AuthFailed | AuthWarn | RestoreTokenGoogle ;

