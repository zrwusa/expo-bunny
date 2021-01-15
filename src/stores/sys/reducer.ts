import {ESys, EThemes} from "../../types/enums";
import {Sys} from "../../types/models";
import {SysActions} from "./actions";

const initialState: Sys = {
    error: "",
    warn: "",
    themeName: EThemes.DEFAULT
};

export function sysStateReducer(state: Sys = initialState, {type, payload}: SysActions): Sys {
    switch (type) {
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
        default:
            return state;
    }
}


