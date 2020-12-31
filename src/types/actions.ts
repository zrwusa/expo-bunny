import {AxiosError} from "axios";
import {EAuth, EDemoHello, EDemoThunk} from "./constants";
import {DemoHello2Payload, DemoHelloPayload, DemoThunkSuccessPayload, RestoreTokenPayload, SignOutPayload} from "./payloads";

export interface SignOut {
    type: EAuth.SIGN_OUT;
    payload: SignOutPayload;
}

export interface RestoreToken {
    type: EAuth.RESTORE_TOKEN;
    payload: RestoreTokenPayload;
}

export interface AuthFailed {
    type: EAuth.AUTH_FAIL;
    payload: AxiosError;
}

export interface DemoThunkSuccess {
    type: EDemoThunk.DEMO_THUNK_SUCCESS;
    payload: DemoThunkSuccessPayload;
}

export interface DemoThunkFailed {
    type: EDemoThunk.DEMO_THUNK_FAILED;
    payload: AxiosError;
}

export interface DemoHello {
    type: EDemoHello.DEMO_HELLO;
    payload: DemoHelloPayload;
}

export interface DemoHello2 {
    type: EDemoHello.DEMO_HELLO2;
    payload: DemoHello2Payload;
}
