import color from "color";
import {DefaultTheme} from "./DefaultTheme";
import {palette} from "./palette";
import {Theme} from "../../types/styles";

export const DarkTheme: Theme = {
    ...DefaultTheme,
    dark: true,
    mode: 'adaptive',
    colors: {
        ...DefaultTheme.colors,
        primary: palette.purple400,
        accent: palette.tealA700,
        background: palette.black900,
        surface: palette.black900,
        error: palette.pink300,
        onBackground: palette.white,
        onSurface: palette.white,
        text: palette.white,
        disabled: color(palette.white).alpha(0.38).rgb().string(),
        placeholder: color(palette.white).alpha(0.54).rgb().string(),
        backdrop: color(palette.black).alpha(0.5).rgb().string(),
        notification: palette.pinkA100,

        btnTextColor: palette.white,
        btnBgColor: palette.orange800,
        transparent: palette.transparent,
        demoColor0: palette.white,
        demoColor1: palette.orange800,
    },
};
