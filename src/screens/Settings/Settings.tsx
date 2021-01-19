import * as React from "react";
import SettingsItem from "./SettingsItem";
import {useDispatch, useSelector} from "react-redux";
import {restoreAndSaveTheme} from "../../stores/sys/actions";
import {RootState} from "../../types/models";
import {I18nManager, View} from "react-native";
import styles from "./styles";
import {EThemes} from "../../types/enums";
import {restartApp} from '../../restart';
import BunnyConstants from "../../common/constants";

export default function SettingsScreen() {
    const sysState = useSelector((rootState: RootState) => rootState.sysState)
    const dispatch = useDispatch()
    const {themeName} = sysState;

    return (
        <View style={styles.container}>
            <SettingsItem
                label="Dark theme"
                value={themeName === EThemes.dark}
                onValueChange={(value) => {
                    debugger
                    dispatch(restoreAndSaveTheme({themeName: value ? EThemes.dark : EThemes.default}));
                }}
            />
            <SettingsItem
                label="Right to left"
                value={I18nManager.isRTL}
                // onValueChange={() => {
                //     I18nManager.forceRTL(!I18nManager.isRTL);
                //     restartApp()
                //         .then((res) => {
                //             console.log('---restartApp res', res)
                //         })
                //         .catch((err) => {
                //             //in case of using .catch expression,this err will not be caught by fastRefresh tool
                //             console.error('---restartApp res', err)
                //         });
                // }}
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
            />

        </View>
    );
}
