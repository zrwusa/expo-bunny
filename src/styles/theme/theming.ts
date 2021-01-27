import {createTheming} from "@callstack/react-theme-provider";
import {Theme} from "../../types/styles";
import {defaultTheme} from "./theme";

export const {ThemeProvider, withTheme, useTheme} = createTheming<Theme>(defaultTheme);
