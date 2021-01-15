import * as React from "react";
import {View, Text, Button} from "../../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoNestedStackParam} from "../../../types/stacks";
import containerStyle from "../../../containers/box";

type NestedSettingsRouteProp = RouteProp<DemoNestedStackParam, 'NestedSettings'>;
type NestedSettingsNavigationProp = StackNavigationProp<DemoNestedStackParam, 'NestedSettings'>;
type NestedSettingsProps = { route: NestedSettingsRouteProp, navigation: NestedSettingsNavigationProp }

export function NestedSettingsScreen({route, navigation}: NestedSettingsProps) {
    return (
        <View>
            <View style={containerStyle.box}>
                <Text>{route.params.item}</Text>
                <Button title="Go to nested home" onPress={() => navigation.navigate('NestedHome')}/>
            </View>
        </View>);
}

export default NestedSettingsScreen;
