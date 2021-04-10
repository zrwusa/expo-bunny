import * as React from "react";
import {ThemeLabor, ThemeName} from "../../types";
import {defaultTheme, themes} from "./theme";
import {EThemes} from "../../constants";


const ThemeLaborContext = React.createContext<ThemeLabor>({
    theme: defaultTheme,
    currentThemeName: EThemes.light,
    themes: themes,
    changeTheme: (themeName: ThemeName) => {
        console.log('---themeName in context', themeName)
    },
    sysColorSchemeName: 'light'
});
ThemeLaborContext.displayName = 'ThemeContext';
export {ThemeLaborContext}
