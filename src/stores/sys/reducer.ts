import {ELanguage, ESys} from "../../constants";
import {Sys} from "../../types/models";
import {SysActions} from "./actions";
import {EThemes} from "../../constants";
import {
    RestoreIsReadyPayload,
    RestoreNavInitialStatePayload,
    SysClearErrorPayload,
    SysErrorPayload,
    SysWarnPayload
} from "../../types";

const initialState: Sys = {
    isReady: false,
    error: [],
    warn: [""],
    themeName: EThemes.light,
    language: ELanguage.en,
    navInitialState: undefined
};

export function sysStateReducer(prevState: Sys = initialState, {type, payload}: SysActions): Sys {
    switch (type) {
        case ESys.RESTORE_IS_READY:
            const restoreIsReadyPayload = payload as RestoreIsReadyPayload
            return {
                ...prevState,
                ...restoreIsReadyPayload,
            }
        case ESys.ERROR: {
            const sysErrorPayload = payload as SysErrorPayload
            // if (__DEV__) {
            //     console.error(sysErrorPayload.error)
            // }
            prevState.error.push(sysErrorPayload.error);
            return {
                ...prevState,
            };
        }
        case ESys.CLEAR_ERRORS: {
            const sysClearErrorPayload = payload as SysClearErrorPayload
            if (sysClearErrorPayload.all) {
                prevState.error = []
            } else if (sysClearErrorPayload.top) {
                prevState.error.splice(0, sysClearErrorPayload.top)
            } else if (sysClearErrorPayload.last) {
                prevState.error.splice(prevState.error.length - sysClearErrorPayload.last, sysClearErrorPayload.last)
            }
            return {...prevState};
        }
        case ESys.WARN: {
            const sysWarnPayload = payload as SysWarnPayload
            // if (__DEV__) {
            //     console.warn(sysWarnPayload.warn);
            // }
            prevState.warn.push(sysWarnPayload.warn)
            return {
                ...prevState,
            };
        }
        case ESys.RESTORE_NAV_INITIAL_STATE:
            const restoreNavInitialStatePayload = payload as RestoreNavInitialStatePayload
            return {
                ...prevState,
                ...restoreNavInitialStatePayload
            }
        default:
            return prevState;
    }
}


