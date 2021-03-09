import api from "../../helpers/bunny-api";
import {
    CollectBLResultAction,
    DemoThunkPayload,
    DemoThunkState,
    DemoThunkSuccessAction,
    DemoThunkSuccessPayload,
    RequestConfig,
    RequestFailedAction,
    RequestingAction,
    RequestReceivedAction,
    SysErrorAction
} from "../../types";
import {EBLMsg, EDemoThunk} from "../../constants";
import {Action, ActionCreator, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {requestFailed, requesting, requestReceived, sysError} from "./sys";
import {collectBLResult} from "./business-logic";
import {blError} from "../../helpers";

export const demoThunkSuccess: (payload: DemoThunkSuccessPayload) => DemoThunkSuccessAction = (payload) => {
    return {
        type: EDemoThunk.DEMO_THUNK_SUCCESS,
        payload: payload,
    };
};

export const demoThunk: ActionCreator<ThunkAction<Promise<Action>, DemoThunkState, void, DemoThunkSuccessAction>> = (reqParams: DemoThunkPayload) => {
    return async (dispatch: Dispatch<DemoThunkSuccessAction | SysErrorAction | CollectBLResultAction | RequestingAction | RequestReceivedAction | RequestFailedAction>): Promise<Action> => {
        let result;
        const config: RequestConfig = {url: '/demo-thunks', method: 'POST', data: reqParams}
        try {
            result = dispatch(requesting(config))
            const res = await api.request(config);
            if (res.data) {
                result = dispatch(demoThunkSuccess(res.data));
                result = dispatch(requestReceived(config))
            } else {
                result = dispatch(collectBLResult(blError(EBLMsg.NO_DEMO_THUNK_DATA)));
            }
            return result
        } catch (err) {
            result = dispatch(sysError({error: err}))
            result = dispatch(requestFailed(config))
            return result;
        }
    };
};

export type DemoThunkActions = DemoThunkSuccessAction;
