import * as React from "react";
import {View, Text} from "../../../components/base-ui";
import containerStyle from "../../../containers/box";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../i18n/short-t";

export function DrawerHomeScreen() {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.DrawerHome';
    const st = stFactory(t, i18nPrefix);
    return (
        <View style={containerStyle.box}>
            <Text>{st(`title`)}</Text>
        </View>
    );
}

export default DrawerHomeScreen;
