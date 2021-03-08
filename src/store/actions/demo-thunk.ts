import api from "../../helpers/bunny-api";
import {
    CollectBLInfoAction,
    DemoThunkPayload,
    DemoThunkState,
    DemoThunkSuccessAction,
    DemoThunkSuccessPayload,
    RequestFailedAction,
    RequestingAction, RequestReceivedAction,
    SysErrorAction
} from "../../types";
import {EBLInfo, EDemoThunk} from "../../constants";
import {Action, ActionCreator, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {requestFailed, requesting, requestReceived, sysError} from "./sys";
import {collectBLInfo} from "./business-logic";
import {blInfo} from "../../helpers";

export const demoThunkSuccess: (payload: DemoThunkSuccessPayload) => DemoThunkSuccessAction = (payload) => {
    return {
        type: EDemoThunk.DEMO_THUNK_SUCCESS,
        payload: payload,
    };
};

export const demoThunk: ActionCreator<ThunkAction<Promise<Action>, DemoThunkState, void, DemoThunkSuccessAction>> = (reqParams: DemoThunkPayload) => {
    return async (dispatch: Dispatch<DemoThunkSuccessAction | SysErrorAction | CollectBLInfoAction | RequestingAction | RequestReceivedAction | RequestFailedAction>): Promise<Action> => {
        let result;
        try {
            result = dispatch(requesting({id: 'GET/demo-thunks'}))
            const res = await api.post(`/demo-thunks`, reqParams);
            if (res.data) {
                result = dispatch(demoThunkSuccess(res.data));
                result = dispatch(requestReceived({id: 'GET/demo-thunks'}))
            } else {
                result = dispatch(collectBLInfo({error: blInfo(EBLInfo.NO_DEMO_THUNK_DATA)}));
            }
            return result
        } catch (err) {
            result = dispatch(sysError({error: err}))
            result = dispatch(requestFailed({id: 'GET/demo-thunks'}))
            return result;
        }
    };
};

export type DemoThunkActions = DemoThunkSuccessAction;
