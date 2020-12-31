import {AxiosError} from "axios";
import api from "../../common/api";
import {DemoThunkPayload, DemoThunkSuccessPayload} from "../../types/payloads";
import {DemoThunkFailed, DemoThunkSuccess} from "../../types/actions";
import {EDemoThunk} from "../../types/constants";
import {ThunkResult} from "../../types/thunk";

export const demoThunkSuccess: (payload: DemoThunkSuccessPayload) => DemoThunkSuccess = (payload) => {
    return {
        type: EDemoThunk.DEMO_THUNK_SUCCESS,
        payload: payload,
    };
};

export const demoThunkFailed: (payload: AxiosError) => DemoThunkFailed = (payload) => {
    return {
        type: EDemoThunk.DEMO_THUNK_FAILED,
        payload: payload,
    };
};

export const demoThunk = (data: DemoThunkPayload): ThunkResult<Promise<void>> => (dispatch) => {
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
