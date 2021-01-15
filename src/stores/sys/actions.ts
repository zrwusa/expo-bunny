import AsyncStorage from "@react-native-async-storage/async-storage";
import {Action, ActionCreator, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {Sys} from "../../types/models";
import {RestoreThemePayload, SysErrorPayload, SysWarnPayload} from "../../types/payloads";
import {RestoreTheme, SysError, SysWarn} from "../../types/actions";
import {ESys} from "../../types/enums";
import BunnyConstants from "../../common/constants";

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

export const restoreTheme: (payload: RestoreThemePayload) => RestoreTheme = (payload) => {
    return {
        type: ESys.RESTORE_THEME,
        payload: payload,
    };
};

export const restoreAndSaveTheme: ActionCreator<ThunkAction<Promise<Action>, Sys, void, RestoreTheme>> = (payload: RestoreThemePayload) => {
    return async (dispatch: Dispatch<RestoreTheme | SysError>): Promise<Action> => {
        let result;
        try {
            await AsyncStorage.setItem(BunnyConstants.THEME_NAME_PERSISTENCE_KEY, payload.themeName);
            result = dispatch(restoreTheme(payload))
        } catch (err) {
            result = dispatch(sysError({error: err.toString()}))
        }
        return result;
    };
};

export type SysActions = SysError | SysWarn | RestoreTheme;
