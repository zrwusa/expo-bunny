import color from 'color';
import {black, white, pinkA400} from './colors';
import configureFonts from './fonts';
import palette from "../../palette";
import {Platform} from "react-native";
import {Theme} from "../types";

const DefaultTheme: Theme = {
    dark: false,
    roundness: 4,
    colors: {
        primary: '#6200ee',
        accent: '#03dac4',
        background: '#f6f6f6',
        surface: white,
        error: '#B00020',
        text: black,
        onBackground: '#000000',
        onSurface: '#000000',
        disabled: color(black).alpha(0.26).rgb().string(),
        placeholder: color(black).alpha(0.54).rgb().string(),
        backdrop: color(black).alpha(0.5).rgb().string(),
        notification: pinkA400,
        demoColor0: palette.white,
        demoColor1: palette.teal400,
        btnTextColor: palette.white,
        btnBgColor: palette.teal400,
        transparent: palette.transparent,
    },
    fonts: {
        ...configureFonts(), demoFont0: {...configureFonts()['light']},
        demoFont1: {...configureFonts()['thin']},
    },
    animation: {
        scale: 1.0,
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

export default DefaultTheme;
