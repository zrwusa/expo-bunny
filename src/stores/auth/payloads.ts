import {AxiosError} from "axios";

export interface SignInPayload {
    email: string;
    password:string;
}

export interface SignOutPayload {
    username?: string;
}

export interface RestoreTokenPayload {
    access_token:string;
    nickname?:string;
}

export interface AuthFailedPayload {
    error: AxiosError;
}



