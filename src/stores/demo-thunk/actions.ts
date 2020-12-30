import {EDemoThunkAction} from "./constants";
import {IDemoThunkSuccessPayload, IReqDemoThunkPayload} from "./payloads";
import {AxiosError} from "axios";
import {IThunkResult} from "../thunk";
import api from "../../common/api";



export interface IDemoThunkSuccessAction {
    type: EDemoThunkAction.ACTION_DEMO_THUNK_SUCCESS;
    payload: IDemoThunkSuccessPayload;
}

export const demoThunkSuccessAction: (payload: IDemoThunkSuccessPayload) => IDemoThunkSuccessAction = (payload) => {
    return {
        type: EDemoThunkAction.ACTION_DEMO_THUNK_SUCCESS,
        payload: payload,
    };
};

export interface IDemoThunkFailAction {
    type: EDemoThunkAction.ACTION_DEMO_THUNK_FAIL;
    payload: AxiosError;
}

export const demoThunkFailAction: (payload: AxiosError) => IDemoThunkFailAction = (payload) => {
    return {
        type: EDemoThunkAction.ACTION_DEMO_THUNK_FAIL,
        payload: payload,
    };
};

export const demoThunkAction = (data: IReqDemoThunkPayload): IThunkResult<Promise<void>> => (dispatch) => {
    const retPromise = api.post(`/demo_thunks`, data)
        .then((res) => {
            dispatch(demoThunkSuccessAction(res.data))
        })
        .catch((err: AxiosError) => {
            dispatch(demoThunkFailAction(err))
        });
    return retPromise;
};


export type IDemoThunkAction =  IDemoThunkSuccessAction | IDemoThunkFailAction;
