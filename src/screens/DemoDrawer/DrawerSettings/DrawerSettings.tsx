import * as React from "react";
import {View, Text} from "../../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {DemoDrawerStackParam} from "../../../types/stacks";
import containerStyle from "../../../containers";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../lang/short-t";

type DrawerSettingsRouteProp = RouteProp<DemoDrawerStackParam, 'DrawerSettings'>;
type DrawerSettingsNavigationProp = DrawerNavigationProp<DemoDrawerStackParam, 'DrawerSettings'>;
export type DrawerSettingsProps = { route: DrawerSettingsRouteProp, navigation: DrawerSettingsNavigationProp }

function DrawerSettingsScreen({route, navigation}: DrawerSettingsProps) {
    const {t} = useTranslation();
    const i18nPrefix = "screens.DrawerSettings";
    const st = stFactory(t, i18nPrefix);
    return (
        <View style={containerStyle.screen}>
            <View style={containerStyle.card}>
                <Text>{st(`title`)}</Text>
                <Text>{route.params.item}</Text>
            </View>
        </View>
    );
}

export default DrawerSettingsScreen;
