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
import {View} from "../../components/base-ui";
import {stFactory} from "../../i18n/short-t";

export default function SettingsScreen() {
    const [lang, setLang] = useState(false);
    const {t, i18n} = useTranslation();
    const i18nPrefix = 'screens.Settings';
    const st = stFactory(t, i18nPrefix);
    const sysState = useSelector((rootState: RootState) => rootState.sysState)
    const dispatch = useDispatch()
    const {themeName} = sysState;

    return (
        <View style={styles.container}>
            <SettingsItem
                label={st(`darkTheme`)}
                value={themeName === EThemes.dark}
                onValueChange={(value) => {
                    dispatch(restoreAndSaveTheme({themeName: value ? EThemes.dark : EThemes.default}));
                }}
            />
            <SettingsItem label={st(`language`)}
                          value={lang}
                          onValueChange={(value) => {
                              let lang = value ? "zh" : "en";
                              i18n.changeLanguage(lang).then(() => {
                                  setLang(value)
                              })
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
