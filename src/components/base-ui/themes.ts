import {DarkTheme as DarkThemePaper, DefaultTheme as DefaultThemePaper} from "react-native-paper";
import {Platform} from "react-native";
import palette from "./palette";
import {EThemes} from "../../types/enums";

// Theming only cares about these properties e.g. colors,fonts families,animations. Do not restrict the size attribute.
// Although borderRadius is also a size, it does not affect the entire page and will not cause confusion,
// so borderRadius is included in the theme attribute. All other size-related attributes are managed by measure
const DarkTheme: ReactNativePaper.Theme = {
    ...DarkThemePaper,
    colors: {
        ...DarkThemePaper.colors,
        demoColor0: palette.white,
        demoColor1: palette.orange800,
        btnTextColor: palette.white,
        btnBgColor: palette.orange800,
        transparent: palette.transparent,
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
    borderRadius: {
        xxs: 2,
        xs: 4,
        s: 8,
        m: 16,
        l: 32,
        xl: 64,
        xxl: 128,
    },
    demoThemeProperty0: '',
    demoThemeProperty1: '',
};

const DefaultTheme: ReactNativePaper.Theme = {
    ...DefaultThemePaper,
    colors: {
        ...DefaultThemePaper.colors,
        demoColor0: palette.white,
        demoColor1: palette.teal400,
        btnTextColor: palette.white,
        btnBgColor: palette.teal400,
        transparent: palette.transparent,
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
    borderRadius: {
        xxs: 2,
        xs: 4,
        s: 8,
        m: 16,
        l: 32,
        xl: 64,
        xxl: 128,
    },
    demoThemeProperty0: '',
    demoThemeProperty1: '',
};

export const themes = {
    [EThemes.DARK]: DarkTheme,
    [EThemes.DEFAULT]: DefaultTheme,
}
