export interface IReqLoginPayload {
    email: string;
    password:string;
}

export interface ILoginSuccessPayload {
    access_token: string;
}

export interface ILogoutPayload {
    email: string;
}

