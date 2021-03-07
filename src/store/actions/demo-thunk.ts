import api from "../../helpers/bunny-api";
import {CollectBLInfoAction, DemoThunkPayload, DemoThunkState, DemoThunkSuccessAction, DemoThunkSuccessPayload, SysErrorAction} from "../../types";
import {EBLInfo, EDemoThunk} from "../../constants";
import {Action, ActionCreator, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {sysError} from "./sys";
import {collectBLInfo} from "./business-logic";
import {blInfo} from "../../helpers";

export const demoThunkSuccess: (payload: DemoThunkSuccessPayload) => DemoThunkSuccessAction = (payload) => {
    return {
        type: EDemoThunk.DEMO_THUNK_SUCCESS,
        payload: payload,
    };
};

export const demoThunk: ActionCreator<ThunkAction<Promise<Action>, DemoThunkState, void, DemoThunkSuccessAction>> = (reqParams: DemoThunkPayload) => {
    return async (dispatch: Dispatch<DemoThunkSuccessAction | SysErrorAction | CollectBLInfoAction>): Promise<Action> => {
        let result;
        try {
            const res = await api.post(`/demo_thunks`, reqParams);
            if (res.data) {
                result = dispatch(demoThunkSuccess(res.data));
            } else {
                result = dispatch(collectBLInfo({error: blInfo(EBLInfo.NO_DEMO_THUNK_DATA)}));
            }
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };
};

export type DemoThunkActions = DemoThunkSuccessAction;
