import * as React from "react";
import {View, Text} from "../../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {DemoTabStackParam} from "../../../types/stacks";
import containerStyle from "../../../containers/box";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../i18n/short-t";

type TabSettingsRouteProp = RouteProp<DemoTabStackParam, 'TabSettings'>;
type TabSettingsNavigationProp = BottomTabNavigationProp<DemoTabStackParam, 'TabSettings'>;
type TabSettingsProps = { route: TabSettingsRouteProp, navigation: TabSettingsNavigationProp }

export function TabSettingsScreen({route, navigation}: TabSettingsProps) {
    const {t} = useTranslation();
    const i18nPrefix = "screens.TabSettings";
    const st = stFactory(t, i18nPrefix);
    return (
        <View style={containerStyle.box}>
            <Text>{st(`title`)}</Text>
            <Text>{route.params.item}</Text>
        </View>
    );
}

export default TabSettingsScreen;
