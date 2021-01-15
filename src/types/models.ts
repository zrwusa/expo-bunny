import {GoogleUser} from "expo-google-app-auth";
import {themes} from "../components/base-ui";

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
    first_name: string,
    last_name: string,
    email: string,
}

export type NearbyFilm = {
    title: string,
    coordinate: {
        latitude: number,
        longitude: number,
    },
    image: {
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

export type User = {
    email: string,
    password: string,
    nickname: string
}

export type Auth = {
    isLoading: boolean,
    isSignOut: boolean,
    accessToken: undefined | string | null,
    user?: User | GoogleUser
}

export type AuthResponse = {
    access_token: undefined | string | null,
    user?: User | GoogleUser
}

export type ThemeNames = keyof (typeof themes)

export type Sys = {
    error: string,
    warn: string,
    themeName: ThemeNames,
}

export interface RootState {
    sysState: Sys,
    authState: Auth,
    demoHelloState: DemoHello,
    demoHello2State: DemoHello2,
    demoThunkState: DemoThunk,
    demoMapState: DemoMap,
}
