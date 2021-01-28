import color from "color";
import {DefaultTheme} from "./DefaultTheme";
import {pl} from "../utils";
import {Theme} from "../../types/styles";

export const DarkTheme: Theme = {
    ...DefaultTheme,
    dark: true,
    mode: 'adaptive',
    colors: {
        ...DefaultTheme.colors,
        primary: pl.purple400,
        accent: pl.tealA700,
        background: pl.black900,
        surface: pl.black900,
        error: pl.pink300,
        onBackground: pl.white,
        onSurface: pl.white,
        text: pl.white,
        disabled: color(pl.white).alpha(0.38).rgb().string(),
        placeholder: color(pl.white).alpha(0.54).rgb().string(),
        backdrop: color(pl.black).alpha(0.5).rgb().string(),
        notification: pl.pinkA100,

        btnText: pl.white,
        btnBg: pl.orange800,
        transparent: pl.transparent,
    },
};
