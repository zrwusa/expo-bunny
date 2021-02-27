import {DeepLeavesWrap, JsonKeys} from "./utils";
import {IconProps} from "react-native-vector-icons/Icon";
import glyphMaterialCommunityMap from "@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json";
import {glyphMaterialCommunityCustomMap} from "../common";
import {ReactNode} from "react";
import glyphMapIcoMoon from "../assets/fonts/icomoon-cus/icomoon.json"
import {ImageStyle, TextStyle, ViewStyle} from "react-native";
import {ColorSchemeName} from "react-native-appearance";

export type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

export type Responsive = Record<keyof DimensionConfig, ResponsiveInstance>;
export type ResponsiveInstance = { wp: Function, hp: Function };
export type Dimension = { width: number, height: number };
export type SizeLabor = {
    responsive: Responsive,
    measure: Measure,
    ms: Measure,
}

export type DimensionConfig = {
    "bunnyUI": Dimension,
    "iphoneX": Dimension,
    "iPad": Dimension,
    "pixel2XL": Dimension,
    "pcBrowser": Dimension,
    "custom1": Dimension,
    "custom2": Dimension,
    "custom3": Dimension
}

export type ResponsiveProviderProps = {
    children: ReactNode,
};

export type MeasureProviderProps = {
    children: ReactNode,
};

export type ThemeProviderProps = {
    children: ReactNode,
    themeLabor?: ThemeLabor
};

export type ThemeLabor = {
    theme: Theme,
    changeTheme: (themeName: ThemeName) => void,
    sysColorSchemeName?: ColorSchemeName
}

export type Mode = 'adaptive' | 'exact';

export type Font = {
    fontFamily: string,
    fontWeight?: string,
}

export type Fonts = {
    regular: Font,
    medium: Font,
    light: Font,
    thin: Font
}

export interface Colors {
    primary: string,
    secondary: string,
    btnText: string,
    btnActive: string,
    btnTextSecondary: string,
    btnActiveSecondary: string,

    title: string,
    titleSecondary: string,
    text: string,
    textSecondary: string,
    caption: string,
    captionSecondary: string,
    paragraph: string,
    paragraphSecondary: string,
    border: string,
    borderSecondary: string,
    surface: string,
    surfaceSecondary: string,
    background: string,
    backgroundSecondary: string,
    accent: string,
    accentSecondary: string,

    error: string,
    errorSecondary: string,
    warning: string,
    warningSecondary: string,
    notification: string,
    notificationSecondary: string,
    info: string,
    infoSecondary: string,

    onSurface: string,
    onSurfaceSecondary: string,
    onBackground: string,
    onBackgroundSecondary: string,
    disabled: string,
    placeholder: string,
    backdrop: string,
    backdropSecondary: string,

    transparent: string,
    card: string,
    paper: string,
    paperSecondary: string,

    // ---start---  react-native-elements
    // Not a best practice, for compatibility with react-native-elements.
    // Obviously, the color variables defined in the react-native-elements theme is not standardized.
    // In the theme, we should care about the role of these color variables rather than the specific values,
    // such as 'primary success', not 'grey0, black'. The specific values should be named in the Palette.
    white: string,
    black: string,
    grey0: string,
    grey1: string,
    grey2: string,
    grey3: string,
    grey4: string,
    grey5: string,
    greyOutline: string,
    searchBg: string,
    success: string,
    divider: string,
    // ---end---  react-native-elements
}

export interface Animation {
    scale: number,
}

export interface Theme {
    dark: boolean,
    mode?: Mode,
    colors: Colors,
    fonts: Fonts,
    roundness: number,
    animation: Animation,
    typography: {
        header: {
            fontFamily: string,
            fontWeight?: string,
        },
        body: {
            fontFamily: string,
            fontWeight?: string,
        }
    },
}

export type WithThemeLabor = { themeLabor: ThemeLabor }

export type FontConfigPlatform = {
    web: Fonts,
    ios: Fonts,
    default: Fonts
}

// export type Themes = {
//     light: string,
//     dark: string,
// }

export type ThemeName = 'light' | 'dark';
export type Themes = { [key in ThemeName]: Theme }
export type EnumThemeNames = {
    [key: string]: ThemeName
}

export type FontsWrapped = DeepLeavesWrap<Fonts, Themes>

export type ThemeWarehouse = DeepLeavesWrap<Theme, Themes>

export type MaterialCommunityIconKeys = JsonKeys<typeof glyphMaterialCommunityMap>

export type MaterialCommunityCustomIconsKeys = JsonKeys<typeof glyphMaterialCommunityCustomMap>

export type IcoMoonKeys = JsonKeys<typeof glyphMapIcoMoon>

export interface MaterialCommunityIconsProps extends IconProps {
    name: MaterialCommunityIconKeys
}

export interface MaterialCommunityCustomIconsProps extends IconProps {
    name: MaterialCommunityCustomIconsKeys
}

export interface IcoMoonProps extends IconProps {
    name: IcoMoonKeys
}

export type RouteIconFontConfig = {
    default: string,
    focused: string,
}

export type IcoMoonSelectionPreferences = {
    "showGlyphs": boolean,
    "showCodes": boolean,
    "showQuickUse": boolean,
    "showQuickUse2": boolean,
    "showSVGs": boolean,
    "fontPref": {
        "prefix": string,
        "metadata": {
            "fontFamily": string
        },
        "metrics": {
            "emSize": number,
            "baseline": number,
            "whitespace": number
        },
        "embed": boolean
    },
    "imagePref": {
        "prefix": string,
        "png": boolean,
        "useClassSelector": boolean,
        "color": number,
        "bgColor": number,
        "name": string,
        "classSelector": string
    },
    "historySize": number
}
export type IcoMoonSelection = {
    "IcoMoonType": string,
    "icons": IcoMoonSelectionIcon[],
    "height": number,
    "metadata": {
        "name": string
    },
    "preferences": IcoMoonSelectionPreferences
}
export type IcoMoonSelectionIcon = {
    "icon": {
        "paths": string[],
        "attrs": [],
        "isMulticolor": boolean,
        "isMulticolor2": boolean,
        "tags": string[],
        "grid": number
    },
    "attrs": [],
    "properties": {
        "ligatures": string,
        "id": number,
        "order": number,
        "prevSize": number,
        "code": number,
        "name": string
    },
    "setIdx": number,
    "setId": number,
    "iconIdx": number
}
export type Measure = {
    breakpoints: {
        smallPhone: number,
        phone: number,
        tablet: number,
    },
    spacings: Size,
    sizes: {
        s1: string,
        s2: string,
        s3: string,
        s4: string,
        s5: string,
        s6: string,
        s7: string,
        s8: string,
        s9: string,
        s10: string,
        s11: string,
        s12: string,
    },
    fontSizes: Size,
    lineHeight: Size,
    borderRadius: Size,
    bp: {
        smallPhone: number,
        phone: number,
        tablet: number,
    },
    sz: {
        s1: string,
        s2: string,
        s3: string,
        s4: string,
        s5: string,
        s6: string,
        s7: string,
        s8: string,
        s9: string,
        s10: string,
        s11: string,
        s12: string,
    },
    sp: Size,
    fs: Size,
    lh: Size,
    br: Size
}
export type Size = {
    xxs: number,
    xs: number,
    s: number,
    m: number,
    l: number,
    xl: number,
    xxl: number,
}
export type Palette = {
    red50: string,
    red100: string,
    red200: string,
    red300: string,
    red400: string,
    red500: string,
    red600: string,
    red700: string,
    red800: string,
    red900: string,
    redA100: string,
    redA200: string,
    redA400: string,
    redA700: string,

    pink50: string,
    pink100: string,
    pink200: string,
    pink300: string,
    pink400: string,
    pink500: string,
    pink600: string,
    pink700: string,
    pink800: string,
    pink900: string,
    pinkA100: string,
    pinkA200: string,
    pinkA400: string,
    pinkA700: string,

    purple50: string,
    purple100: string,
    purple200: string,
    purple300: string,
    purple400: string,
    purple500: string,
    purple600: string,
    purple700: string,
    purple800: string,
    purple900: string,
    purpleA100: string,
    purpleA200: string,
    purpleA400: string,
    purpleA700: string,

    deepPurple50: string,
    deepPurple100: string,
    deepPurple200: string,
    deepPurple300: string,
    deepPurple400: string,
    deepPurple500: string,
    deepPurple600: string,
    deepPurple700: string,
    deepPurple800: string,
    deepPurple900: string,
    deepPurpleA100: string,
    deepPurpleA200: string,
    deepPurpleA400: string,
    deepPurpleA700: string,

    indigo50: string,
    indigo100: string,
    indigo200: string,
    indigo300: string,
    indigo400: string,
    indigo500: string,
    indigo600: string,
    indigo700: string,
    indigo800: string,
    indigo900: string,
    indigoA100: string,
    indigoA200: string,
    indigoA400: string,
    indigoA700: string,

    blue50: string,
    blue100: string,
    blue200: string,
    blue300: string,
    blue400: string,
    blue500: string,
    blue600: string,
    blue700: string,
    blue800: string,
    blue900: string,
    blueA100: string,
    blueA200: string,
    blueA400: string,
    blueA700: string,

    lightBlue50: string,
    lightBlue100: string,
    lightBlue200: string,
    lightBlue300: string,
    lightBlue400: string,
    lightBlue500: string,
    lightBlue600: string,
    lightBlue700: string,
    lightBlue800: string,
    lightBlue900: string,
    lightBlueA100: string,
    lightBlueA200: string,
    lightBlueA400: string,
    lightBlueA700: string,

    cyan50: string,
    cyan100: string,
    cyan200: string,
    cyan300: string,
    cyan400: string,
    cyan500: string,
    cyan600: string,
    cyan700: string,
    cyan800: string,
    cyan900: string,
    cyanA100: string,
    cyanA200: string,
    cyanA400: string,
    cyanA700: string,

    teal50: string,
    teal100: string,
    teal200: string,
    teal300: string,
    teal400: string,
    teal500: string,
    teal600: string,
    teal700: string,
    teal800: string,
    teal900: string,
    tealA100: string,
    tealA200: string,
    tealA400: string,
    tealA700: string,

    green50: string,
    green100: string,
    green200: string,
    green300: string,
    green400: string,
    green500: string,
    green600: string,
    green700: string,
    green800: string,
    green900: string,
    greenA100: string,
    greenA200: string,
    greenA400: string,
    greenA700: string,

    lightGreen50: string,
    lightGreen100: string,
    lightGreen200: string,
    lightGreen300: string,
    lightGreen400: string,
    lightGreen500: string,
    lightGreen600: string,
    lightGreen700: string,
    lightGreen800: string,
    lightGreen900: string,
    lightGreenA100: string,
    lightGreenA200: string,
    lightGreenA400: string,
    lightGreenA700: string,

    lime50: string,
    lime100: string,
    lime200: string,
    lime300: string,
    lime400: string,
    lime500: string,
    lime600: string,
    lime700: string,
    lime800: string,
    lime900: string,
    limeA100: string,
    limeA200: string,
    limeA400: string,
    limeA700: string,

    yellow50: string,
    yellow100: string,
    yellow200: string,
    yellow300: string,
    yellow400: string,
    yellow500: string,
    yellow600: string,
    yellow700: string,
    yellow800: string,
    yellow900: string,
    yellowA100: string,
    yellowA200: string,
    yellowA400: string,
    yellowA700: string,

    amber50: string,
    amber100: string,
    amber200: string,
    amber300: string,
    amber400: string,
    amber500: string,
    amber600: string,
    amber700: string,
    amber800: string,
    amber900: string,
    amberA100: string,
    amberA200: string,
    amberA400: string,
    amberA700: string,

    orange50: string,
    orange100: string,
    orange200: string,
    orange300: string,
    orange400: string,
    orange500: string,
    orange600: string,
    orange700: string,
    orange800: string,
    orange900: string,
    orangeA100: string,
    orangeA200: string,
    orangeA400: string,
    orangeA700: string,

    deepOrange50: string,
    deepOrange100: string,
    deepOrange200: string,
    deepOrange300: string,
    deepOrange400: string,
    deepOrange500: string,
    deepOrange600: string,
    deepOrange700: string,
    deepOrange800: string,
    deepOrange900: string,
    deepOrangeA100: string,
    deepOrangeA200: string,
    deepOrangeA400: string,
    deepOrangeA700: string,

    brown50: string,
    brown100: string,
    brown200: string,
    brown300: string,
    brown400: string,
    brown500: string,
    brown600: string,
    brown700: string,
    brown800: string,
    brown900: string,

    blueGrey50: string,
    blueGrey100: string,
    blueGrey200: string,
    blueGrey300: string,
    blueGrey400: string,
    blueGrey500: string,
    blueGrey600: string,
    blueGrey700: string,
    blueGrey800: string,
    blueGrey900: string,

    grey50: string,
    grey100: string,
    grey200: string,
    grey300: string,
    grey400: string,
    grey500: string,
    grey600: string,
    grey700: string,
    grey800: string,
    grey900: string,

    black800: string,
    black900: string,

    black: string,
    blackContrast: string,
    white: string,
    whiteContrast: string,
    transparent: string,

    //---start---extra
    grey290: string,
    grey350: string,
    grey380: string,
    grey390: string,
    grey410: string,
    grey550: string,
    grey750: string,
    grey790: string,
    grey810: string,
    grey850: string,

    blueGrey850: string,
    lightGreenA720: string,
    green610: string,
    redA420: string,
    red910: string,
    yellow720: string,
    yellow780: string,
    blueGrey320: string,
    //---end---extra
}

export type PaletteWithColors = {
    red50: '#ffebee',
    red100: '#ffcdd2',
    red200: '#ef9a9a',
    red300: '#e57373',
    red400: '#ef5350',
    red500: '#f44336',
    red600: '#e53935',
    red700: '#d32f2f',
    red800: '#c62828',
    red900: '#b71c1c',
    redA100: '#ff8a80',
    redA200: '#ff5252',
    redA400: '#ff1744',
    redA700: '#d50000',

    pink50: '#fce4ec',
    pink100: '#f8bbd0',
    pink200: '#f48fb1',
    pink300: '#f06292',
    pink400: '#ec407a',
    pink500: '#e91e63',
    pink600: '#d81b60',
    pink700: '#c2185b',
    pink800: '#ad1457',
    pink900: '#880e4f',
    pinkA100: '#ff80ab',
    pinkA200: '#ff4081',
    pinkA400: '#f50057',
    pinkA700: '#c51162',

    purple50: '#f3e5f5',
    purple100: '#e1bee7',
    purple200: '#ce93d8',
    purple300: '#ba68c8',
    purple400: '#ab47bc',
    purple500: '#9c27b0',
    purple600: '#8e24aa',
    purple700: '#7b1fa2',
    purple800: '#6a1b9a',
    purple900: '#4a148c',
    purpleA100: '#ea80fc',
    purpleA200: '#e040fb',
    purpleA400: '#d500f9',
    purpleA700: '#aa00ff',

    deepPurple50: '#ede7f6',
    deepPurple100: '#d1c4e9',
    deepPurple200: '#b39ddb',
    deepPurple300: '#9575cd',
    deepPurple400: '#7e57c2',
    deepPurple500: '#673ab7',
    deepPurple600: '#5e35b1',
    deepPurple700: '#512da8',
    deepPurple800: '#4527a0',
    deepPurple900: '#311b92',
    deepPurpleA100: '#b388ff',
    deepPurpleA200: '#7c4dff',
    deepPurpleA400: '#651fff',
    deepPurpleA700: '#6200ea',

    indigo50: '#e8eaf6',
    indigo100: '#c5cae9',
    indigo200: '#9fa8da',
    indigo300: '#7986cb',
    indigo400: '#5c6bc0',
    indigo500: '#3f51b5',
    indigo600: '#3949ab',
    indigo700: '#303f9f',
    indigo800: '#283593',
    indigo900: '#1a237e',
    indigoA100: '#8c9eff',
    indigoA200: '#536dfe',
    indigoA400: '#3d5afe',
    indigoA700: '#304ffe',

    blue50: '#e3f2fd',
    blue100: '#bbdefb',
    blue200: '#90caf9',
    blue300: '#64b5f6',
    blue400: '#42a5f5',
    blue500: '#2196f3',
    blue600: '#1e88e5',
    blue700: '#1976d2',
    blue800: '#1565c0',
    blue900: '#0d47a1',
    blueA100: '#82b1ff',
    blueA200: '#448aff',
    blueA400: '#2979ff',
    blueA700: '#2962ff',

    lightBlue50: '#e1f5fe',
    lightBlue100: '#b3e5fc',
    lightBlue200: '#81d4fa',
    lightBlue300: '#4fc3f7',
    lightBlue400: '#29b6f6',
    lightBlue500: '#03a9f4',
    lightBlue600: '#039be5',
    lightBlue700: '#0288d1',
    lightBlue800: '#0277bd',
    lightBlue900: '#01579b',
    lightBlueA100: '#80d8ff',
    lightBlueA200: '#40c4ff',
    lightBlueA400: '#00b0ff',
    lightBlueA700: '#0091ea',

    cyan50: '#e0f7fa',
    cyan100: '#b2ebf2',
    cyan200: '#80deea',
    cyan300: '#4dd0e1',
    cyan400: '#26c6da',
    cyan500: '#00bcd4',
    cyan600: '#00acc1',
    cyan700: '#0097a7',
    cyan800: '#00838f',
    cyan900: '#006064',
    cyanA100: '#84ffff',
    cyanA200: '#18ffff',
    cyanA400: '#00e5ff',
    cyanA700: '#00b8d4',

    teal50: '#e0f2f1',
    teal100: '#b2dfdb',
    teal200: '#80cbc4',
    teal300: '#4db6ac',
    teal400: '#26a69a',
    teal500: '#009688',
    teal600: '#00897b',
    teal700: '#00796b',
    teal800: '#00695c',
    teal900: '#004d40',
    tealA100: '#a7ffeb',
    tealA200: '#64ffda',
    tealA400: '#1de9b6',
    tealA700: '#00bfa5',

    green50: '#e8f5e9',
    green100: '#c8e6c9',
    green200: '#a5d6a7',
    green300: '#81c784',
    green400: '#66bb6a',
    green500: '#4caf50',
    green600: '#43a047',
    green700: '#388e3c',
    green800: '#2e7d32',
    green900: '#1b5e20',
    greenA100: '#b9f6ca',
    greenA200: '#69f0ae',
    greenA400: '#00e676',
    greenA700: '#00c853',

    lightGreen50: '#f1f8e9',
    lightGreen100: '#dcedc8',
    lightGreen200: '#c5e1a5',
    lightGreen300: '#aed581',
    lightGreen400: '#9ccc65',
    lightGreen500: '#8bc34a',
    lightGreen600: '#7cb342',
    lightGreen700: '#689f38',
    lightGreen800: '#558b2f',
    lightGreen900: '#33691e',
    lightGreenA100: '#ccff90',
    lightGreenA200: '#b2ff59',
    lightGreenA400: '#76ff03',
    lightGreenA700: '#64dd17',

    lime50: '#f9fbe7',
    lime100: '#f0f4c3',
    lime200: '#e6ee9c',
    lime300: '#dce775',
    lime400: '#d4e157',
    lime500: '#cddc39',
    lime600: '#c0ca33',
    lime700: '#afb42b',
    lime800: '#9e9d24',
    lime900: '#827717',
    limeA100: '#f4ff81',
    limeA200: '#eeff41',
    limeA400: '#c6ff00',
    limeA700: '#aeea00',

    yellow50: '#fffde7',
    yellow100: '#fff9c4',
    yellow200: '#fff59d',
    yellow300: '#fff176',
    yellow400: '#ffee58',
    yellow500: '#ffeb3b',
    yellow600: '#fdd835',
    yellow700: '#fbc02d',
    yellow800: '#f9a825',
    yellow900: '#f57f17',
    yellowA100: '#ffff8d',
    yellowA200: '#ffff00',
    yellowA400: '#ffea00',
    yellowA700: '#ffd600',

    amber50: '#fff8e1',
    amber100: '#ffecb3',
    amber200: '#ffe082',
    amber300: '#ffd54f',
    amber400: '#ffca28',
    amber500: '#ffc107',
    amber600: '#ffb300',
    amber700: '#ffa000',
    amber800: '#ff8f00',
    amber900: '#ff6f00',
    amberA100: '#ffe57f',
    amberA200: '#ffd740',
    amberA400: '#ffc400',
    amberA700: '#ffab00',

    orange50: '#fff3e0',
    orange100: '#ffe0b2',
    orange200: '#ffcc80',
    orange300: '#ffb74d',
    orange400: '#ffa726',
    orange500: '#ff9800',
    orange600: '#fb8c00',
    orange700: '#f57c00',
    orange800: '#ef6c00',
    orange900: '#e65100',
    orangeA100: '#ffd180',
    orangeA200: '#ffab40',
    orangeA400: '#ff9100',
    orangeA700: '#ff6d00',

    deepOrange50: '#fbe9e7',
    deepOrange100: '#ffccbc',
    deepOrange200: '#ffab91',
    deepOrange300: '#ff8a65',
    deepOrange400: '#ff7043',
    deepOrange500: '#ff5722',
    deepOrange600: '#f4511e',
    deepOrange700: '#e64a19',
    deepOrange800: '#d84315',
    deepOrange900: '#bf360c',
    deepOrangeA100: '#ff9e80',
    deepOrangeA200: '#ff6e40',
    deepOrangeA400: '#ff3d00',
    deepOrangeA700: '#dd2c00',

    brown50: '#efebe9',
    brown100: '#d7ccc8',
    brown200: '#bcaaa4',
    brown300: '#a1887f',
    brown400: '#8d6e63',
    brown500: '#795548',
    brown600: '#6d4c41',
    brown700: '#5d4037',
    brown800: '#4e342e',
    brown900: '#3e2723',

    blueGrey50: '#eceff1',
    blueGrey100: '#cfd8dc',
    blueGrey200: '#b0bec5',
    blueGrey300: '#90a4ae',
    blueGrey400: '#78909c',
    blueGrey500: '#607d8b',
    blueGrey600: '#546e7a',
    blueGrey700: '#455a64',
    blueGrey800: '#37474f',
    blueGrey900: '#263238',

    grey50: '#fafafa',
    grey100: '#f5f5f5',
    grey200: '#eeeeee',
    grey300: '#e0e0e0',
    grey400: '#bdbdbd',
    grey500: '#9e9e9e',
    grey600: '#757575',
    grey700: '#616161',
    grey800: '#424242',
    grey900: '#212121',

    black800: '#242424',
    black900: '#121212',

    black: '#000000',
    blackContrast: '#f2f2f2',
    white: '#ffffff',
    whiteContrast: '#080808',
    transparent: 'transparent',

    //---start--- react-native-elements
    grey290: '#e1e8ee',
    grey350: '#d8d8d8',
    grey380: '#bcbbc1',
    grey390: '#bdc6cf',
    grey410: '#bbbbbb',
    grey550: '#86939e',
    grey750: '#5e6977',
    grey790: '#43484d',
    grey810: '#393e42',
    grey850: '#272729',

    blueGrey850: '#303337',
    lightGreenA720: '#52c41a',
    green610: '#439946',
    redA420: '#ff190c',
    red910: '#bf2c24',
    yellow720: '#cfbe27',
    yellow780: '#faad14',
    blueGrey320: '#86939e',
    //---end---extra
}



