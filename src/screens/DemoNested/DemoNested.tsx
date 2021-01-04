import * as React from "react";
import {View, Text, Button} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoNestedStackParam, RootStackParam} from "../../types/stacks";
import { DemoNestedStack } from "../../stacks/DemoNested";

type NestedHomeRouteProp = RouteProp<DemoNestedStackParam, 'NestedHome'>;
type NestedHomeNavigationProp = StackNavigationProp<DemoNestedStackParam, 'NestedHome'>;
type NestedHomeProps = { route: NestedHomeRouteProp, navigation: NestedHomeNavigationProp }
function NestedHome({route,navigation}:NestedHomeProps) {
    return (<View>
        <Text>NestedHome</Text>
        <Button title="Go to nested settings" onPress={() => navigation.navigate('NestedSettings',{item:"dd"})}/>
    </View>);
}

type NestedSettingsRouteProp = RouteProp<DemoNestedStackParam, 'NestedSettings'>;
type NestedSettingsNavigationProp = StackNavigationProp<DemoNestedStackParam, 'NestedSettings'>;
type NestedSettingsProps = { route: NestedSettingsRouteProp, navigation: NestedSettingsNavigationProp }
function NestedSettings({route, navigation}: NestedSettingsProps) {
    return (<View>
        <Text>NestedSettings</Text>
        <Text>{route.params.item}</Text>
        <Button title="Go to nested home" onPress={() => navigation.navigate('NestedHome')}/>
    </View>);
}

type DemoNestedRouteProp = RouteProp<RootStackParam, 'DemoNested'>;
type DemoNestedNavigationProp = StackNavigationProp<RootStackParam, 'DemoNested'>;
type Props = { route: DemoNestedRouteProp; navigation: DemoNestedNavigationProp; };
function DemoNestedScreen({route, navigation}: Props) {
    return (
        <DemoNestedStack.Navigator>
            <DemoNestedStack.Screen name="NestedHome" component={NestedHome}/>
            <DemoNestedStack.Screen name="NestedSettings" component={NestedSettings} initialParams={{"item": "item-001"}}/>
        </DemoNestedStack.Navigator>
    );
}

export default DemoNestedScreen;
