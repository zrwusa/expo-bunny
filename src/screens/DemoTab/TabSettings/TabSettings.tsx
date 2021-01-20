import * as React from "react";
import {View, Text} from "../../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {DemoTabStackParam} from "../../../types/stacks";
import containerStyle from "../../../containers/box";
import {useTranslation} from "react-i18next";

type TabSettingsRouteProp = RouteProp<DemoTabStackParam, 'TabSettings'>;
type TabSettingsNavigationProp = BottomTabNavigationProp<DemoTabStackParam, 'TabSettings'>;
type TabSettingsProps = { route: TabSettingsRouteProp, navigation: TabSettingsNavigationProp }

export function TabSettingsScreen({route, navigation}: TabSettingsProps) {
    const {t} = useTranslation()
    const i18nPrefix = "screens.TabSettings"
    return (<View>
        <View style={containerStyle.box}>
            <Text>{t(`${i18nPrefix}.title`)}</Text>
            <Text>{route.params.item}</Text>
        </View>
    </View>);
}

export default TabSettingsScreen;
