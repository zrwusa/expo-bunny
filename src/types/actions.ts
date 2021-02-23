import {EDemoHello, EDemoMap, EDemoThunk, ESys} from "../constants";
import {
    DemoHello2Payload,
    DemoHelloPayload,
    DemoThunkSuccessPayload,
    RestoreIsReadyPayload,
    RestoreNavInitialStatePayload,
    SysClearErrorPayload,
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

export interface RestoreNearbyFilms {
    type: EDemoMap.RESTORE_NEARBY_FILMS;
    payload: NearbyFilm[];
}

export interface RestoreRegion {
    type: EDemoMap.RESTORE_REGION;
    payload: Region;
}

