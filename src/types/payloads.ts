import {GoogleUser} from "expo-google-app-auth/src/Google";
import {Theme} from "./models";

export interface SignInPayload {
    email: string;
    password: string;
}

export interface SignOutPayload {
    username?: string;
}

export type RestoreAuthPayload = {
    access_token: string;
    user:{
        email:string;
        nickname: string;
    }
}

export type RestoreAuthGooglePayload = {
    type: 'success';
    accessToken: string | null;
    idToken: string | null;
    refreshToken: string | null;
    user: GoogleUser;
}

export interface SysErrorPayload {
    error: string;
}

export interface SysWarnPayload {
    warn: string;
}

export interface RestoreThemePayload {
    theme:Theme ;
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





