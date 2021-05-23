import * as React from "react";
import SettingsItem from "./Item";
import {View} from "../../components/UI";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {getContainerStyles} from "../../containers";
import {ThemePicker} from "../../components/ThemePicker";
import {LanguagePicker} from "../../components/LanguagePicker";
import {useBunnyKit} from "../../hooks/bunny-kit";

export default function SettingsScreen() {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.Settings');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    return (
        <View style={containerStyles.Screen}>

            <SettingsItem
                label={st(`changeTheme`)}
                renderPicker={() => <ThemePicker/>}
            />
            <SettingsItem
                label={st(`changeLanguage`)}
                renderPicker={() => <LanguagePicker/>}
            />
            {/*<SettingsItem*/}
            {/*    label={st(`rightToLeft`)}*/}
            {/*    renderPicker={RTLSwitch}*/}
            {/*/>*/}
        </View>
    );
}

