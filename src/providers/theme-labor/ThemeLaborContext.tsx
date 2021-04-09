import * as React from "react";
import {ThemeLabor, ThemeName} from "../../types";
import {defaultTheme, themes} from "./theme";


const ThemeLaborContext = React.createContext<ThemeLabor>({
    theme: defaultTheme,
    themes: themes,
    changeTheme: (themeName: ThemeName) => {
    },
    sysColorSchemeName: 'light'
});
ThemeLaborContext.displayName = 'ThemeContext';
export {ThemeLaborContext}
