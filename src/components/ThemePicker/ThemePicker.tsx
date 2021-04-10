import {useThemeLabor} from "../../providers/theme-labor";
import * as React from "react";
import {EThemes} from "../../constants";
import {PickerSelect} from "../UI";
import {ThemeName} from "../../types";

export function ThemePicker() {
    const themeLabor = useThemeLabor();
    const {changeTheme, currentThemeName} = themeLabor;

    const themeLabels = Object.keys(EThemes).map((themeName) => {
        return {label: themeName, value: themeName}
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
        placeholder={{label: 'Select ', value: ''}}
        onValueChange={handleValueChange}
        items={themeLabels}
    />
}
