import {useThemeLabor} from "../../providers/theme-labor";
import * as React from "react";
import {useEffect, useState} from "react";
import {EThemes} from "../../constants";
import {PickerSelect} from "../UI";

export function ThemePicker() {
    const themeLabor = useThemeLabor();
    const {changeTheme, currentThemeName} = themeLabor;
    const [themeName, setThemeName] = useState(currentThemeName)
    const themeLabels = Object.keys(EThemes).map((themeName) => {
        return {label: themeName, value: themeName}
    })
    useEffect(() => {
        setThemeName(currentThemeName)
    }, [currentThemeName])

    return <PickerSelect
        value={themeName}
        placeholder={{label: 'Select ', value: ''}}
        onValueChange={async (itemValue) => {
            setThemeName(itemValue)
            if (itemValue) {
                await changeTheme(itemValue);
            }
        }}
        items={themeLabels}
    />
}
