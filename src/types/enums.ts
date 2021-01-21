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
    RESTORE_IS_READY = "RESTORE_IS_READY",
    RESTORE_THEME = "RESTORE_THEME",
    RESTORE_LANGUAGE = "RESTORE_LANGUAGE",
    RESTORE_NAV_INITIAL_STATE = "RESTORE_NAV_INITIAL_STATE",
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

export const ELanguage = {
    en: 'en',
    zh: 'zh',
}


