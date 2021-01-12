import {DefaultTheme, DarkTheme,} from 'react-native-paper';
import * as React from "react";
import SettingsItem from "./SettingsItem";
import {useDispatch, useSelector} from "react-redux";
import {restoreAndSaveTheme} from "../../stores/sys/actions";
import {RootState} from "../../types/models";
import {View} from "react-native";
import styles from "./styles";

export default function SettingsScreen() {
    const sysState = useSelector((rootState: RootState) => rootState.sysState)
    const dispatch = useDispatch()
    const {theme} = sysState;
    return (
        <View style={styles.container}>
            <SettingsItem
                label="Dark theme"
                value={theme.dark}
                onValueChange={(value) => {
                    dispatch(restoreAndSaveTheme({theme: theme.dark ? DefaultTheme : DarkTheme}));
                }}
            />
        </View>

    );
}
