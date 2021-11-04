import {useThemeLabor} from '../../providers';
import {EThemes} from '../../constants';
import * as React from 'react';
import {SwitchP} from '../UI';
import {ThemeName} from '../../types';

export function ThemeSwitch() {
    const {theme, changeTheme} = useThemeLabor();
    return <SwitchP value={theme.dark} onValueChange={async (value) => {
        const themeName: ThemeName = value ? EThemes.dark : EThemes.light;
        if (changeTheme) {
            changeTheme(themeName);
        }
    }}/>;
}
