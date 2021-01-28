import color from "color";
import {pl} from "../utils";
import {fonts} from "./fonts";
import {Theme} from "../../types/styles";

export const DefaultTheme: Theme = {
    dark: false,
    roundness: 4,
    colors: {
        primary: pl.teal800,
        accent: pl.blue400,
        background: pl.grey200,
        surface: pl.white,
        error: pl.red600,
        text: pl.black,
        onBackground: pl.black,
        onSurface: pl.black,
        disabled: color(pl.black).alpha(0.26).rgb().string(),
        placeholder: color(pl.black).alpha(0.54).rgb().string(),
        backdrop: color(pl.black).alpha(0.5).rgb().string(),
        notification: pl.pinkA400,

        btnText: pl.white,
        btnBg: pl.teal400,
        transparent: pl.transparent,
    },
    fonts: {
        ...fonts,
    },
    animation: {
        scale: 1.0,
    },
    typography: {
        header: {
            fontFamily: fonts['regular'].fontFamily,
            fontSize: 24,
            fontWeight: 'bold',
        },
        body: {
            fontFamily: fonts['regular'].fontFamily,
            fontSize: 16,
        }
    },
};
