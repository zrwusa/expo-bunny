import * as React from "react";
import {View, Text, Button} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoNestedStackParam} from "../../../types/stacks";

type NestedSettingsRouteProp = RouteProp<DemoNestedStackParam, 'NestedSettings'>;
type NestedSettingsNavigationProp = StackNavigationProp<DemoNestedStackParam, 'NestedSettings'>;
type NestedSettingsProps = { route: NestedSettingsRouteProp, navigation: NestedSettingsNavigationProp }
export function NestedSettingsScreen({route, navigation}: NestedSettingsProps) {
    return (<View>
        <Text>NestedSettings</Text>
        <Text>{route.params.item}</Text>
        <Button title="Go to nested home" onPress={() => navigation.navigate('NestedHome')}/>
    </View>);
}

export default NestedSettingsScreen;
