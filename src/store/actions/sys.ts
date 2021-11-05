import {ESys} from '../../constants';
import {
    RequestConfig,
    RequestFailedAction,
    RequestingAction,
    RequestSuccessAction,
    RestoreIsReadyAction,
    RestoreIsReadyPayload,
    RestoreNavInitialStateAction,
    RestoreNavInitialStatePayload,
    SysClearErrorPayload,
    SysClearErrorsAction,
    SysErrorAction,
    SysWarnAction,
    SysWarnPayload
} from '../../types';


export const collectSysError: (payload: Error) => SysErrorAction = (payload) => {
    return {
        type: ESys.ERROR,
        payload
    };
};


export const sysClearErrors: (payload: SysClearErrorPayload) => SysClearErrorsAction = (payload) => {
    return {
        type: ESys.CLEAR_ERRORS,
        payload
    };
};


export const sysWarn: (payload: SysWarnPayload) => SysWarnAction = (payload) => {
    return {
        type: ESys.WARN,
        payload
    };
};


export const restoreIsReady: (payload: RestoreIsReadyPayload) => RestoreIsReadyAction = (payload) => {
    return {
        type: ESys.RESTORE_IS_READY,
        payload,
    };
};


export const requestFailed: (payload: RequestConfig) => RequestFailedAction = (payload) => {
    return {
        type: ESys.REQUEST_FAILED,
        payload
    };
};

export const requesting: (payload: RequestConfig) => RequestingAction = (payload) => {
    return {
        type: ESys.REQUESTING,
        payload,
    };
};


export const requestSuccess: (payload: RequestConfig) => RequestSuccessAction = (payload) => {
    return {
        type: ESys.REQUEST_SUCCESS,
        payload,
    };
};


export const restoreNavInitialState = (payload: RestoreNavInitialStatePayload): RestoreNavInitialStateAction => {
    return {
        type: ESys.RESTORE_NAV_INITIAL_STATE,
        payload
    };
};

export type SysActions =
    RestoreIsReadyAction
    | SysErrorAction
    | SysWarnAction
    | RestoreNavInitialStateAction
    | SysClearErrorsAction
    | RequestingAction
    | RequestSuccessAction
    | RequestFailedAction;
