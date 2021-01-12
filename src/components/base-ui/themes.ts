import {DarkTheme as DarkThemePaper, DefaultTheme as DefaultThemePaper} from "react-native-paper";
import {Platform} from "react-native";
import palette from "./palette";

export const DarkTheme: ReactNativePaper.Theme = {
    ...DarkThemePaper,
    colors: {
        ...DarkThemePaper.colors,
        demoColor0: palette.white,
        demoColor1: palette.orange800,
        btnTextColor: palette.white,
        btnBgColor: palette.orange800,
    },
    fonts: {
        ...DarkThemePaper.fonts,
        demoFont0: {...DarkThemePaper.fonts['light']},
        demoFont1: {...DarkThemePaper.fonts['thin']},
    },
    animation: {
        ...DarkThemePaper.animation,
        demoProperty0: 1,
        demoProperty1: 1,
    },
    breakpoints: {
        smallPhone: 0,
        phone: 321,
        tablet: 768,
    },
    spacings: {
        xxxs: 1,
        xxs: 2,
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 48,
        xxl: 96,
        xxxl: 192,
    },
    typography: {
        header: {
            fontFamily: Platform.select({
                web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
                ios: 'System',
                default: 'sans-serif'
            }),
            fontSize: 24,
            fontWeight: 'bold',
        },
        body: {
            fontFamily: Platform.select({
                web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
                ios: 'System',
                default: 'sans-serif'
            }),
            fontSize: 16,
        }
    },
    demoThemeProperty0: '',
    demoThemeProperty1: '',

};

export const DefaultTheme: ReactNativePaper.Theme = {
    ...DefaultThemePaper,
    colors: {
        ...DefaultThemePaper.colors,
        demoColor0: palette.white,
        demoColor1: palette.teal400,
        btnTextColor: palette.white,
        btnBgColor: palette.teal400,
    },
    fonts: {
        ...DefaultThemePaper.fonts,
        demoFont0: {...DefaultThemePaper.fonts['light']},
        demoFont1: {...DarkTheme.fonts['thin']},
    },
    animation: {
        ...DefaultThemePaper.animation,
        demoProperty0: 1,
        demoProperty1: 1,
    },
    demoThemeProperty0: '',
    demoThemeProperty1: '',
    breakpoints: {
        smallPhone: 0,
        phone: 321,
        tablet: 768,
    },
    spacings: {
        xxxs: 1,
        xxs: 2,
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 48,
        xxl: 96,
        xxxl: 192,
    },
    typography: {
        header: {
            fontFamily: Platform.select({
                web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
                ios: 'System',
                default: 'sans-serif'
            }),
            fontSize: 24,
            fontWeight: 'bold',
        },
        body: {
            fontFamily: Platform.select({
                web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
                ios: 'System',
                default: 'sans-serif'
            }),
            fontSize: 16,
        }
    },
};


