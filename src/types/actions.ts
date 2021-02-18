import {AxiosError} from "axios";
import {EAuth, EDemoHello, EDemoMap, EDemoThunk, ESys} from "../utils/constants";
import {
    DemoHello2Payload,
    DemoHelloPayload,
    DemoThunkSuccessPayload,
    RestoreAuthGooglePayload,
    RestoreAuthPayload,
    RestoreIsReadyPayload,
    RestoreLanguagePayload,
    RestoreNavInitialStatePayload,
    RestoreThemePayload,
    SignOutPayload, SysClearErrorPayload,
    SysErrorPayload,
    SysWarnPayload
} from "./payloads";
import {NearbyFilm, Region} from "./models";

export interface DemoHello {
    type: EDemoHello.DEMO_HELLO;
    payload: DemoHelloPayload;
}

export interface DemoHello2 {
    type: EDemoHello.DEMO_HELLO2;
    payload: DemoHello2Payload;
}

export interface SignOut {
    type: EAuth.SIGN_OUT;
    payload: SignOutPayload;
}

export interface RestoreAuth {
    type: EAuth.RESTORE_AUTH;
    payload: RestoreAuthPayload;
}

export interface RestoreAuthGoogle {
    type: EAuth.RESTORE_AUTH_GOOGLE;
    payload: RestoreAuthGooglePayload;
}


export interface SysError {
    type: ESys.ERROR;
    payload: SysErrorPayload;
}

export interface SysClearErrors {
    type: ESys.CLEAR_ERRORS;
    payload: SysClearErrorPayload;
}

export interface SysWarn {
    type: ESys.WARN;
    payload: SysWarnPayload;
}

export interface RestoreTheme {
    type: ESys.RESTORE_THEME;
    payload: RestoreThemePayload;
}

export interface RestoreLanguage {
    type: ESys.RESTORE_LANGUAGE;
    payload: RestoreLanguagePayload;
}

export interface RestoreNavInitialState {
    type: ESys.RESTORE_NAV_INITIAL_STATE;
    payload: RestoreNavInitialStatePayload;
}

export interface RestoreIsReady {
    type: ESys.RESTORE_IS_READY;
    payload: RestoreIsReadyPayload;
}

export interface DemoThunkSuccess {
    type: EDemoThunk.DEMO_THUNK_SUCCESS;
    payload: DemoThunkSuccessPayload;
}

export interface DemoThunkFailed {
    type: EDemoThunk.DEMO_THUNK_FAILED;
    payload: AxiosError;
}

export interface RestoreNearbyFilms {
    type: EDemoMap.RESTORE_NEARBY_FILMS;
    payload: NearbyFilm[];
}

export interface RestoreRegion {
    type: EDemoMap.RESTORE_REGION;
    payload: Region;
}

