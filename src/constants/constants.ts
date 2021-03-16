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


export enum ESys {
    ERROR = "ERROR",
    CLEAR_ERRORS = "CLEAR_ERRORS",
    WARN = "WARN",
    RESTORE_IS_READY = "RESTORE_IS_READY",
    RESTORE_THEME = "RESTORE_THEME",
    RESTORE_LANGUAGE = "RESTORE_LANGUAGE",
    RESTORE_NAV_INITIAL_STATE = "RESTORE_NAV_INITIAL_STATE",
    REQUESTING = "REQUEST",
    REQUEST_RECEIVED = "REQUEST_RECEIVED",
    REQUEST_FAILED = "REQUEST_FAILED"
}

export enum EBL {
    COLLECT_BL_RESULT = "COLLECT_BL_RESULT",
    CLEAR_BL_RESULT = "CLEAR_BL_RESULT",
    SET_BL_RESULT = "SET_BL_RESULT"
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

export enum EBLMsg {
    NO_ACCESS_TOKEN_RESPONDED = "No access_token responded",
    NO_AUTH_API_RESPONDED = "No auth api responded",
    NO_USER_INFO_RESPONDED = "No user info responded",
    NO_DATA_RESPONDED = "No data responded",
    NO_ACCESS_TOKEN_OR_REFRESH_TOKEN_RESPONDED = "No access token or refresh token responded",
    GOOGLE_LOGIN_CANCELED = "Google login canceled",
    GOOGLE_ACCESS_TOKEN_OR_REFRESH_TOKEN_NOT_EXISTS = "Google access token or refresh token not exists",
    GOOGLE_LOGIN_RESULT_TYPE_INVALID = "Google loginResult has returned type neither success nor cancel",
    NO_GOOGLE_LOGIN_RESULT = "No google login result",
    NO_ACCESS_TOKEN_RETURNED = "No access_token returned",
    NOT_CONFORM_TO_API_RESPONSE_STRUCTURE = "Not conform to BunnyAPI response structure",
    NO_NEARBY_FILMS = "No nearby films",
    NO_DEMO_THUNK_DATA = "No demo thunks response data",
    SAVE_QUICK_ALERT_SETTINGS_SUCCESS = "Save quick alert settings success",
    CANCEL_ALL_ALERT_SETTINGS_SUCCESS = "Cancel all alert settings success",
    GET_CURRENT_PRICE_SUCCESS = "Get current price success",
    GET_DEMO_SAGAS_SUCCESS = "Get demo sagas success",
    CANCELED_REQUEST = "Canceled request",
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
}

export enum EDemoCryptoCurrency {
    SAVE_QUICK_ALERT_SETTINGS = 'SAVE_QUICK_ALERT_SETTINGS',
    CANCEL_ALL_ALERT_SETTINGS = 'CANCEL_ALL_ALERT_SETTINGS',
    GET_CURRENT_PRICE = 'GET_CURRENT_PRICE',
    RECEIVE_CURRENT_PRICE = 'RECEIVE_CURRENT_PRICE'

}


export const EThemes: EnumThemeNames = {
    light: 'light',
    dark: 'dark',
}

export const ELanguage = {
    en: 'en',
    zh: 'zh',
}

export default BunnyConstants
