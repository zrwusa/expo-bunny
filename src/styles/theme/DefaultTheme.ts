import color from "color";
import {palette} from "./palette";
import {configureFonts} from "./fonts";
import {Theme} from "../../types/styles";

export const DefaultTheme: Theme = {
    dark: false,
    roundness: 4,
    colors: {
        primary: palette.teal800,
        accent: palette.blue400,
        background: palette.grey200,
        surface: palette.white,
        error: palette.red600,
        text: palette.black,
        onBackground: palette.black,
        onSurface: palette.black,
        disabled: color(palette.black).alpha(0.26).rgb().string(),
        placeholder: color(palette.black).alpha(0.54).rgb().string(),
        backdrop: color(palette.black).alpha(0.5).rgb().string(),
        notification: palette.pinkA400,

        btnTextColor: palette.white,
        btnBgColor: palette.teal400,
        transparent: palette.transparent,
        demoColor0: palette.white,
        demoColor1: palette.teal400,
    },
    fonts: {
        ...configureFonts(),
        demoFont0: {...configureFonts()['light']},
        demoFont1: {...configureFonts()['thin']},
    },
    animation: {
        scale: 1.0,
        demoProperty0: 0,
        demoProperty1: 1,
    },
    typography: {
        header: {
            fontFamily: configureFonts()['regular'].fontFamily,
            fontSize: 24,
            fontWeight: 'bold',
        },
        body: {
            fontFamily: configureFonts()['regular'].fontFamily,
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
