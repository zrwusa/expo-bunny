import * as React from "react";
import {Theme} from "../../types/styles";
import {getThemes} from "./theme";

const themes = getThemes();
const defaultTheme = themes.default as unknown as Theme;

export const ThemeContext = React.createContext<Theme>(defaultTheme);
