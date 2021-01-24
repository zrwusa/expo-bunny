import * as React from "react";
import SettingsItem from "./SettingsItem";
import {useDispatch, useSelector} from "react-redux";
import {restoreAndSaveLanguage, restoreAndSaveTheme} from "../../stores/sys/actions";
import {RootState} from "../../types/models";
import {I18nManager} from "react-native";
import {ELanguage, EThemes} from "../../common/constants";
import {restartApp} from '../../restart';
import BunnyConstants from "../../common/constants";
import {useTranslation} from "react-i18next";
import {View} from "../../components/base-ui";
import {stFactory} from "../../i18n/short-t";
import containerStyle from "../../containers";

export default function SettingsScreen() {
    const {t, i18n} = useTranslation();
    const i18nPrefix = 'screens.Settings';
    const st = stFactory(t, i18nPrefix);
    const sysState = useSelector((rootState: RootState) => rootState.sysState)
    const dispatch = useDispatch()
    const {themeName, language} = sysState;

    return (
        <View style={containerStyle.screen}>
            <SettingsItem
                label={st(`darkTheme`)}
                value={themeName === EThemes.dark}
                onValueChange={(value) => {
                    dispatch(restoreAndSaveTheme({themeName: value ? EThemes.dark : EThemes.default}));
                }}
            />
            <SettingsItem label={st(`language`)}
                          value={language === ELanguage.zh}
                          onValueChange={(value) => {
                              const lang = value ? ELanguage.zh : ELanguage.en;
                              i18n.changeLanguage(lang).then(() => undefined)
                              dispatch(restoreAndSaveLanguage({language: lang}));
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
