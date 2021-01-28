import api from "../../utils/api";
import {DemoThunkPayload, DemoThunkSuccessPayload} from "../../types/payloads";
import {DemoThunkSuccess, SysError} from "../../types/actions";
import {EDemoThunk} from "../../utils/constants";
import {Action, ActionCreator, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {DemoThunk} from "../../types/models";
import {sysError} from "../sys/actions";

export const demoThunkSuccess: (payload: DemoThunkSuccessPayload) => DemoThunkSuccess = (payload) => {
    return {
        type: EDemoThunk.DEMO_THUNK_SUCCESS,
        payload: payload,
    };
};

export const demoThunk: ActionCreator<ThunkAction<Promise<Action>, DemoThunk, void, DemoThunkSuccess>> = (reqParams: DemoThunkPayload) => {
    return async (dispatch: Dispatch<DemoThunkSuccess | SysError>): Promise<Action> => {
        let result;
        try {
            const res = await api.post(`/demo_thunks`, reqParams);
            result = dispatch(demoThunkSuccess(res.data));
        } catch (e) {
            result = dispatch(sysError({error: e.toString()}));
        }
        return result;
    };
};

export type DemoThunkActions = DemoThunkSuccess;
