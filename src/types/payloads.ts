// Action payloads
import {InitialState} from "@react-navigation/native";
import {BunnyAPIStandardRequestParams} from "./api";
import {Method} from "axios";

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

// export interface BLInfoPayload {
//     info: BLResult;
// }

export interface ClearBLResultPayload {
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

export interface RequestConfig {
    method: Method;
    url: string;
    params?: any,
    data?: any
}

export interface RequestingPayload {
    method: Method;
    url: string;
    params?: any
}

export interface RequestReceivedPayload {
    method: Method;
    url: string;
    params?: any;
}

export interface RequestFailedPayload {
    method: Method;
    url: string;
    params?: any;
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

export interface SaveQuickAlertSettingsParams {
    token: string,
    granularity: number,
    reminder: {
        times: number,
        interval: string
    }
}


export interface CancelAlertSettingsParams {
    token: string,
    cancelAll: boolean,
}

export interface ReceiveGetCurrentPricePayload {
    currentPrice: number,
}

