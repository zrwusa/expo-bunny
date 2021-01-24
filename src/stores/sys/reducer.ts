import {ELanguage, ESys} from "../../common/constants";
import {Sys} from "../../types/models";
import {SysActions} from "./actions";
import {EThemes} from "../../common/constants";

const initialState: Sys = {
    isReady: false,
    error: "",
    warn: "",
    themeName: EThemes.DEFAULT,
    language: ELanguage.en,
    navInitialState: undefined
};

export function sysStateReducer(state: Sys = initialState, {type, payload}: SysActions): Sys {
    switch (type) {
        case ESys.RESTORE_IS_READY:
            return {
                ...state,
                ...payload,
            }
        case ESys.ERROR: {
            return {
                ...state,
                ...payload,
            };
        }
        case ESys.WARN: {
            return {
                ...state,
                ...payload,
            };
        }
        case ESys.RESTORE_THEME:
            return {
                ...state,
                ...payload
            }
        case ESys.RESTORE_LANGUAGE:
            return {
                ...state,
                ...payload
            }
        case ESys.RESTORE_NAV_INITIAL_STATE:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}


