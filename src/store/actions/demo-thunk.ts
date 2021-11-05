import {bunnyAPI} from '../../helpers/bunny-api';
import {
    CollectBLResultAction,
    DemoThunkPayload,
    DemoThunkState,
    DemoThunkSuccessAction,
    DemoThunkSuccessPayload,
    RequestConfig,
    RequestFailedAction,
    RequestingAction,
    RequestSuccessAction,
    SysErrorAction
} from '../../types';
import {EBizLogicMsg, EDemoThunk} from '../../constants';
import {Action, ActionCreator, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {collectSysError, requestFailed, requesting, requestSuccess} from './sys';
import {collectBLResult} from './bl-result';
import {blError} from '../../helpers';

export const demoThunkSuccess: (payload: DemoThunkSuccessPayload) => DemoThunkSuccessAction = (payload) => {
    return {
        type: EDemoThunk.DEMO_THUNK_SUCCESS,
        payload
    };
};

export const demoThunk: ActionCreator<ThunkAction<Promise<Action>, DemoThunkState, void, DemoThunkSuccessAction>> = (reqParams: DemoThunkPayload) => {
    return async (dispatch: Dispatch<DemoThunkSuccessAction | SysErrorAction | CollectBLResultAction | RequestingAction | RequestSuccessAction | RequestFailedAction>): Promise<Action> => {
        let result;
        const config: RequestConfig = {url: '/demo-thunks', method: 'POST', data: reqParams};
        try {
            result = dispatch(requesting(config));
            const res = await bunnyAPI.request(config);
            if (res.data) {
                result = dispatch(demoThunkSuccess(res.data));
                result = dispatch(requestSuccess(config));
            } else {
                result = dispatch(collectBLResult(blError(EBizLogicMsg.NO_DEMO_THUNK_DATA)));
            }
            return result;
        } catch (e: any) {
            result = dispatch(collectSysError(e));
            result = dispatch(requestFailed(config));
            return result;
        }
    };
};

export type DemoThunkActions = DemoThunkSuccessAction;
