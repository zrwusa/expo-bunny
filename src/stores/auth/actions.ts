import {EAuth} from "./constants";
import {RestoreTokenPayload, SignInPayload, SignOutPayload} from "./payloads";
import {AxiosError} from "axios";
import {IThunkResult} from "../thunk";
import api from "../../common/api";

interface SignOut {
    type: EAuth.SIGN_OUT;
    payload: SignOutPayload;
}

export const signOut: (payload: SignOutPayload) => SignOut = (payload) => {
    return {
        type: EAuth.SIGN_OUT,
        payload: payload,
    };
};

interface RestoreToken {
    type: EAuth.RESTORE_TOKEN;
    payload: RestoreTokenPayload;
}

export const restoreToken: (payload: RestoreTokenPayload) => RestoreToken = (payload) => {
    return {
        type: EAuth.RESTORE_TOKEN,
        payload: payload,
    };
};

export interface AuthFailed {
    type: EAuth.AUTH_FAIL;
    payload: AxiosError;
}

export const authFailed: (payload: AxiosError) => AuthFailed = (payload) => {
    return {
        type: EAuth.AUTH_FAIL,
        payload: payload,
    };
};

export const signIn = (data: SignInPayload): IThunkResult<Promise<void>> => (dispatch) => {
    return api.post(`/auth/login`, data)
        .then((res) => {
            dispatch(restoreToken(res.data.user))
        })
        .catch((err: AxiosError) => {
            dispatch(authFailed(err))
        });
};


export type AuthActions =  SignOut | RestoreToken | AuthFailed ;

