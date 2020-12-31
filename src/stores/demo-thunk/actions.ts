import {EDemoThunk} from "./constants";
import {DemoThunkSuccessPayload, DemoThunkPayload} from "./payloads";
import {AxiosError} from "axios";
import {IThunkResult} from "../thunk";
import api from "../../common/api";



export interface DemoThunkSuccess {
    type: EDemoThunk.DEMO_THUNK_SUCCESS;
    payload: DemoThunkSuccessPayload;
}

export const demoThunkSuccess: (payload: DemoThunkSuccessPayload) => DemoThunkSuccess = (payload) => {
    return {
        type: EDemoThunk.DEMO_THUNK_SUCCESS,
        payload: payload,
    };
};

export interface DemoThunkFailed {
    type: EDemoThunk.DEMO_THUNK_FAILED;
    payload: AxiosError;
}

export const demoThunkFailed: (payload: AxiosError) => DemoThunkFailed = (payload) => {
    return {
        type: EDemoThunk.DEMO_THUNK_FAILED,
        payload: payload,
    };
};

export const demoThunk = (data: DemoThunkPayload): IThunkResult<Promise<void>> => (dispatch) => {
    const retPromise = api.post(`/demo_thunks`, data)
        .then((res) => {
            dispatch(demoThunkSuccess(res.data))
        })
        .catch((err: AxiosError) => {
            dispatch(demoThunkFailed(err))
        });
    return retPromise;
};


export type DemoThunkActions =  DemoThunkSuccess | DemoThunkFailed;
