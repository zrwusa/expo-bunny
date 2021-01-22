import * as React from "react";
import {View, Text} from "../../../components/base-ui";
import containerStyle from "../../../containers";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../i18n/short-t";

export function TabHomeScreen() {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.TabHome';
    const st = stFactory(t, i18nPrefix);
    return (
        <View style={containerStyle.screen}>
            <View style={containerStyle.card}>
                <Text>{st(`title`)}</Text>
            </View>
        </View>
    );
}

export default TabHomeScreen;
