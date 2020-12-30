export interface IUser {
    access_token: string,
    email:string,
    nickname:string,
}
export interface IUserState {
    user: IUser;
    isValid: boolean;
    fetching: boolean,
    fetched: boolean,
    error: string,
}




