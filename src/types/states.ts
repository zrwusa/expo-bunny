// Redux store states,different from models entities
import {InitialState} from "@react-navigation/native";
import {DemoSaga, NearbyFilm, Region} from "./models";
import {BLResult} from "./bl";
import {Notification} from "expo-notifications";
import {RequestConfig} from "./payloads";

export type RequestStatus = {

    status: 'LOADING' | 'SUCCESS' | 'FAILED';
} & RequestConfig

export type SysState = {
    errors: Error[],
    warns: string[],
    isReady: boolean,
    themeName: string,
    language: string,
    navInitialState?: InitialState,
    requestStatuses: RequestStatus[]
}

export type BLResultState = {
    blResults: BLResult[]
}

export interface DemoHelloState {
    name: string,
    order: number,
}

export interface DemoHello2State {
    company: string,
    companyId: string,
    job: string,
    jobId: string,
    isHighP: boolean,
}

export type DemoThunkState = {
    id: number,
    text: string,
}

export type DemoMapState = {
    demoNearbyFilms: NearbyFilm[],
    region: Region,
}


export interface DemoSagaState {
    isFetching: boolean,
    items: DemoSaga[]
}

export type PickerSelectorItem<T> = {
    label: string;
    value: T;
    key?: string | number;
    color?: string;
    inputLabel?: string;
}

export interface DemoCryptoCurrencyState {
    notification: Notification,
    currentPrice: number,
    granularity: number,
    expoPushToken: string,
    reminder: {
        times: number,
        interval: string
    },
    dictionaries: {
        granularity: PickerSelectorItem<number>[],
        times: PickerSelectorItem<number>[],
        interval: PickerSelectorItem<string>[],
    }
}

export interface RootState {
    sysState: SysState,
    blResultState: BLResultState,
    demoHelloState: DemoHelloState,
    demoHello2State: DemoHello2State,
    demoThunkState: DemoThunkState,
    demoMapState: DemoMapState,
    demoSagaState: DemoSagaState,
    demoCryptoCurrencyState: DemoCryptoCurrencyState
}
