import {AxiosError} from "axios";

export interface ISignInPayload {
    email: string;
    password:string;
}

export interface ISignOutPayload {
    username?: string;
}

export interface IRestoreTokenPayload {
    access_token:string;
    nickname?:string;
}

export interface IAuthFailPayload {
    error: AxiosError;
}



