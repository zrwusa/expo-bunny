import {ELanguage, ESys} from "../../utils/constants";
import {Sys} from "../../types/models";
import {SysActions} from "./actions";
import {EThemes} from "../../utils/constants";
import {
    RestoreIsReadyPayload,
    RestoreLanguagePayload,
    RestoreNavInitialStatePayload,
    RestoreThemePayload, SysClearErrorPayload,
    SysErrorPayload,
    SysWarnPayload
} from "../../types/payloads";

const initialState: Sys = {
    isReady: false,
    error: [],
    warn: [""],
    themeName: EThemes.DEFAULT,
    language: ELanguage.en,
    navInitialState: undefined
};

export function sysStateReducer(state: Sys = initialState, {type, payload}: SysActions): Sys {
    switch (type) {
        case ESys.RESTORE_IS_READY:
            const restoreIsReadyPayload = payload as RestoreIsReadyPayload
            return {
                ...state,
                ...restoreIsReadyPayload,
            }
        case ESys.ERROR: {
            const sysErrorPayload = payload as SysErrorPayload
            // if (__DEV__) {
            //     console.error(sysErrorPayload.error)
            // }
            state.error.push(sysErrorPayload.error);
            return {
                ...state,
            };
        }
        case ESys.CLEAR_ERRORS:{
            const sysClearErrorPayload = payload as SysClearErrorPayload
            if(sysClearErrorPayload.all){
                state.error=[]
            }else if(sysClearErrorPayload.top){
                state.error.splice(0,sysClearErrorPayload.top)
            }else if (sysClearErrorPayload.last){
                state.error.splice(state.error.length-sysClearErrorPayload.last,sysClearErrorPayload.last)
            }
            return {...state};
        }
        case ESys.WARN: {
            const sysWarnPayload = payload as SysWarnPayload
            // if (__DEV__) {
            //     console.warn(sysWarnPayload.warn);
            // }
            state.warn.push(sysWarnPayload.warn)
            return {
                ...state,
            };
        }
        case ESys.RESTORE_THEME:
            const restoreThemePayload = payload as RestoreThemePayload
            return {
                ...state,
                ...restoreThemePayload
            }
        case ESys.RESTORE_LANGUAGE:
            const restoreLanguagePayload = payload as RestoreLanguagePayload
            return {
                ...state,
                ...restoreLanguagePayload
            }
        case ESys.RESTORE_NAV_INITIAL_STATE:
            const restoreNavInitialStatePayload = payload as RestoreNavInitialStatePayload
            return {
                ...state,
                ...restoreNavInitialStatePayload
            }
        default:
            return state;
    }
}


