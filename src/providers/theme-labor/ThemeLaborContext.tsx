import * as React from 'react';
import {ThemeLabor, ThemeName} from '../../types';
import {defaultTheme, themes} from './theme';
import {EThemes} from '../../constants';

export const ThemeLaborContext = React.createContext<ThemeLabor>({
    theme: defaultTheme,
    currentThemeName: EThemes.light,
    themes: themes,
    changeTheme: (themeName: ThemeName) => {
    },
    sysColorSchemeName: 'light'
});
ThemeLaborContext.displayName = 'ThemeContext';
