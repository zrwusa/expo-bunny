import * as React from "react";
import {ThemeProviderProps, Theme} from "../../types/styles";
import {ThemeContext} from "./ThemeContext";
import {getThemes} from "./theme";

const themes = getThemes();
const defaultTheme = themes.default as unknown as Theme;

function ThemeProvider(props: ThemeProviderProps): JSX.Element {
    const {children, theme} = props;
    return (
        <ThemeContext.Provider value={theme || defaultTheme}>
            {children}
        </ThemeContext.Provider>
    );
}

export {ThemeProvider};
