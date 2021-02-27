import * as React from "react";
import {useState} from "react";
import SettingsItem from "./SettingsItem";
import {I18nManager} from "react-native";
import {ELanguage, EThemes} from "../../constants";
import {restartApp} from '../../restart';
import BunnyConstants from "../../constants/constants";
import {useTranslation} from "react-i18next";
import {View} from "../../components/UI";
import {stFactory} from "../../providers/i18nLabor";
import getContainerStyles from "../../containers";
import {useSizeLabor} from "../../providers/sizeLabor";
import {useThemeLabor} from "../../providers/themeLabor";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
    const {t, i18n} = useTranslation();
    const st = stFactory(t, 'screens.Settings');
    const [language, setLanguage] = useState(i18n.language === ELanguage.zh)
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {theme, changeTheme} = themeLabor;
    return (
        <View style={containerStyles.screen}>
            <SettingsItem
                label={st(`darkTheme`)}
                value={theme.dark}
                onValueChange={async (value) => {
                    const themeName = value ? EThemes.dark : EThemes.light;
                    await AsyncStorage.setItem(BunnyConstants.THEME_NAME_PERSISTENCE_KEY, themeName)
                    changeTheme(themeName);
                }}
            />
            <SettingsItem label={st(`language`)}
                          value={language}
                          onValueChange={async (value) => {
                              const lang = value ? ELanguage.zh : ELanguage.en;
                              await i18n.changeLanguage(lang)
                              await AsyncStorage.setItem(BunnyConstants.LANGUAGE_TYPE_PERSISTENCE_KEY, lang);
                              setLanguage(lang === ELanguage.zh);
                          }}/>
            <SettingsItem
                label={st(`rightToLeft`)}
                value={I18nManager.isRTL}
                onValueChange={async () => {
                    I18nManager.forceRTL(!I18nManager.isRTL);
                    let timerMockAnimationComplete = BunnyConstants.fooTimeout;
                    timerMockAnimationComplete = setTimeout(() => {
                        try {
                            const res = restartApp();
                        } catch (err) {
                            //in case of using try catch expression,this err will be caught by fastRefresh tool
                        }
                        clearTimeout(timerMockAnimationComplete);
                    }, 300);
                }}
                // onValueChange={() => {
                //     I18nManager.forceRTL(!I18nManager.isRTL);
                //     restartApp()
                //         .then((res) => {
                //             console.log('---restartApp res', res)
                //         })
                //         .catch((err) => {
                //             // todo,in case of using .catch expression,this err will not be caught by fastRefresh tool
                //             console.error('---restartApp res', err)
                //         });
                // }}
            />

        </View>
    );
}
