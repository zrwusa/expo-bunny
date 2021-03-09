// Redux store states,different from models entities
import {InitialState} from "@react-navigation/native";
import {DemoSaga, NearbyFilm, Region} from "./models";
import {BLReturn} from "./business";
import {Notification} from "expo-notifications";

export interface RequestStatus {
    id: string;
    status: 'FETCHING'|'SUCCESS'|'FAILED';
}

export type SysState = {
    error: Error[],
    warn: string[],
    isReady: boolean,
    themeName: string,
    language: string,
    navInitialState?: InitialState,
    requestStatuses: RequestStatus[]
}

export type BLState = {
    infos: BLReturn[]
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

export interface BitcoinAlertState {
    notification:Notification,
    currentPrice:number,
    granularity:number,
    expoPushToken:string,
    reminder:{
        times: number,
        interval: string
    },
    dictionaries:{

    }
}

export interface RootState {
    sysState: SysState,
    blInfoState: BLState,
    demoHelloState: DemoHelloState,
    demoHello2State: DemoHello2State,
    demoThunkState: DemoThunkState,
    demoMapState: DemoMapState,
    demoSagaState: DemoSagaState
}
