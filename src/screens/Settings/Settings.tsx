import * as React from "react";
import SettingsItem from "./SettingsItem";
import {useDispatch, useSelector} from "react-redux";
import {restoreAndSaveTheme} from "../../stores/sys/actions";
import {RootState} from "../../types/models";
import {I18nManager} from "react-native";
import styles from "./styles";
import {EThemes} from "../../types/enums";
import {restartApp} from '../../restart';
import BunnyConstants from "../../common/constants";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {View, Text} from "../../components/base-ui";

export default function SettingsScreen() {
    const [lang, setLang] = useState(false);
    const {t, i18n} = useTranslation();
    const sysState = useSelector((rootState: RootState) => rootState.sysState)
    const dispatch = useDispatch()
    const {themeName} = sysState;

    return (
        <View style={styles.container}>
            <SettingsItem
                label={t('settings.dark_theme')}
                value={themeName === EThemes.dark}
                onValueChange={(value) => {
                    dispatch(restoreAndSaveTheme({themeName: value ? EThemes.dark : EThemes.default}));
                }}
            />
            <SettingsItem label={t('settings.language')}
                          value={lang}
                          onValueChange={(value) => {
                              let lang = value ? "zh" : "en";
                              i18n.changeLanguage(lang).then(() => {
                                  setLang(value)
                              })
                          }}/>
            <SettingsItem
                label={t('settings.right_to_left')}
                value={I18nManager.isRTL}

                onValueChange={async () => {
                    I18nManager.forceRTL(!I18nManager.isRTL);
                    let timerMockAnimationComplete = BunnyConstants.fooTimeout;
                    timerMockAnimationComplete = setTimeout(() => {
                        try {
                            const res = restartApp();
                            console.log('---restartApp res', res)
                        } catch (err) {
                            //in case of using try catch expression,this err will be caught by fastRefresh tool
                            console.error('---restartApp res', err)
                        }
                        clearTimeout(timerMockAnimationComplete);
                    }, 6000);
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
