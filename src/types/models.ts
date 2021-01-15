import {GoogleUser} from "expo-google-app-auth";

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

export type UserReq = {
    email: string,
    password: string,
    nickname: string
}

export type UserRes = {
    email: string,
    nickname: string
}

export type AuthRes = {
    access_token: string | undefined,
    user?: UserRes | null,
}

export type Auth = {
    isLoading: boolean,
    isSignOut: boolean,
    accessToken: undefined | string | null,
    user?: (UserRes | null) | GoogleUser
}

export type Sys = {
    error: string,
    warn: string,
    themeName: string,
}

export interface RootState {
    sysState: Sys,
    authState: Auth,
    demoHelloState: DemoHello,
    demoHello2State: DemoHello2,
    demoThunkState: DemoThunk,
    demoMapState: DemoMap,
}
