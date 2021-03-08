import {
    RequestReceivedAction,
    RequestReceivedPayload, RequestFailedAction, RequestFailedPayload,
    RequestingAction,
    RequestingPayload,
    RestoreIsReadyAction,
    RestoreIsReadyPayload,
    RestoreNavInitialStateAction,
    RestoreNavInitialStatePayload,
    SysClearErrorPayload,
    SysClearErrorsAction,
    SysErrorAction,
    SysErrorPayload,
    SysWarnAction,
    SysWarnPayload
} from "../../types";
import {ESys} from "../../constants";

export const sysError: (payload: SysErrorPayload) => SysErrorAction = (payload) => {
    return {
        type: ESys.ERROR,
        payload: payload,
    };
};


export const sysClearErrors: (payload: SysClearErrorPayload) => SysClearErrorsAction = (payload) => {
    return {
        type: ESys.CLEAR_ERRORS,
        payload: payload,
    };
};

export const sysWarn: (payload: SysWarnPayload) => SysWarnAction = (payload) => {
    return {
        type: ESys.WARN,
        payload: payload,
    };
};

export const restoreNavInitialState: (payload: RestoreNavInitialStatePayload) => RestoreNavInitialStateAction = (payload) => {
    return {
        type: ESys.RESTORE_NAV_INITIAL_STATE,
        payload: payload,
    };
};

export const restoreIsReady: (payload: RestoreIsReadyPayload) => RestoreIsReadyAction = (payload) => {
    return {
        type: ESys.RESTORE_IS_READY,
        payload: payload,
    };
};

export const requesting: (payload: RequestingPayload) => RequestingAction = (payload) => {
    return {
        type: ESys.REQUESTING,
        payload: payload,
    };
};

export const requestReceived: (payload: RequestReceivedPayload) => RequestReceivedAction = (payload) => {
    return {
        type: ESys.REQUEST_RECEIVED,
        payload: payload,
    };
};

export const requestFailed: (payload: RequestFailedPayload) => RequestFailedAction = (payload) => {
    return {
        type: ESys.REQUEST_FAILED,
        payload: payload,
    };
};

export type SysActions =
    RestoreIsReadyAction
    | SysErrorAction
    | SysWarnAction
    | RestoreNavInitialStateAction
    | SysClearErrorsAction
    | RequestingAction
    | RequestReceivedAction
    | RequestFailedAction;
