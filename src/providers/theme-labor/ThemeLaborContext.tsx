import * as React from "react";
import {ThemeLabor, ThemeName} from "../../types";
import {defaultTheme} from "./theme";


const ThemeLaborContext = React.createContext<ThemeLabor>({
    theme: defaultTheme,
    changeTheme: (themeName: ThemeName) => {
    },
    sysColorSchemeName: 'light'
});
ThemeLaborContext.displayName = 'ThemeContext';
export {ThemeLaborContext}
