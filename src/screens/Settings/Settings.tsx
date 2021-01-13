import * as React from "react";
import SettingsItem from "./SettingsItem";
import {useDispatch, useSelector} from "react-redux";
import {restoreAndSaveTheme} from "../../stores/sys/actions";
import {RootState} from "../../types/models";
import {View} from "react-native";
import styles from "./styles";
import {EThemes} from "../../types/enums";

export default function SettingsScreen() {
    const sysState = useSelector((rootState: RootState) => rootState.sysState)
    const dispatch = useDispatch()
    const {themeName} = sysState;
    return (
        <View style={styles.container}>
            <SettingsItem
                label="Dark theme"
                value={themeName===EThemes.DARK}
                onValueChange={(value) => {
                    dispatch(restoreAndSaveTheme({themeName: value ? EThemes.DARK : EThemes.DEFAULT}));
                }}
            />
        </View>
    );
}
