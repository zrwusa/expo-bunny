import api from "../../common/api";
import {DemoThunkPayload, DemoThunkSuccessPayload} from "../../types/payloads";
import {DemoThunkSuccess, SysError} from "../../types/actions";
import {EDemoThunk} from "../../types/enums";
import {Action, ActionCreator, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
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
        let r;
        try {
            const res = await api.post(`/demo_thunks`, reqParams);
            r = dispatch(demoThunkSuccess(res.data));
        } catch (e) {
            console.log(e.toString())
            r = dispatch(sysError({error: e.toString()}));
        }
        return r;
    };
};

export type DemoThunkActions = DemoThunkSuccess;
