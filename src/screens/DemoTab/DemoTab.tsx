import * as React from "react";
import {View, Text} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {DemoTabStackParam, RootStackParam} from "../../types/stacks";
import { DemoTabStack } from "../../stacks/DemoTab";

type DemoTabRouteProp = RouteProp<RootStackParam, 'DemoTab'>;
type DemoTabNavigationProp = BottomTabNavigationProp<RootStackParam, 'DemoTab'>;
type Props = { route: DemoTabRouteProp; navigation: DemoTabNavigationProp; };
function DemoTabScreen({route, navigation}: Props) {
    return (
        <DemoTabStack.Navigator>
            <DemoTabStack.Screen name="TabHome" component={TabHome}/>
            <DemoTabStack.Screen name="TabSettings" component={TabSettings} initialParams={{"item": "item-001"}}/>
        </DemoTabStack.Navigator>
    );
}

function TabHome() {
    return (<View>
        <Text>TabHome</Text>
    </View>);
}

type TabSettingsRouteProp = RouteProp<DemoTabStackParam, 'TabSettings'>;
type TabSettingsNavigationProp = BottomTabNavigationProp<DemoTabStackParam, 'TabSettings'>;
type TabSettingsProps = { route: TabSettingsRouteProp, navigation: TabSettingsNavigationProp }
function TabSettings({route, navigation}: TabSettingsProps) {
    return (<View>
        <Text>TabSettings</Text>
        <Text>{route.params.item}</Text>
    </View>);
}





export default DemoTabScreen;
