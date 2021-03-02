import {EnumThemeNames} from "../types";

const BunnyConstants = {
    latLngDeltaGrace: {
        latitudeDelta: 0.0069,
        longitudeDelta: 0.0045,
    },
    statusBarHeight: 20,
    THEME_NAME_PERSISTENCE_KEY: 'THEME_TYPE',
    LANGUAGE_TYPE_PERSISTENCE_KEY: 'LANGUAGE_TYPE',
    NAV_STATE_PERSISTENCE_KEY: 'NAVIGATION_STATE',
    ACCESS_TOKEN_PERSISTENCE_KEY: 'ACCESS_TOKEN',
    REFRESH_TOKEN_PERSISTENCE_KEY: 'REFRESH_TOKEN',
    USER_PERSISTENCE_KEY: 'USER',
    dummyUser: {email: 'dummy@dummy.com', nickname: 'dummy nickname'},
    dummyAccessToken: 'access_token_dummy',
    throttleWait: 500,
    fnNoop: () => undefined,
    fooInterval: setInterval((): void => undefined, 0),
    fooTimeout: setTimeout((): void => undefined, 0),
}

export enum EAuth {
    SIGN_IN = "SIGN_IN",
    SIGN_OUT = "SIGN_OUT",
    RESTORE_AUTH = "RESTORE_AUTH",
    RESTORE_AUTH_REDIRECTION = "RESTORE_AUTH_REDIRECTION",
    RESTORE_AUTH_GOOGLE = "RESTORE_AUTH_GOOGLE",
}

export enum ESys {
    ERROR = "ERROR",
    CLEAR_ERRORS = "CLEAR_ERRORS",
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

export enum EBusinessInfo {
    NO_ACCESS_TOKEN_RESPONDED = "No access_token responded",
    NO_USER_INFO_RESPONDED = "No user info responded",
    NO_DATA_RESPONDED = "No data responded",
    NO_ACCESS_TOKEN_OR_REFRESH_TOKEN_RESPONDED = "No access token or refresh token responded",
    G00GLE_LOGIN_CANCELED = "Google login canceled",
    GOOGLE_ACCESS_TOKEN_NOT_EXISTS = "Google accessToken not exists",
    GOOGLE_LOGIN_RESULT_TYPE_INVALID = "Google loginResult has returned type neither success nor cancel",
    NO_GOOGLE_LOGIN_RESULT = "No google login result",
    NO_ACCESS_TOKEN_RETURNED = "No access_token returned",
    NOT_CONFORM_TO_API_RESPONSE_STRUCTURE = "Not conform to BunnyAPI response structure",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
    // XXX = "Xxx",
}

export enum EDemoSaga {
    GET_DEMO_SAGAS = 'GET_DEMO_SAGAS',
    REQUEST_GET_DEMO_SAGAS = 'REQUEST_GET_DEMO_SAGAS',
    RECEIVE_GET_DEMO_SAGAS = 'RECEIVE_GET_DEMO_SAGAS',
    FAILED_GET_DEMO_SAGAS = 'FAILED_GET_DEMO_SAGAS',
}


export const EThemes: EnumThemeNames = {
    light: 'light',
    dark: 'dark',
}

export const ELanguage = {
    en: 'en',
    zh: 'zh',
}

export const EHttpStatus = {
    UNAUTHORIZED: 401,
}


export default BunnyConstants
