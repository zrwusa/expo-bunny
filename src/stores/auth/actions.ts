import {EAuth} from "./constants";
import {IRestoreTokenPayload, ISignInPayload, ISignOutPayload} from "./payloads";
import {AxiosError} from "axios";
import {IThunkResult} from "../thunk";
import api from "../../common/api";

interface ISignOutAction {
    type: EAuth.SIGN_OUT;
    payload: ISignOutPayload;
}

export const signOutAction: (payload: ISignOutPayload) => ISignOutAction = (payload) => {
    return {
        type: EAuth.SIGN_OUT,
        payload: payload,
    };
};

interface IRestoreTokenAction {
    type: EAuth.RESTORE_TOKEN;
    payload: IRestoreTokenPayload;
}

export const restoreTokenAction: (payload: IRestoreTokenPayload) => IRestoreTokenAction = (payload) => {
    return {
        type: EAuth.RESTORE_TOKEN,
        payload: payload,
    };
};

export interface IAuthFailAction {
    type: EAuth.AUTH_FAIL;
    payload: AxiosError;
}

export const authFailAction: (payload: AxiosError) => IAuthFailAction = (payload) => {
    return {
        type: EAuth.AUTH_FAIL,
        payload: payload,
    };
};

export const signInAction = (data: ISignInPayload): IThunkResult<Promise<void>> => (dispatch) => {
    return api.post(`/auth/login`, data)
        .then((res) => {
            dispatch(restoreTokenAction(res.data.user))
        })
        .catch((err: AxiosError) => {
            dispatch(authFailAction(err))
        });
};


export type AuthAction =  ISignOutAction | IRestoreTokenAction | IAuthFailAction ;

