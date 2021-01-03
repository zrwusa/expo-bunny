import {SysErrorPayload, SysWarnPayload} from "../../types/payloads";
import {SysError, SysWarn} from "../../types/actions";
import {ESys} from "../../types/constants";

export const sysError: (payload: SysErrorPayload) => SysError = (payload) => {
    return {
        type: ESys.ERROR,
        payload: payload,
    };
};

export const sysWarn: (payload: SysWarnPayload) => SysWarn = (payload) => {
    return {
        type: ESys.WARN,
        payload: payload,
    };
};

export type SysActions = SysError | SysWarn ;
