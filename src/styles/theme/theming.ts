import {createTheming} from "@callstack/react-theme-provider";
import {DefaultTheme} from "./DefaultTheme";
import {Theme} from "../../types/styles";

export const {ThemeProvider, withTheme, useTheme} = createTheming<Theme>(DefaultTheme as Theme);
