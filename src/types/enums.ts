import {Traversable} from "./helpers";

export enum EAuth {
    SIGN_IN = "SIGN_IN",
    SIGN_OUT = "SIGN_OUT",
    RESTORE_AUTH = "RESTORE_AUTH",
    RESTORE_AUTH_GOOGLE = "RESTORE_AUTH_GOOGLE",
}

export enum ESys {
    ERROR = "ERROR",
    WARN = "WARN",
    RESTORE_THEME = "RESTORE_THEME",
}

export enum EDemoHello {
    DEMO_HELLO = "DEMO_HELLO",
    DEMO_HELLO2 = "DEMO_HELLO2",
}

export enum EDemoThunk {
    DEMO_THUNK_SUCCESS = "DEMO_THUNK_SUCCESS",
    DEMO_THUNK_FAILED = "DEMO_THUNK_FAILED",
}

export enum EDemoMap {
    RESTORE_NEARBY_FILMS = "RESTORE_NEARBY_FILMS",
    RESTORE_REGION = "RESTORE_REGION",
}

export const EThemes: Traversable = {
    default: 'default',
    dark: 'dark',
}


