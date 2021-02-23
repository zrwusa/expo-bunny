import api from "../../utils/api";
import {DemoThunkPayload, DemoThunkSuccessPayload} from "../../types/payloads";
import {DemoThunkSuccess, SysError} from "../../types/actions";
import {EDemoThunk} from "../../constants/constants";
import {Action, ActionCreator, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {DemoThunk} from "../../types/models";
import {BusinessLogicError, sysError} from "../sys/actions";

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
            if (res.data) {
                result = dispatch(demoThunkSuccess(res.data));
            } else {
                result = dispatch(sysError({error: new BusinessLogicError('No demo thunks response data')}));
            }
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };
};

export type DemoThunkActions = DemoThunkSuccess;
