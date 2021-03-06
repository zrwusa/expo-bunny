// Action payloads
import {InitialState} from "@react-navigation/native";
import {BunnyAPIStandardRequestParams} from "./api";
import {BusinessLogicReturn} from "./business";

export interface SignInParams {
    email: string;
    password: string;
}

export interface SignUpParams {
    email: string;
    password: string;
}

type TimeSpend = {
    timeSpend?: number
}

export interface SysErrorPayload {
    error: Error & TimeSpend;
}

export interface BusinessLogicInfoPayload {
    error: BusinessLogicReturn;
}

export interface BLInfoClearInfosPayload {
    all?: boolean;
    top?: number;
    last?: number;
}

export interface SysClearErrorPayload {
    all?: boolean;
    top?: number;
    last?: number;
}

export interface SysWarnPayload {
    warn: string;
}

export interface RestoreNavInitialStatePayload {
    navInitialState: InitialState;
}

export interface RestoreIsReadyPayload {
    isReady: boolean;
}

export interface DemoHelloPayload {
    order: number;
}

export interface DemoHello2Payload {
    name: string;
}

export interface DemoThunkPayload {
    text: string;
    id: number;
}

export interface DemoThunkSuccessPayload {
    text: string;
}

export interface GetNearbyFilmsReqParams {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export interface GetDemoSagaParams extends BunnyAPIStandardRequestParams {
    filter?: {
        id?: number,
        text?: string
    }
}
