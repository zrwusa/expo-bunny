import {InitialState} from "@react-navigation/native";
import {ImageSourcePropType} from "react-native";

export interface DemoHello {
    name: string,
    order: number,
}

export interface DemoHello2 {
    company: string,
    companyId: string,
    job: string,
    jobId: string,
    isHighP: boolean,
}

export type DemoThunk = {
    id: number,
    text: string,
}

export type DemoEmployee = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
}

export type NearbyFilm = {
    id: string,
    title: string,
    coordinate: {
        latitude: number,
        longitude: number,
    },
    image: ImageSourcePropType | {
        uri: string,
    },
    description: string,
}

export type Region = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}

export type DemoMap = {
    demoNearbyFilms: NearbyFilm[],
    region: Region,
}

export type Sys = {
    error: Error[],
    warn: string[],
    isReady: boolean,
    themeName: string,
    language: string,
    navInitialState?: InitialState
}

export interface RootState {
    sysState: Sys,
    demoHelloState: DemoHello,
    demoHello2State: DemoHello2,
    demoThunkState: DemoThunk,
    demoMapState: DemoMap,
}
