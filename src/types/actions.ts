import {AxiosError} from "axios";
import {EAuth, EDemoHello, EDemoMap, EDemoThunk, ESys} from "./constants";
import {
    DemoHello2Payload,
    DemoHelloPayload,
    DemoThunkSuccessPayload,
    RestoreTokenGooglePayload,
    RestoreTokenPayload,
    SignOutPayload, SysErrorPayload, SysWarnPayload
} from "./payloads";
import {DemoNearbyFilms} from "./models";
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

export interface RestoreToken {
    type: EAuth.RESTORE_TOKEN;
    payload: RestoreTokenPayload;
}

export interface RestoreTokenGoogle {
    type: EAuth.RESTORE_TOKEN_GOOGLE;
    payload: RestoreTokenGooglePayload;
}


export interface SysError {
    type: ESys.ERROR;
    payload: SysErrorPayload;
}

export interface SysWarn {
    type: ESys.WARN;
    payload: SysWarnPayload;
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
    payload: DemoNearbyFilms;
}
