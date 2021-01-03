import * as React from "react";
import {View, Text} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoTabStackParam, RootStackParam} from "../../types/stacks";
import { DemoTabStack } from "../../stacks/DemoTab";


type DemoTabRouteProp = RouteProp<RootStackParam, 'DemoTab'>;
type DemoTabNavigationProp = StackNavigationProp<RootStackParam, 'DemoTab'>;

type Props = { route: DemoTabRouteProp; navigation: DemoTabNavigationProp; };

function TabHome() {
    return (<View>
        <Text>TabHome</Text>
    </View>);
}

type TabSettingsRouteProp = RouteProp<DemoTabStackParam, 'TabSettings'>;
type TabSettingsNavigationProp = StackNavigationProp<DemoTabStackParam, 'TabSettings'>;
type TabSettingsProps = { route: TabSettingsRouteProp, navigation: TabSettingsNavigationProp }

function TabSettings({route, navigation}: TabSettingsProps) {
    return (<View>
        <Text>TabSettings</Text>
        <Text>{route.params.item}</Text>
    </View>);
}



function DemoTabScreen({route, navigation}: Props) {
    return (
        <DemoTabStack.Navigator>
            <DemoTabStack.Screen name="TabHome" component={TabHome}/>
            <DemoTabStack.Screen name="TabSettings" component={TabSettings} initialParams={{"item": "item-001"}}/>
        </DemoTabStack.Navigator>
    );
}

export default DemoTabScreen;
