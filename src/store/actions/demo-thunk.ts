import {bunnyAPI} from '../../helpers/bunny-api';
import {
    CollectBizLogicResultAction,
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
import {collectBizLogicResult} from './biz-logic-result';
import {bizLogicError} from '../../helpers';

export const demoThunkSuccess = (payload: DemoThunkSuccessPayload): DemoThunkSuccessAction => {
    return {
        type: EDemoThunk.DEMO_THUNK_SUCCESS,
        payload
    };
};

export const demoThunk: ActionCreator<ThunkAction<Promise<Action>, DemoThunkState, void, DemoThunkSuccessAction>> = (reqParams: DemoThunkPayload) => {
    return async (dispatch: Dispatch<DemoThunkSuccessAction | SysErrorAction | CollectBizLogicResultAction | RequestingAction | RequestSuccessAction | RequestFailedAction>): Promise<Action> => {
        let result;
        const config: RequestConfig = {url: '/api/example-thunks', method: 'POST', data: reqParams};
        try {
            result = dispatch(requesting(config));
            const {data: {data}} = await bunnyAPI.request(config);
            if (data) {
                result = dispatch(demoThunkSuccess(data));
                result = dispatch(requestSuccess(config));
            } else {
                result = dispatch(collectBizLogicResult(bizLogicError(EBizLogicMsg.NO_DEMO_THUNK_DATA)));
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
