import * as React from "react";
import {View, Text} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {DemoTabStackParam} from "../../../types/stacks";

type TabSettingsRouteProp = RouteProp<DemoTabStackParam, 'TabSettings'>;
type TabSettingsNavigationProp = BottomTabNavigationProp<DemoTabStackParam, 'TabSettings'>;
type TabSettingsProps = { route: TabSettingsRouteProp, navigation: TabSettingsNavigationProp }
export function TabSettingsScreen({route, navigation}: TabSettingsProps) {
    return (<View>
        <Text>TabSettings</Text>
        <Text>{route.params.item}</Text>
    </View>);
}

export default TabSettingsScreen;
