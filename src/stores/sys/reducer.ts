import {SysActions} from "./actions";
import {Sys} from "../../types/models";
import {ESys} from "../../types/constants";

export const initialState: Sys = {
    error: "",
    warn: "",
};

export function sysStateReducer(state: Sys = initialState, {type, payload}: SysActions): Sys {
    switch (type) {
        case ESys.ERROR: {
            console.log('-------ESys.ERROR',payload)
            return {
                ...state,
                ...payload,
            };
        }
        case ESys.WARN: {
            console.log('-------ESys.WARN',payload)
            return {
                ...state,
                ...payload,
            };
        }
        default:
            return state;
    }
}


