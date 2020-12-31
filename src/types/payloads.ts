import {GoogleUser} from "expo-google-app-auth/src/Google";

export interface SignInPayload {
    email: string;
    password: string;
}

export interface SignOutPayload {
    username?: string;
}

export type RestoreTokenPayload = {
    access_token: string;
    nickname?: string;
}

export type RestoreTokenGooglePayload =
    | {
    type: 'success';
    accessToken: string | null;
    idToken: string | null;
    refreshToken: string | null;
    user: GoogleUser;
}
    | {
    type: 'cancel';
};

export interface AuthFailedPayload {
    error: string;
}

export interface AuthWarnPayload {
    warn: string;
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


