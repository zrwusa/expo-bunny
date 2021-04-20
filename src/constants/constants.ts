import {EnumThemeNames, Month} from "../types";

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
    ACCESS_TOKEN_EXP_PERSISTENCE_KEY: 'ACCESS_TOKEN_EXP',
    REFRESH_TOKEN_PERSISTENCE_KEY: 'REFRESH_TOKEN',
    REFRESH_TOKEN_EXP_PERSISTENCE_KEY: 'REFRESH_TOKEN_EXP',
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
    NOT_CONFORM_TO_API_RESPONSE_ROOT_STRUCTURE = "Not conform to response root structure",
    NOT_CONFORM_TO_API_RESPONSE_BL_STRUCTURE = "Not conform to response businessLogic structure",
    NOT_CONFORM_TO_API_RESPONSE_EXTRA_STRUCTURE = "Not conform to response httpExtra structure",
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
    indigo: 'indigo'
}

export const ELanguage = {
    en: 'en',
    zh: 'zh',
}

export default BunnyConstants


export const E_MONTH: Month = {
    January: 'January',
    February: 'February',
    March: 'March',
    April: 'April',
    May: 'May',
    June: 'June',
    July: 'July',
    August: 'August',
    September: 'September',
    October: 'October',
    November: 'November',
    December: 'December'
}

export const EXCEPTIONAL_COLOR = {
    "transparent": {
        "hex": "#ffffff",
        "hexA": "#ffffff00",
        "RGB": "rgb(255,255,255)",
        "HSL": "hsl(255,100%,100%)",
        "RGBA": "rgba(255,255,255,0)",
        "HSLA": "hsla(255,100%,100%,0)"
    },
}

export const STANDARD_COLOR_NAME_ALL = {

    "aliceblue": {
        "hex": "#f0f8ff",
        "hexA": "#f0f8ffff",
        "RGB": "rgb(240,248,255)",
        "HSL": "hsl(208,100%,97.1%)",
        "RGBA": "rgba(240,248,255,1)",
        "HSLA": "hsla(208,100%,97.1%,1.000)"
    },
    "antiquewhite": {
        "hex": "#faebd7",
        "hexA": "#faebd7ff",
        "RGB": "rgb(250,235,215)",
        "HSL": "hsl(34,77.8%,91.2%)",
        "RGBA": "rgba(250,235,215,1)",
        "HSLA": "hsla(34,77.8%,91.2%,1.000)"
    },
    "aqua": {
        "hex": "#00ffff",
        "hexA": "#00ffffff",
        "RGB": "rgb(0,255,255)",
        "HSL": "hsl(180,100%,50%)",
        "RGBA": "rgba(0,255,255,1)",
        "HSLA": "hsla(180,100%,50%,1.000)"
    },
    "aquamarine": {
        "hex": "#7fffd4",
        "hexA": "#7fffd4ff",
        "RGB": "rgb(127,255,212)",
        "HSL": "hsl(160,100%,74.9%)",
        "RGBA": "rgba(127,255,212,1)",
        "HSLA": "hsla(160,100%,74.9%,1.000)"
    },
    "azure": {
        "hex": "#f0ffff",
        "hexA": "#f0ffffff",
        "RGB": "rgb(240,255,255)",
        "HSL": "hsl(180,100%,97.1%)",
        "RGBA": "rgba(240,255,255,1)",
        "HSLA": "hsla(180,100%,97.1%,1.000)"
    },
    "beige": {
        "hex": "#f5f5dc",
        "hexA": "#f5f5dcff",
        "RGB": "rgb(245,245,220)",
        "HSL": "hsl(60,55.6%,91.2%)",
        "RGBA": "rgba(245,245,220,1)",
        "HSLA": "hsla(60,55.6%,91.2%,1.000)"
    },
    "bisque": {
        "hex": "#ffe4c4",
        "hexA": "#ffe4c4ff",
        "RGB": "rgb(255,228,196)",
        "HSL": "hsl(33,100%,88.4%)",
        "RGBA": "rgba(255,228,196,1)",
        "HSLA": "hsla(33,100%,88.4%,1.000)"
    },
    "black": {
        "hex": "#000000",
        "hexA": "#000000ff",
        "RGB": "rgb(0,0,0)",
        "HSL": "hsl(0,0%,0%)",
        "RGBA": "rgba(0,0,0,1)",
        "HSLA": "hsla(0,0%,0%,1.000)"
    },
    "blanchedalmond": {
        "hex": "#ffebcd",
        "hexA": "#ffebcdff",
        "RGB": "rgb(255,235,205)",
        "HSL": "hsl(36,100%,90.2%)",
        "RGBA": "rgba(255,235,205,1)",
        "HSLA": "hsla(36,100%,90.2%,1.000)"
    },
    "blue": {
        "hex": "#0000ff",
        "hexA": "#0000ffff",
        "RGB": "rgb(0,0,255)",
        "HSL": "hsl(240,100%,50%)",
        "RGBA": "rgba(0,0,255,1)",
        "HSLA": "hsla(240,100%,50%,1.000)"
    },
    "blueviolet": {
        "hex": "#8a2be2",
        "hexA": "#8a2be2ff",
        "RGB": "rgb(138,43,226)",
        "HSL": "hsl(271,75.9%,52.7%)",
        "RGBA": "rgba(138,43,226,1)",
        "HSLA": "hsla(271,75.9%,52.7%,1.000)"
    },
    "brown": {
        "hex": "#a52a2a",
        "hexA": "#a52a2aff",
        "RGB": "rgb(165,42,42)",
        "HSL": "hsl(0,59.4%,40.6%)",
        "RGBA": "rgba(165,42,42,1)",
        "HSLA": "hsla(0,59.4%,40.6%,1.000)"
    },
    "burlywood": {
        "hex": "#deb887",
        "hexA": "#deb887ff",
        "RGB": "rgb(222,184,135)",
        "HSL": "hsl(34,56.9%,70%)",
        "RGBA": "rgba(222,184,135,1)",
        "HSLA": "hsla(34,56.9%,70%,1.000)"
    },
    "cadetblue": {
        "hex": "#5f9ea0",
        "hexA": "#5f9ea0ff",
        "RGB": "rgb(95,158,160)",
        "HSL": "hsl(182,25.5%,50%)",
        "RGBA": "rgba(95,158,160,1)",
        "HSLA": "hsla(182,25.5%,50%,1.000)"
    },
    "chartreuse": {
        "hex": "#7fff00",
        "hexA": "#7fff00ff",
        "RGB": "rgb(127,255,0)",
        "HSL": "hsl(90,100%,50%)",
        "RGBA": "rgba(127,255,0,1)",
        "HSLA": "hsla(90,100%,50%,1.000)"
    },
    "chocolate": {
        "hex": "#d2691e",
        "hexA": "#d2691eff",
        "RGB": "rgb(210,105,30)",
        "HSL": "hsl(25,75%,47.1%)",
        "RGBA": "rgba(210,105,30,1)",
        "HSLA": "hsla(25,75%,47.1%,1.000)"
    },
    "coral": {
        "hex": "#ff7f50",
        "hexA": "#ff7f50ff",
        "RGB": "rgb(255,127,80)",
        "HSL": "hsl(16,100%,65.7%)",
        "RGBA": "rgba(255,127,80,1)",
        "HSLA": "hsla(16,100%,65.7%,1.000)"
    },
    "cornflowerblue": {
        "hex": "#6495ed",
        "hexA": "#6495edff",
        "RGB": "rgb(100,149,237)",
        "HSL": "hsl(219,79.2%,66.1%)",
        "RGBA": "rgba(100,149,237,1)",
        "HSLA": "hsla(219,79.2%,66.1%,1.000)"
    },
    "cornsilk": {
        "hex": "#fff8dc",
        "hexA": "#fff8dcff",
        "RGB": "rgb(255,248,220)",
        "HSL": "hsl(48,100%,93.1%)",
        "RGBA": "rgba(255,248,220,1)",
        "HSLA": "hsla(48,100%,93.1%,1.000)"
    },
    "crimson": {
        "hex": "#dc143c",
        "hexA": "#dc143cff",
        "RGB": "rgb(220,20,60)",
        "HSL": "hsl(348,83.3%,47.1%)",
        "RGBA": "rgba(220,20,60,1)",
        "HSLA": "hsla(348,83.3%,47.1%,1.000)"
    },
    "cyan": {
        "hex": "#00ffff",
        "hexA": "#00ffffff",
        "RGB": "rgb(0,255,255)",
        "HSL": "hsl(180,100%,50%)",
        "RGBA": "rgba(0,255,255,1)",
        "HSLA": "hsla(180,100%,50%,1.000)"
    },
    "darkblue": {
        "hex": "#00008b",
        "hexA": "#00008bff",
        "RGB": "rgb(0,0,139)",
        "HSL": "hsl(240,100%,27.3%)",
        "RGBA": "rgba(0,0,139,1)",
        "HSLA": "hsla(240,100%,27.3%,1.000)"
    },
    "darkcyan": {
        "hex": "#008b8b",
        "hexA": "#008b8bff",
        "RGB": "rgb(0,139,139)",
        "HSL": "hsl(180,100%,27.3%)",
        "RGBA": "rgba(0,139,139,1)",
        "HSLA": "hsla(180,100%,27.3%,1.000)"
    },
    "darkgoldenrod": {
        "hex": "#b8860b",
        "hexA": "#b8860bff",
        "RGB": "rgb(184,134,11)",
        "HSL": "hsl(43,88.7%,38.2%)",
        "RGBA": "rgba(184,134,11,1)",
        "HSLA": "hsla(43,88.7%,38.2%,1.000)"
    },
    "darkgray": {
        "hex": "#a9a9a9",
        "hexA": "#a9a9a9ff",
        "RGB": "rgb(169,169,169)",
        "HSL": "hsl(0,0%,66.3%)",
        "RGBA": "rgba(169,169,169,1)",
        "HSLA": "hsla(0,0%,66.3%,1.000)"
    },
    "darkgreen": {
        "hex": "#006400",
        "hexA": "#006400ff",
        "RGB": "rgb(0,100,0)",
        "HSL": "hsl(120,100%,19.6%)",
        "RGBA": "rgba(0,100,0,1)",
        "HSLA": "hsla(120,100%,19.6%,1.000)"
    },
    "darkkhaki": {
        "hex": "#bdb76b",
        "hexA": "#bdb76bff",
        "RGB": "rgb(189,183,107)",
        "HSL": "hsl(56,38.3%,58%)",
        "RGBA": "rgba(189,183,107,1)",
        "HSLA": "hsla(56,38.3%,58%,1.000)"
    },
    "darkmagenta": {
        "hex": "#8b008b",
        "hexA": "#8b008bff",
        "RGB": "rgb(139,0,139)",
        "HSL": "hsl(300,100%,27.3%)",
        "RGBA": "rgba(139,0,139,1)",
        "HSLA": "hsla(300,100%,27.3%,1.000)"
    },
    "darkolivegreen": {
        "hex": "#556b2f",
        "hexA": "#556b2fff",
        "RGB": "rgb(85,107,47)",
        "HSL": "hsl(82,39%,30.2%)",
        "RGBA": "rgba(85,107,47,1)",
        "HSLA": "hsla(82,39%,30.2%,1.000)"
    },
    "darkorange": {
        "hex": "#ff8c00",
        "hexA": "#ff8c00ff",
        "RGB": "rgb(255,140,0)",
        "HSL": "hsl(33,100%,50%)",
        "RGBA": "rgba(255,140,0,1)",
        "HSLA": "hsla(33,100%,50%,1.000)"
    },
    "darkorchid": {
        "hex": "#9932cc",
        "hexA": "#9932ccff",
        "RGB": "rgb(153,50,204)",
        "HSL": "hsl(280,60.6%,49.8%)",
        "RGBA": "rgba(153,50,204,1)",
        "HSLA": "hsla(280,60.6%,49.8%,1.000)"
    },
    "darkred": {
        "hex": "#8b0000",
        "hexA": "#8b0000ff",
        "RGB": "rgb(139,0,0)",
        "HSL": "hsl(0,100%,27.3%)",
        "RGBA": "rgba(139,0,0,1)",
        "HSLA": "hsla(0,100%,27.3%,1.000)"
    },
    "darksalmon": {
        "hex": "#e9967a",
        "hexA": "#e9967aff",
        "RGB": "rgb(233,150,122)",
        "HSL": "hsl(15,71.6%,69.6%)",
        "RGBA": "rgba(233,150,122,1)",
        "HSLA": "hsla(15,71.6%,69.6%,1.000)"
    },
    "darkseagreen": {
        "hex": "#8fbc8f",
        "hexA": "#8fbc8fff",
        "RGB": "rgb(143,188,143)",
        "HSL": "hsl(120,25.1%,64.9%)",
        "RGBA": "rgba(143,188,143,1)",
        "HSLA": "hsla(120,25.1%,64.9%,1.000)"
    },
    "darkslateblue": {
        "hex": "#483d8b",
        "hexA": "#483d8bff",
        "RGB": "rgb(72,61,139)",
        "HSL": "hsl(248,39%,39.2%)",
        "RGBA": "rgba(72,61,139,1)",
        "HSLA": "hsla(248,39%,39.2%,1.000)"
    },
    "darkslategray": {
        "hex": "#2f4f4f",
        "hexA": "#2f4f4fff",
        "RGB": "rgb(47,79,79)",
        "HSL": "hsl(180,25.4%,24.7%)",
        "RGBA": "rgba(47,79,79,1)",
        "HSLA": "hsla(180,25.4%,24.7%,1.000)"
    },
    "darkturquoise": {
        "hex": "#00ced1",
        "hexA": "#00ced1ff",
        "RGB": "rgb(0,206,209)",
        "HSL": "hsl(181,100%,41%)",
        "RGBA": "rgba(0,206,209,1)",
        "HSLA": "hsla(181,100%,41%,1.000)"
    },
    "darkviolet": {
        "hex": "#9400d3",
        "hexA": "#9400d3ff",
        "RGB": "rgb(148,0,211)",
        "HSL": "hsl(282,100%,41.4%)",
        "RGBA": "rgba(148,0,211,1)",
        "HSLA": "hsla(282,100%,41.4%,1.000)"
    },
    "deeppink": {
        "hex": "#ff1493",
        "hexA": "#ff1493ff",
        "RGB": "rgb(255,20,147)",
        "HSL": "hsl(328,100%,53.9%)",
        "RGBA": "rgba(255,20,147,1)",
        "HSLA": "hsla(328,100%,53.9%,1.000)"
    },
    "deepskyblue": {
        "hex": "#00bfff",
        "hexA": "#00bfffff",
        "RGB": "rgb(0,191,255)",
        "HSL": "hsl(195,100%,50%)",
        "RGBA": "rgba(0,191,255,1)",
        "HSLA": "hsla(195,100%,50%,1.000)"
    },
    "dimgray": {
        "hex": "#696969",
        "hexA": "#696969ff",
        "RGB": "rgb(105,105,105)",
        "HSL": "hsl(0,0%,41.2%)",
        "RGBA": "rgba(105,105,105,1)",
        "HSLA": "hsla(0,0%,41.2%,1.000)"
    },
    "dodgerblue": {
        "hex": "#1e90ff",
        "hexA": "#1e90ffff",
        "RGB": "rgb(30,144,255)",
        "HSL": "hsl(210,100%,55.9%)",
        "RGBA": "rgba(30,144,255,1)",
        "HSLA": "hsla(210,100%,55.9%,1.000)"
    },
    "firebrick": {
        "hex": "#b22222",
        "hexA": "#b22222ff",
        "RGB": "rgb(178,34,34)",
        "HSL": "hsl(0,67.9%,41.6%)",
        "RGBA": "rgba(178,34,34,1)",
        "HSLA": "hsla(0,67.9%,41.6%,1.000)"
    },
    "floralwhite": {
        "hex": "#fffaf0",
        "hexA": "#fffaf0ff",
        "RGB": "rgb(255,250,240)",
        "HSL": "hsl(40,100%,97.1%)",
        "RGBA": "rgba(255,250,240,1)",
        "HSLA": "hsla(40,100%,97.1%,1.000)"
    },
    "forestgreen": {
        "hex": "#228b22",
        "hexA": "#228b22ff",
        "RGB": "rgb(34,139,34)",
        "HSL": "hsl(120,60.7%,33.9%)",
        "RGBA": "rgba(34,139,34,1)",
        "HSLA": "hsla(120,60.7%,33.9%,1.000)"
    },
    "fuchsia": {
        "hex": "#ff00ff",
        "hexA": "#ff00ffff",
        "RGB": "rgb(255,0,255)",
        "HSL": "hsl(300,100%,50%)",
        "RGBA": "rgba(255,0,255,1)",
        "HSLA": "hsla(300,100%,50%,1.000)"
    },
    "gainsboro": {
        "hex": "#dcdcdc",
        "hexA": "#dcdcdcff",
        "RGB": "rgb(220,220,220)",
        "HSL": "hsl(0,0%,86.3%)",
        "RGBA": "rgba(220,220,220,1)",
        "HSLA": "hsla(0,0%,86.3%,1.000)"
    },
    "ghostwhite": {
        "hex": "#f8f8ff",
        "hexA": "#f8f8ffff",
        "RGB": "rgb(248,248,255)",
        "HSL": "hsl(240,100%,98.6%)",
        "RGBA": "rgba(248,248,255,1)",
        "HSLA": "hsla(240,100%,98.6%,1.000)"
    },
    "gold": {
        "hex": "#ffd700",
        "hexA": "#ffd700ff",
        "RGB": "rgb(255,215,0)",
        "HSL": "hsl(51,100%,50%)",
        "RGBA": "rgba(255,215,0,1)",
        "HSLA": "hsla(51,100%,50%,1.000)"
    },
    "goldenrod": {
        "hex": "#daa520",
        "hexA": "#daa520ff",
        "RGB": "rgb(218,165,32)",
        "HSL": "hsl(43,74.4%,49%)",
        "RGBA": "rgba(218,165,32,1)",
        "HSLA": "hsla(43,74.4%,49%,1.000)"
    },
    "gray": {
        "hex": "#808080",
        "hexA": "#808080ff",
        "RGB": "rgb(128,128,128)",
        "HSL": "hsl(0,0%,50.2%)",
        "RGBA": "rgba(128,128,128,1)",
        "HSLA": "hsla(0,0%,50.2%,1.000)"
    },
    "green": {
        "hex": "#008000",
        "hexA": "#008000ff",
        "RGB": "rgb(0,128,0)",
        "HSL": "hsl(120,100%,25.1%)",
        "RGBA": "rgba(0,128,0,1)",
        "HSLA": "hsla(120,100%,25.1%,1.000)"
    },
    "greenyellow": {
        "hex": "#adff2f",
        "hexA": "#adff2fff",
        "RGB": "rgb(173,255,47)",
        "HSL": "hsl(84,100%,59.2%)",
        "RGBA": "rgba(173,255,47,1)",
        "HSLA": "hsla(84,100%,59.2%,1.000)"
    },
    "honeydew": {
        "hex": "#f0fff0",
        "hexA": "#f0fff0ff",
        "RGB": "rgb(240,255,240)",
        "HSL": "hsl(120,100%,97.1%)",
        "RGBA": "rgba(240,255,240,1)",
        "HSLA": "hsla(120,100%,97.1%,1.000)"
    },
    "hotpink": {
        "hex": "#ff69b4",
        "hexA": "#ff69b4ff",
        "RGB": "rgb(255,105,180)",
        "HSL": "hsl(330,100%,70.6%)",
        "RGBA": "rgba(255,105,180,1)",
        "HSLA": "hsla(330,100%,70.6%,1.000)"
    },
    "indianred ": {
        "hex": "#cd5c5c",
        "hexA": "#cd5c5cff",
        "RGB": "rgb(205,92,92)",
        "HSL": "hsl(0,53.1%,58.2%)",
        "RGBA": "rgba(205,92,92,1)",
        "HSLA": "hsla(0,53.1%,58.2%,1.000)"
    },
    "indigo": {
        "hex": "#4b0082",
        "hexA": "#4b0082ff",
        "RGB": "rgb(75,0,130)",
        "HSL": "hsl(275,100%,25.5%)",
        "RGBA": "rgba(75,0,130,1)",
        "HSLA": "hsla(275,100%,25.5%,1.000)"
    },
    "ivory": {
        "hex": "#fffff0",
        "hexA": "#fffff0ff",
        "RGB": "rgb(255,255,240)",
        "HSL": "hsl(60,100%,97.1%)",
        "RGBA": "rgba(255,255,240,1)",
        "HSLA": "hsla(60,100%,97.1%,1.000)"
    },
    "khaki": {
        "hex": "#f0e68c",
        "hexA": "#f0e68cff",
        "RGB": "rgb(240,230,140)",
        "HSL": "hsl(54,76.9%,74.5%)",
        "RGBA": "rgba(240,230,140,1)",
        "HSLA": "hsla(54,76.9%,74.5%,1.000)"
    },
    "lavender": {
        "hex": "#e6e6fa",
        "hexA": "#e6e6faff",
        "RGB": "rgb(230,230,250)",
        "HSL": "hsl(240,66.7%,94.1%)",
        "RGBA": "rgba(230,230,250,1)",
        "HSLA": "hsla(240,66.7%,94.1%,1.000)"
    },
    "lavenderblush": {
        "hex": "#fff0f5",
        "hexA": "#fff0f5ff",
        "RGB": "rgb(255,240,245)",
        "HSL": "hsl(340,100%,97.1%)",
        "RGBA": "rgba(255,240,245,1)",
        "HSLA": "hsla(340,100%,97.1%,1.000)"
    },
    "lawngreen": {
        "hex": "#7cfc00",
        "hexA": "#7cfc00ff",
        "RGB": "rgb(124,252,0)",
        "HSL": "hsl(90,100%,49.4%)",
        "RGBA": "rgba(124,252,0,1)",
        "HSLA": "hsla(90,100%,49.4%,1.000)"
    },
    "lemonchiffon": {
        "hex": "#fffacd",
        "hexA": "#fffacdff",
        "RGB": "rgb(255,250,205)",
        "HSL": "hsl(54,100%,90.2%)",
        "RGBA": "rgba(255,250,205,1)",
        "HSLA": "hsla(54,100%,90.2%,1.000)"
    },
    "lightblue": {
        "hex": "#add8e6",
        "hexA": "#add8e6ff",
        "RGB": "rgb(173,216,230)",
        "HSL": "hsl(195,53.3%,79%)",
        "RGBA": "rgba(173,216,230,1)",
        "HSLA": "hsla(195,53.3%,79%,1.000)"
    },
    "lightcoral": {
        "hex": "#f08080",
        "hexA": "#f08080ff",
        "RGB": "rgb(240,128,128)",
        "HSL": "hsl(0,78.9%,72.2%)",
        "RGBA": "rgba(240,128,128,1)",
        "HSLA": "hsla(0,78.9%,72.2%,1.000)"
    },
    "lightcyan": {
        "hex": "#e0ffff",
        "hexA": "#e0ffffff",
        "RGB": "rgb(224,255,255)",
        "HSL": "hsl(180,100%,93.9%)",
        "RGBA": "rgba(224,255,255,1)",
        "HSLA": "hsla(180,100%,93.9%,1.000)"
    },
    "lightgoldenrodyellow": {
        "hex": "#fafad2",
        "hexA": "#fafad2ff",
        "RGB": "rgb(250,250,210)",
        "HSL": "hsl(60,80%,90.2%)",
        "RGBA": "rgba(250,250,210,1)",
        "HSLA": "hsla(60,80%,90.2%,1.000)"
    },
    "lightgrey": {
        "hex": "#d3d3d3",
        "hexA": "#d3d3d3ff",
        "RGB": "rgb(211,211,211)",
        "HSL": "hsl(0,0%,82.7%)",
        "RGBA": "rgba(211,211,211,1)",
        "HSLA": "hsla(0,0%,82.7%,1.000)"
    },
    "lightgreen": {
        "hex": "#90ee90",
        "hexA": "#90ee90ff",
        "RGB": "rgb(144,238,144)",
        "HSL": "hsl(120,73.4%,74.9%)",
        "RGBA": "rgba(144,238,144,1)",
        "HSLA": "hsla(120,73.4%,74.9%,1.000)"
    },
    "lightpink": {
        "hex": "#ffb6c1",
        "hexA": "#ffb6c1ff",
        "RGB": "rgb(255,182,193)",
        "HSL": "hsl(351,100%,85.7%)",
        "RGBA": "rgba(255,182,193,1)",
        "HSLA": "hsla(351,100%,85.7%,1.000)"
    },
    "lightsalmon": {
        "hex": "#ffa07a",
        "hexA": "#ffa07aff",
        "RGB": "rgb(255,160,122)",
        "HSL": "hsl(17,100%,73.9%)",
        "RGBA": "rgba(255,160,122,1)",
        "HSLA": "hsla(17,100%,73.9%,1.000)"
    },
    "lightseagreen": {
        "hex": "#20b2aa",
        "hexA": "#20b2aaff",
        "RGB": "rgb(32,178,170)",
        "HSL": "hsl(177,69.5%,41.2%)",
        "RGBA": "rgba(32,178,170,1)",
        "HSLA": "hsla(177,69.5%,41.2%,1.000)"
    },
    "lightskyblue": {
        "hex": "#87cefa",
        "hexA": "#87cefaff",
        "RGB": "rgb(135,206,250)",
        "HSL": "hsl(203,92%,75.5%)",
        "RGBA": "rgba(135,206,250,1)",
        "HSLA": "hsla(203,92%,75.5%,1.000)"
    },
    "lightslategray": {
        "hex": "#778899",
        "hexA": "#778899ff",
        "RGB": "rgb(119,136,153)",
        "HSL": "hsl(210,14.3%,53.3%)",
        "RGBA": "rgba(119,136,153,1)",
        "HSLA": "hsla(210,14.3%,53.3%,1.000)"
    },
    "lightsteelblue": {
        "hex": "#b0c4de",
        "hexA": "#b0c4deff",
        "RGB": "rgb(176,196,222)",
        "HSL": "hsl(214,41.1%,78%)",
        "RGBA": "rgba(176,196,222,1)",
        "HSLA": "hsla(214,41.1%,78%,1.000)"
    },
    "lightyellow": {
        "hex": "#ffffe0",
        "hexA": "#ffffe0ff",
        "RGB": "rgb(255,255,224)",
        "HSL": "hsl(60,100%,93.9%)",
        "RGBA": "rgba(255,255,224,1)",
        "HSLA": "hsla(60,100%,93.9%,1.000)"
    },
    "lime": {
        "hex": "#00ff00",
        "hexA": "#00ff00ff",
        "RGB": "rgb(0,255,0)",
        "HSL": "hsl(120,100%,50%)",
        "RGBA": "rgba(0,255,0,1)",
        "HSLA": "hsla(120,100%,50%,1.000)"
    },
    "limegreen": {
        "hex": "#32cd32",
        "hexA": "#32cd32ff",
        "RGB": "rgb(50,205,50)",
        "HSL": "hsl(120,60.8%,50%)",
        "RGBA": "rgba(50,205,50,1)",
        "HSLA": "hsla(120,60.8%,50%,1.000)"
    },
    "linen": {
        "hex": "#faf0e6",
        "hexA": "#faf0e6ff",
        "RGB": "rgb(250,240,230)",
        "HSL": "hsl(30,66.7%,94.1%)",
        "RGBA": "rgba(250,240,230,1)",
        "HSLA": "hsla(30,66.7%,94.1%,1.000)"
    },
    "magenta": {
        "hex": "#ff00ff",
        "hexA": "#ff00ffff",
        "RGB": "rgb(255,0,255)",
        "HSL": "hsl(300,100%,50%)",
        "RGBA": "rgba(255,0,255,1)",
        "HSLA": "hsla(300,100%,50%,1.000)"
    },
    "maroon": {
        "hex": "#800000",
        "hexA": "#800000ff",
        "RGB": "rgb(128,0,0)",
        "HSL": "hsl(0,100%,25.1%)",
        "RGBA": "rgba(128,0,0,1)",
        "HSLA": "hsla(0,100%,25.1%,1.000)"
    },
    "mediumaquamarine": {
        "hex": "#66cdaa",
        "hexA": "#66cdaaff",
        "RGB": "rgb(102,205,170)",
        "HSL": "hsl(160,50.7%,60.2%)",
        "RGBA": "rgba(102,205,170,1)",
        "HSLA": "hsla(160,50.7%,60.2%,1.000)"
    },
    "mediumblue": {
        "hex": "#0000cd",
        "hexA": "#0000cdff",
        "RGB": "rgb(0,0,205)",
        "HSL": "hsl(240,100%,40.2%)",
        "RGBA": "rgba(0,0,205,1)",
        "HSLA": "hsla(240,100%,40.2%,1.000)"
    },
    "mediumorchid": {
        "hex": "#ba55d3",
        "hexA": "#ba55d3ff",
        "RGB": "rgb(186,85,211)",
        "HSL": "hsl(288,58.9%,58%)",
        "RGBA": "rgba(186,85,211,1)",
        "HSLA": "hsla(288,58.9%,58%,1.000)"
    },
    "mediumpurple": {
        "hex": "#9370d8",
        "hexA": "#9370d8ff",
        "RGB": "rgb(147,112,216)",
        "HSL": "hsl(260,57.1%,64.3%)",
        "RGBA": "rgba(147,112,216,1)",
        "HSLA": "hsla(260,57.1%,64.3%,1.000)"
    },
    "mediumseagreen": {
        "hex": "#3cb371",
        "hexA": "#3cb371ff",
        "RGB": "rgb(60,179,113)",
        "HSL": "hsl(147,49.8%,46.9%)",
        "RGBA": "rgba(60,179,113,1)",
        "HSLA": "hsla(147,49.8%,46.9%,1.000)"
    },
    "mediumslateblue": {
        "hex": "#7b68ee",
        "hexA": "#7b68eeff",
        "RGB": "rgb(123,104,238)",
        "HSL": "hsl(249,79.8%,67.1%)",
        "RGBA": "rgba(123,104,238,1)",
        "HSLA": "hsla(249,79.8%,67.1%,1.000)"
    },
    "mediumspringgreen": {
        "hex": "#00fa9a",
        "hexA": "#00fa9aff",
        "RGB": "rgb(0,250,154)",
        "HSL": "hsl(157,100%,49%)",
        "RGBA": "rgba(0,250,154,1)",
        "HSLA": "hsla(157,100%,49%,1.000)"
    },
    "mediumturquoise": {
        "hex": "#48d1cc",
        "hexA": "#48d1ccff",
        "RGB": "rgb(72,209,204)",
        "HSL": "hsl(178,59.8%,55.1%)",
        "RGBA": "rgba(72,209,204,1)",
        "HSLA": "hsla(178,59.8%,55.1%,1.000)"
    },
    "mediumvioletred": {
        "hex": "#c71585",
        "hexA": "#c71585ff",
        "RGB": "rgb(199,21,133)",
        "HSL": "hsl(322,80.9%,43.1%)",
        "RGBA": "rgba(199,21,133,1)",
        "HSLA": "hsla(322,80.9%,43.1%,1.000)"
    },
    "midnightblue": {
        "hex": "#191970",
        "hexA": "#191970ff",
        "RGB": "rgb(25,25,112)",
        "HSL": "hsl(240,63.5%,26.9%)",
        "RGBA": "rgba(25,25,112,1)",
        "HSLA": "hsla(240,63.5%,26.9%,1.000)"
    },
    "mintcream": {
        "hex": "#f5fffa",
        "hexA": "#f5fffaff",
        "RGB": "rgb(245,255,250)",
        "HSL": "hsl(150,100%,98%)",
        "RGBA": "rgba(245,255,250,1)",
        "HSLA": "hsla(150,100%,98%,1.000)"
    },
    "mistyrose": {
        "hex": "#ffe4e1",
        "hexA": "#ffe4e1ff",
        "RGB": "rgb(255,228,225)",
        "HSL": "hsl(6,100%,94.1%)",
        "RGBA": "rgba(255,228,225,1)",
        "HSLA": "hsla(6,100%,94.1%,1.000)"
    },
    "moccasin": {
        "hex": "#ffe4b5",
        "hexA": "#ffe4b5ff",
        "RGB": "rgb(255,228,181)",
        "HSL": "hsl(38,100%,85.5%)",
        "RGBA": "rgba(255,228,181,1)",
        "HSLA": "hsla(38,100%,85.5%,1.000)"
    },
    "navajowhite": {
        "hex": "#ffdead",
        "hexA": "#ffdeadff",
        "RGB": "rgb(255,222,173)",
        "HSL": "hsl(36,100%,83.9%)",
        "RGBA": "rgba(255,222,173,1)",
        "HSLA": "hsla(36,100%,83.9%,1.000)"
    },
    "navy": {
        "hex": "#000080",
        "hexA": "#000080ff",
        "RGB": "rgb(0,0,128)",
        "HSL": "hsl(240,100%,25.1%)",
        "RGBA": "rgba(0,0,128,1)",
        "HSLA": "hsla(240,100%,25.1%,1.000)"
    },
    "oldlace": {
        "hex": "#fdf5e6",
        "hexA": "#fdf5e6ff",
        "RGB": "rgb(253,245,230)",
        "HSL": "hsl(39,85.2%,94.7%)",
        "RGBA": "rgba(253,245,230,1)",
        "HSLA": "hsla(39,85.2%,94.7%,1.000)"
    },
    "olive": {
        "hex": "#808000",
        "hexA": "#808000ff",
        "RGB": "rgb(128,128,0)",
        "HSL": "hsl(60,100%,25.1%)",
        "RGBA": "rgba(128,128,0,1)",
        "HSLA": "hsla(60,100%,25.1%,1.000)"
    },
    "olivedrab": {
        "hex": "#6b8e23",
        "hexA": "#6b8e23ff",
        "RGB": "rgb(107,142,35)",
        "HSL": "hsl(80,60.5%,34.7%)",
        "RGBA": "rgba(107,142,35,1)",
        "HSLA": "hsla(80,60.5%,34.7%,1.000)"
    },
    "orange": {
        "hex": "#ffa500",
        "hexA": "#ffa500ff",
        "RGB": "rgb(255,165,0)",
        "HSL": "hsl(39,100%,50%)",
        "RGBA": "rgba(255,165,0,1)",
        "HSLA": "hsla(39,100%,50%,1.000)"
    },
    "orangered": {
        "hex": "#ff4500",
        "hexA": "#ff4500ff",
        "RGB": "rgb(255,69,0)",
        "HSL": "hsl(16,100%,50%)",
        "RGBA": "rgba(255,69,0,1)",
        "HSLA": "hsla(16,100%,50%,1.000)"
    },
    "orchid": {
        "hex": "#da70d6",
        "hexA": "#da70d6ff",
        "RGB": "rgb(218,112,214)",
        "HSL": "hsl(302,58.9%,64.7%)",
        "RGBA": "rgba(218,112,214,1)",
        "HSLA": "hsla(302,58.9%,64.7%,1.000)"
    },
    "palegoldenrod": {
        "hex": "#eee8aa",
        "hexA": "#eee8aaff",
        "RGB": "rgb(238,232,170)",
        "HSL": "hsl(55,66.7%,80%)",
        "RGBA": "rgba(238,232,170,1)",
        "HSLA": "hsla(55,66.7%,80%,1.000)"
    },
    "palegreen": {
        "hex": "#98fb98",
        "hexA": "#98fb98ff",
        "RGB": "rgb(152,251,152)",
        "HSL": "hsl(120,92.5%,79%)",
        "RGBA": "rgba(152,251,152,1)",
        "HSLA": "hsla(120,92.5%,79%,1.000)"
    },
    "paleturquoise": {
        "hex": "#afeeee",
        "hexA": "#afeeeeff",
        "RGB": "rgb(175,238,238)",
        "HSL": "hsl(180,64.9%,81%)",
        "RGBA": "rgba(175,238,238,1)",
        "HSLA": "hsla(180,64.9%,81%,1.000)"
    },
    "palevioletred": {
        "hex": "#d87093",
        "hexA": "#d87093ff",
        "RGB": "rgb(216,112,147)",
        "HSL": "hsl(340,57.1%,64.3%)",
        "RGBA": "rgba(216,112,147,1)",
        "HSLA": "hsla(340,57.1%,64.3%,1.000)"
    },
    "papayawhip": {
        "hex": "#ffefd5",
        "hexA": "#ffefd5ff",
        "RGB": "rgb(255,239,213)",
        "HSL": "hsl(37,100%,91.8%)",
        "RGBA": "rgba(255,239,213,1)",
        "HSLA": "hsla(37,100%,91.8%,1.000)"
    },
    "peachpuff": {
        "hex": "#ffdab9",
        "hexA": "#ffdab9ff",
        "RGB": "rgb(255,218,185)",
        "HSL": "hsl(28,100%,86.3%)",
        "RGBA": "rgba(255,218,185,1)",
        "HSLA": "hsla(28,100%,86.3%,1.000)"
    },
    "peru": {
        "hex": "#cd853f",
        "hexA": "#cd853fff",
        "RGB": "rgb(205,133,63)",
        "HSL": "hsl(30,58.7%,52.5%)",
        "RGBA": "rgba(205,133,63,1)",
        "HSLA": "hsla(30,58.7%,52.5%,1.000)"
    },
    "pink": {
        "hex": "#ffc0cb",
        "hexA": "#ffc0cbff",
        "RGB": "rgb(255,192,203)",
        "HSL": "hsl(350,100%,87.6%)",
        "RGBA": "rgba(255,192,203,1)",
        "HSLA": "hsla(350,100%,87.6%,1.000)"
    },
    "plum": {
        "hex": "#dda0dd",
        "hexA": "#dda0ddff",
        "RGB": "rgb(221,160,221)",
        "HSL": "hsl(300,47.3%,74.7%)",
        "RGBA": "rgba(221,160,221,1)",
        "HSLA": "hsla(300,47.3%,74.7%,1.000)"
    },
    "powderblue": {
        "hex": "#b0e0e6",
        "hexA": "#b0e0e6ff",
        "RGB": "rgb(176,224,230)",
        "HSL": "hsl(187,51.9%,79.6%)",
        "RGBA": "rgba(176,224,230,1)",
        "HSLA": "hsla(187,51.9%,79.6%,1.000)"
    },
    "purple": {
        "hex": "#800080",
        "hexA": "#800080ff",
        "RGB": "rgb(128,0,128)",
        "HSL": "hsl(300,100%,25.1%)",
        "RGBA": "rgba(128,0,128,1)",
        "HSLA": "hsla(300,100%,25.1%,1.000)"
    },
    "rebeccapurple": {
        "hex": "#663399",
        "hexA": "#663399ff",
        "RGB": "rgb(102,51,153)",
        "HSL": "hsl(270,50%,40%)",
        "RGBA": "rgba(102,51,153,1)",
        "HSLA": "hsla(270,50%,40%,1.000)"
    },
    "red": {
        "hex": "#ff0000",
        "hexA": "#ff0000ff",
        "RGB": "rgb(255,0,0)",
        "HSL": "hsl(0,100%,50%)",
        "RGBA": "rgba(255,0,0,1)",
        "HSLA": "hsla(0,100%,50%,1.000)"
    },
    "rosybrown": {
        "hex": "#bc8f8f",
        "hexA": "#bc8f8fff",
        "RGB": "rgb(188,143,143)",
        "HSL": "hsl(0,25.1%,64.9%)",
        "RGBA": "rgba(188,143,143,1)",
        "HSLA": "hsla(0,25.1%,64.9%,1.000)"
    },
    "royalblue": {
        "hex": "#4169e1",
        "hexA": "#4169e1ff",
        "RGB": "rgb(65,105,225)",
        "HSL": "hsl(225,72.7%,56.9%)",
        "RGBA": "rgba(65,105,225,1)",
        "HSLA": "hsla(225,72.7%,56.9%,1.000)"
    },
    "saddlebrown": {
        "hex": "#8b4513",
        "hexA": "#8b4513ff",
        "RGB": "rgb(139,69,19)",
        "HSL": "hsl(25,75.9%,31%)",
        "RGBA": "rgba(139,69,19,1)",
        "HSLA": "hsla(25,75.9%,31%,1.000)"
    },
    "salmon": {
        "hex": "#fa8072",
        "hexA": "#fa8072ff",
        "RGB": "rgb(250,128,114)",
        "HSL": "hsl(6,93.2%,71.4%)",
        "RGBA": "rgba(250,128,114,1)",
        "HSLA": "hsla(6,93.2%,71.4%,1.000)"
    },
    "sandybrown": {
        "hex": "#f4a460",
        "hexA": "#f4a460ff",
        "RGB": "rgb(244,164,96)",
        "HSL": "hsl(28,87.1%,66.7%)",
        "RGBA": "rgba(244,164,96,1)",
        "HSLA": "hsla(28,87.1%,66.7%,1.000)"
    },
    "seagreen": {
        "hex": "#2e8b57",
        "hexA": "#2e8b57ff",
        "RGB": "rgb(46,139,87)",
        "HSL": "hsl(146,50.3%,36.3%)",
        "RGBA": "rgba(46,139,87,1)",
        "HSLA": "hsla(146,50.3%,36.3%,1.000)"
    },
    "seashell": {
        "hex": "#fff5ee",
        "hexA": "#fff5eeff",
        "RGB": "rgb(255,245,238)",
        "HSL": "hsl(25,100%,96.7%)",
        "RGBA": "rgba(255,245,238,1)",
        "HSLA": "hsla(25,100%,96.7%,1.000)"
    },
    "sienna": {
        "hex": "#a0522d",
        "hexA": "#a0522dff",
        "RGB": "rgb(160,82,45)",
        "HSL": "hsl(19,56.1%,40.2%)",
        "RGBA": "rgba(160,82,45,1)",
        "HSLA": "hsla(19,56.1%,40.2%,1.000)"
    },
    "silver": {
        "hex": "#c0c0c0",
        "hexA": "#c0c0c0ff",
        "RGB": "rgb(192,192,192)",
        "HSL": "hsl(0,0%,75.3%)",
        "RGBA": "rgba(192,192,192,1)",
        "HSLA": "hsla(0,0%,75.3%,1.000)"
    },
    "skyblue": {
        "hex": "#87ceeb",
        "hexA": "#87ceebff",
        "RGB": "rgb(135,206,235)",
        "HSL": "hsl(197,71.4%,72.5%)",
        "RGBA": "rgba(135,206,235,1)",
        "HSLA": "hsla(197,71.4%,72.5%,1.000)"
    },
    "slateblue": {
        "hex": "#6a5acd",
        "hexA": "#6a5acdff",
        "RGB": "rgb(106,90,205)",
        "HSL": "hsl(248,53.5%,57.8%)",
        "RGBA": "rgba(106,90,205,1)",
        "HSLA": "hsla(248,53.5%,57.8%,1.000)"
    },
    "slategray": {
        "hex": "#708090",
        "hexA": "#708090ff",
        "RGB": "rgb(112,128,144)",
        "HSL": "hsl(210,12.6%,50.2%)",
        "RGBA": "rgba(112,128,144,1)",
        "HSLA": "hsla(210,12.6%,50.2%,1.000)"
    },
    "snow": {
        "hex": "#fffafa",
        "hexA": "#fffafaff",
        "RGB": "rgb(255,250,250)",
        "HSL": "hsl(0,100%,99%)",
        "RGBA": "rgba(255,250,250,1)",
        "HSLA": "hsla(0,100%,99%,1.000)"
    },
    "springgreen": {
        "hex": "#00ff7f",
        "hexA": "#00ff7fff",
        "RGB": "rgb(0,255,127)",
        "HSL": "hsl(150,100%,50%)",
        "RGBA": "rgba(0,255,127,1)",
        "HSLA": "hsla(150,100%,50%,1.000)"
    },
    "steelblue": {
        "hex": "#4682b4",
        "hexA": "#4682b4ff",
        "RGB": "rgb(70,130,180)",
        "HSL": "hsl(207,44%,49%)",
        "RGBA": "rgba(70,130,180,1)",
        "HSLA": "hsla(207,44%,49%,1.000)"
    },
    "tan": {
        "hex": "#d2b48c",
        "hexA": "#d2b48cff",
        "RGB": "rgb(210,180,140)",
        "HSL": "hsl(34,43.7%,68.6%)",
        "RGBA": "rgba(210,180,140,1)",
        "HSLA": "hsla(34,43.7%,68.6%,1.000)"
    },
    "teal": {
        "hex": "#008080",
        "hexA": "#008080ff",
        "RGB": "rgb(0,128,128)",
        "HSL": "hsl(180,100%,25.1%)",
        "RGBA": "rgba(0,128,128,1)",
        "HSLA": "hsla(180,100%,25.1%,1.000)"
    },
    "thistle": {
        "hex": "#d8bfd8",
        "hexA": "#d8bfd8ff",
        "RGB": "rgb(216,191,216)",
        "HSL": "hsl(300,24.3%,79.8%)",
        "RGBA": "rgba(216,191,216,1)",
        "HSLA": "hsla(300,24.3%,79.8%,1.000)"
    },
    "tomato": {
        "hex": "#ff6347",
        "hexA": "#ff6347ff",
        "RGB": "rgb(255,99,71)",
        "HSL": "hsl(9,100%,63.9%)",
        "RGBA": "rgba(255,99,71,1)",
        "HSLA": "hsla(9,100%,63.9%,1.000)"
    },
    "turquoise": {
        "hex": "#40e0d0",
        "hexA": "#40e0d0ff",
        "RGB": "rgb(64,224,208)",
        "HSL": "hsl(174,72.1%,56.5%)",
        "RGBA": "rgba(64,224,208,1)",
        "HSLA": "hsla(174,72.1%,56.5%,1.000)"
    },
    "violet": {
        "hex": "#ee82ee",
        "hexA": "#ee82eeff",
        "RGB": "rgb(238,130,238)",
        "HSL": "hsl(300,76.1%,72.2%)",
        "RGBA": "rgba(238,130,238,1)",
        "HSLA": "hsla(300,76.1%,72.2%,1.000)"
    },
    "wheat": {
        "hex": "#f5deb3",
        "hexA": "#f5deb3ff",
        "RGB": "rgb(245,222,179)",
        "HSL": "hsl(39,76.7%,83.1%)",
        "RGBA": "rgba(245,222,179,1)",
        "HSLA": "hsla(39,76.7%,83.1%,1.000)"
    },
    "white": {
        "hex": "#ffffff",
        "hexA": "#ffffffff",
        "RGB": "rgb(255,255,255)",
        "HSL": "hsl(0,0%,100%)",
        "RGBA": "rgba(255,255,255,1)",
        "HSLA": "hsla(0,0%,100%,1.000)"
    },
    "whitesmoke": {
        "hex": "#f5f5f5",
        "hexA": "#f5f5f5ff",
        "RGB": "rgb(245,245,245)",
        "HSL": "hsl(0,0%,96.1%)",
        "RGBA": "rgba(245,245,245,1)",
        "HSLA": "hsla(0,0%,96.1%,1.000)"
    },
    "yellow": {
        "hex": "#ffff00",
        "hexA": "#ffff00ff",
        "RGB": "rgb(255,255,0)",
        "HSL": "hsl(60,100%,50%)",
        "RGBA": "rgba(255,255,0,1)",
        "HSLA": "hsla(60,100%,50%,1.000)"
    },
    "yellowgreen": {
        "hex": "#9acd32",
        "hexA": "#9acd32ff",
        "RGB": "rgb(154,205,50)",
        "HSL": "hsl(80,60.8%,50%)",
        "RGBA": "rgba(154,205,50,1)",
        "HSLA": "hsla(80,60.8%,50%,1.000)"
    }
}
