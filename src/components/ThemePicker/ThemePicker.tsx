import {useThemeLabor} from "../../providers/theme-labor";
import * as React from "react";
import {EThemes} from "../../constants";
import {PickerSelect} from "../UI";
import {ThemeName} from "../../types";
import {PickerSelectProps} from "react-native-picker-select";

export const ThemePicker: React.FC<Omit<PickerSelectProps, 'onValueChange' | 'items'>> = ({...rest}) => {
    const themeLabor = useThemeLabor();
    const {changeTheme, currentThemeName} = themeLabor;
    const {theme} = themeLabor;
    const {colors} = theme;

    const themeLabels = Object.keys(EThemes).map((themeName) => {
        return {label: themeName, value: themeName, color: colors.text}
    })

    const handleValueChange = async (itemValue: ThemeName) => {
        console.log('---4?handleValueChange', itemValue)
        // todo always be invoked 4 times
        if (itemValue) {
            await changeTheme(itemValue);
        }
    }

    return <PickerSelect
        value={currentThemeName}
        placeholder={{label: 'Select ', value: '', color: colors.text}}
        onValueChange={handleValueChange}
        items={themeLabels}
        {...rest}
    />
}
