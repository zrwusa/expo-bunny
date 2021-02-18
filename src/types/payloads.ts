import {GoogleUser} from "expo-google-app-auth/src/Google";
import {UserRes} from "./models";
import {InitialState} from "@react-navigation/native";

export interface SignInPayload {
    email: string;
    password: string;
}

export interface SignOutPayload {
    username?: string;
}

export type RestoreAuthPayload = {
    access_token: string | undefined;
    user?: UserRes | null | undefined;
}

export type RestoreAuthGooglePayload = {
    type: 'success';
    accessToken: string | null;
    idToken: string | null;
    refreshToken: string | null;
    user: GoogleUser;
}

type TimeSpend={
    timeSpend?:number
}

export interface SysErrorPayload {
    error: Error & TimeSpend;
}

export interface SysClearErrorPayload {
    all?:boolean;
    top?:number;
    last?:number;
}

export interface SysWarnPayload {
    warn: string;
}

export interface RestoreThemePayload {
    themeName: string;
}

export interface RestoreLanguagePayload {
    language: string;
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





