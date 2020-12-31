import {AxiosError} from "axios";
import api from "../../common/api";
import {AuthFailed, RestoreToken, SignOut} from "../../types/actions";
import {RestoreTokenPayload, SignInPayload, SignOutPayload} from "../../types/payloads";
import {EAuth} from "../../types/constants";
import {ThunkResult} from "../../types/thunk";

export const signOut: (payload: SignOutPayload) => SignOut = (payload) => {
    return {
        type: EAuth.SIGN_OUT,
        payload: payload,
    };
};

export const restoreToken: (payload: RestoreTokenPayload) => RestoreToken = (payload) => {
    return {
        type: EAuth.RESTORE_TOKEN,
        payload: payload,
    };
};

export const authFailed: (payload: AxiosError) => AuthFailed = (payload) => {
    return {
        type: EAuth.AUTH_FAIL,
        payload: payload,
    };
};

export const signIn = (data: SignInPayload): ThunkResult<Promise<void>> => (dispatch) => {
    return api.post(`/auth/login`, data)
        .then((res) => {
            dispatch(restoreToken(res.data.user))
        })
        .catch((err: AxiosError) => {
            dispatch(authFailed(err))
        });
};

export type AuthActions =  SignOut | RestoreToken | AuthFailed ;

