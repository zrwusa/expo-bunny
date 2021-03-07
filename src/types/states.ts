// Redux store states,different from models entities
import {InitialState} from "@react-navigation/native";
import {DemoSaga} from "../store/actions";
import {NearbyFilm, Region} from "./models";
import {BusinessLogicReturn} from "./business";

export type SysState = {
    error: Error[],
    warn: string[],
    isReady: boolean,
    themeName: string,
    language: string,
    navInitialState?: InitialState
}

export type BusinessLogicState = {
    infos: BusinessLogicReturn[]
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

export interface RootState {
    sysState: SysState,
    blInfoState: BusinessLogicState,
    demoHelloState: DemoHelloState,
    demoHello2State: DemoHello2State,
    demoThunkState: DemoThunkState,
    demoMapState: DemoMapState,
    demoSagaState: DemoSagaState
}