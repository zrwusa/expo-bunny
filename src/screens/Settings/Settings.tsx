import * as React from "react";
import SettingsItem from "./Item";
import {useTranslation} from "react-i18next";
import {View} from "../../components/UI";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {getContainerStyles} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {ThemePicker} from "../../components/ThemePicker";
import {LanguagePicker} from "../../components/LanguagePicker";

export default function SettingsScreen() {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.Settings');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    return (
        <View style={containerStyles.Screen}>
            <SettingsItem
                label={st(`changeTheme`)}
                renderPicker={ThemePicker}
            />
            <SettingsItem
                label={st(`changeLanguage`)}
                renderPicker={LanguagePicker}
            />
            {/*<SettingsItem*/}
            {/*    label={st(`rightToLeft`)}*/}
            {/*    renderPicker={RTLSwitch}*/}
            {/*/>*/}
        </View>
    );
}

