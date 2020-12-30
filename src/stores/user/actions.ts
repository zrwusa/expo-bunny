import {EUser} from "./constants";
import {ILoginSuccessPayload, ILogoutPayload, IReqLoginPayload} from "./payloads";

import api from "../../common/api";
import {IThunkResult} from "../thunk";
import {AxiosError} from "axios";


interface ILoginSuccessAction {
    type: EUser.LOGIN_SUCCESS;
    payload: ILoginSuccessPayload;
}

const loginSuccessAction: (payload: ILoginSuccessPayload) => ILoginSuccessAction = (payload) => {
    return {
        type: EUser.LOGIN_SUCCESS,
        payload: payload,
    };
};

interface ILoginFailedAction {
    type: EUser.LOGIN_FAILED;
    payload: AxiosError;
}

const loginFailedAction: (payload: AxiosError) => ILoginFailedAction = (payload) => {
    return {
        type: EUser.LOGIN_FAILED,
        payload: payload,
    };
};

export const loginAction = (data: IReqLoginPayload): IThunkResult<Promise<void>> => (dispatch) => {
    return api.post(`/auth/login`, data)
        .then((res) => {
            dispatch(loginSuccessAction(res.data))
        })
        .catch((err: AxiosError) => {
            dispatch(loginFailedAction(err))
        });
};

interface ILogoutAction {
    type: EUser.LOGOUT;
    payload: ILogoutPayload;
}

export const logoutAction: (payload: ILogoutPayload) => ILogoutAction = (payload) => {
    return {
        type: EUser.LOGOUT,
        payload: payload,
    };
};

export type UserAction = ILoginSuccessAction | ILoginFailedAction | ILogoutAction ;
