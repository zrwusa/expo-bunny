import {DeepLeavesWrap, JsonKeys} from "./utils";
import {IconProps} from "react-native-vector-icons/Icon";
import glyphMaterialCommunityMap from "@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json";
import {glyphMaterialCommunityCustomMap} from "../helpers";
import {ReactNode} from "react";
import glyphMapIcoMoon from "../assets/fonts/icomoon-cus/icomoon.json"
import {ImageStyle, TextStyle, ViewStyle} from "react-native";
import {ColorSchemeName} from "react-native-appearance";
import {VictoryThemeDefinition} from "../components/Victory/Victory.web";

export type CheckColor = 'isColor' | 'isHex' | 'isHexA' | 'isRGB' | 'isRGBA' | 'isHSL' | 'isHSLA' | 'isColorName' | 'isExceptional'
export type CheckColorResult = {
    [key in CheckColor]: boolean
}
export type CheckResultType = '' | 'Hex' | 'HexA' | 'RGB' | 'RGBA' | 'HSL' | 'HSLA' | 'ColorName' | 'Exceptional'
export type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

export type DimensionKeys = 'bunnyUI' | 'iphoneX' | 'iPad' | 'pixel2XL' | 'pcBrowser'
    | 'custom1' | 'custom2' | 'custom3';
export type DimensionFun = {
    wp: (width: number, shouldRound?: boolean) => number,
    hp: (height: number, shouldRound?: boolean) => number
}
export type DesignsBasedOn = {
    [key in DimensionKeys]: DimensionFun
}

export type Dimension = { width: number, height: number };
export type SizeLabor = {
    designsBasedOn: DesignsBasedOn,
    measure: Measure,
    ms: Measure,
}
export type Dimensions = {
    [key in DimensionKeys]: ConfigDimension
}

export type ConfigDimension = {
    width: number,
    height: number
}

export type MeasureProviderProps = {
    children: ReactNode,
};

export type ThemeProviderProps = {
    children: ReactNode,
    themeLabor?: ThemeLabor
};

export type ThemeLabor = {
    theme: Theme,
    currentThemeName: string,
    themes: { [key in ThemeName]: Theme },
    changeTheme: (themeName: ThemeName) => void,
    sysColorSchemeName?: ColorSchemeName
}

export type Mode = 'adaptive' | 'exact';

export type Font = {
    fontFamily: string,
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
}

export type Fonts = {
    regular: Font,
    medium: Font,
    light: Font,
    thin: Font
}
export type Colors = {
    // In the theme, we should care about the role of these color variables rather than the specific values,
    // such as 'primary success', not 'grey0, black'. The specific values should be named in the Palette.

    // ---start main
    primary: string,
    secondary: string,
    accent: string,
    border: string,
    border2: string,
    divider: string,
    // ---end main


    // ---start text
    text: string,
    text2: string,
    text3: string,
    buttonText: string,
    buttonText2: string,
    caption: string,
    caption2: string,
    paragraph: string,
    paragraph2: string,
    // ---end text


    // ---start background
    background: string,
    // background2: string,
    // background3: string,
    btnBackground: string,
    btnBackground2: string,
    card: string,
    surface: string,
    surface2: string,
    surface3: string,
    paper: string,
    paper2: string,
    // ---end background


    // ---start unknown
    onBackground: string,
    // onBackground2: string,
    onSurface: string,
    // onSurface2: string,

    // accent2: string,
    // ---en unknown


    // ---start tip
    success: string,
    error: string,
    warning: string,
    notification: string,
    info: string,
    // --- end tip


    // --- start functional
    disabled: string,
    placeholder: string,
    backdrop: string,
    transparent: string,
    // --- end functional

}

export type ThemeColorKeys = keyof Colors;

export interface Animation {
    scale: number,
}

export interface Theme {
    dark: boolean,
    mode?: Mode,
    colors: Colors,
    fonts: Fonts,
    roundness: number,
    borderRadius: { button: number, input: number, surface: number },
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
    victory?: VictoryThemeDefinition,
}

export type PlatformType = 'web' | 'ios' | 'default'
export type FontConfigPlatform = {
    [key in PlatformType]: Fonts
}

// export type Themes = {
//     light: string,
//     dark: string,
// }

export type ThemeName = 'light' | 'dark' | 'indigo';
export type Themes = { [key in ThemeName]: Theme }
export type EnumThemeNames = {
    [key in ThemeName]: ThemeName
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
type Attr = {
    "fill"?: string
}
export type IcoMoonSelectionIcon = {
    "icon": {
        "paths": string[],
        "attrs": Attr[],
        "isMulticolor": boolean,
        "isMulticolor2": boolean,
        "tags": string[],
        "grid": number
    },
    "attrs": Attr[],
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
    percentageSizes: {
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
    zIndex: Size,
    bp: {
        smallPhone: number,
        phone: number,
        tablet: number,
    },
    ps: {
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
    br: Size,
    zi: Size
}
export type SizeKeys = keyof Size;
export type Size = {
    xxs: number,
    xs: number,
    s: number,
    m: number,
    l: number,
    xl: number,
    xxl: number,
}
export type PaletteKeys = keyof Palette;
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


    //---start--- react-native-paper
    green850: string,
    deepPurple550: string,
    grey90: string,
    redA800: string,
    //---end--- react-native-paper


    //---start--- victory chart
    brown220: string,
    grey320: string,
    brown620: string,
    black890: string,
    //---end--- victory chart


    //---start--- others
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
    //---end--- others

    //---start--- indigo theme
    blueIndigo50: string, // text
    blueIndigo100: string, //
    blueIndigo150: string, // placeholder
    blueIndigo300: string, // inActive text
    blueIndigo900: string, // border
    blueIndigoA100: string, // input background
    blueIndigoA400: string,// background
    blueIndigoA700: string, // background dark
    tealA500: string, // button from
    lightBlue630: string,// button to
    blueGrey870: string, // label background
    //---end--- indigo theme


    //---start--- iOS theme
    // xxxIOS  light default
    // xxxIOS2 light accessible
    // xxxIOS3 dark default
    // xxxIOS4 dark accessible
    redIOS: string,
    redIOS2: string,
    redIOS3: string,
    redIOS4: string,

    orangeIOS: string,
    orangeIOS2: string,
    orangeIOS3: string,
    orangeIOS4: string,

    yellowIOS: string,
    yellowIOS2: string,
    yellowIOS3: string,
    yellowIOS4: string,

    greenIOS: string,
    greenIOS2: string,
    greenIOS3: string,
    greenIOS4: string,

    tealIOS: string,
    tealIOS2: string,
    tealIOS3: string,
    tealIOS4: string,

    blueIOS: string,
    blueIOS2: string,
    blueIOS3: string,
    blueIOS4: string,

    indigoIOS: string,
    indigoIOS2: string,
    indigoIOS3: string,
    indigoIOS4: string,

    purpleIOS: string,
    purpleIOS2: string,
    purpleIOS3: string,
    purpleIOS4: string,

    pinkIOS: string,
    pinkIOS2: string,
    pinkIOS3: string,
    pinkIOS4: string,

    greyIOS: string,
    greyIOS2: string,
    greyIOS3: string,
    greyIOS4: string,

    grey2IOS: string,
    grey2IOS2: string,
    grey2IOS3: string,
    grey2IOS4: string,

    grey3IOS: string,
    grey3IOS2: string,
    grey3IOS3: string,
    grey3IOS4: string,

    grey4IOS: string,
    grey4IOS2: string,
    grey4IOS3: string,
    grey4IOS4: string,

    grey5IOS: string,
    grey5IOS2: string,
    grey5IOS3: string,
    grey5IOS4: string,

    grey6IOS: string,
    grey6IOS2: string,
    grey6IOS3: string,
    grey6IOS4: string,
    //---end--- iOS theme
}
