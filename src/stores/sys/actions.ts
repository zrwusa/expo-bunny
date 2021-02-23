import {
    RestoreIsReadyPayload, RestoreNavInitialStatePayload, SysClearErrorPayload, SysErrorPayload, SysWarnPayload
} from "../../types";
import {
    RestoreIsReady, RestoreNavInitialState, SysClearErrors, SysError, SysWarn
} from "../../types";
import {ESys} from "../../constants/";

export const sysError: (payload: SysErrorPayload) => SysError = (payload) => {
    return {
        type: ESys.ERROR,
        payload: payload,
    };
};

export const sysClearErrors: (payload: SysClearErrorPayload) => SysClearErrors = (payload) => {
    return {
        type: ESys.CLEAR_ERRORS,
        payload: payload,
    };
};

export const sysWarn: (payload: SysWarnPayload) => SysWarn = (payload) => {
    return {
        type: ESys.WARN,
        payload: payload,
    };
};

export const restoreNavInitialState: (payload: RestoreNavInitialStatePayload) => RestoreNavInitialState = (payload) => {
    return {
        type: ESys.RESTORE_NAV_INITIAL_STATE,
        payload: payload,
    };
};

export const restoreIsReady: (payload: RestoreIsReadyPayload) => RestoreIsReady = (payload) => {
    return {
        type: ESys.RESTORE_IS_READY,
        payload: payload,
    };
};

export class BusinessLogicError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BusinessLogicError";
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, BusinessLogicError.prototype);
    }
}

export type SysActions = RestoreIsReady | SysError | SysWarn | RestoreNavInitialState | SysClearErrors;
