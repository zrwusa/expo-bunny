import * as React from "react";
import SettingsItem from "./SettingsItem";
import {useDispatch, useSelector} from "react-redux";
import {restoreAndSaveLanguage, restoreAndSaveTheme} from "../../stores/sys/actions";
import {RootState} from "../../types/models";
import {I18nManager} from "react-native";
import {ELanguage, EThemes} from "../../utils/constants";
import {restartApp} from '../../restart';
import BunnyConstants from "../../utils/constants";
import {useTranslation} from "react-i18next";
import {View} from "../../components/base-ui";
import {stFactory} from "../../lang/short-t";
import getContainerStyles from "../../containers";

export default function SettingsScreen() {
    const {t, i18n} = useTranslation();
    const st = stFactory(t, 'screens.Settings');
    const sysState = useSelector((rootState: RootState) => rootState.sysState)
    const dispatch = useDispatch()
    const {themeName, language} = sysState;
    const containerStyles = getContainerStyles()

    return (
        <View style={containerStyles.screen}>
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
