import * as React from "react";
import {View, Text, Button} from "../../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoNestedStackParam} from "../../../types/stacks";

type NestedHomeRouteProp = RouteProp<DemoNestedStackParam, 'NestedHome'>;
type NestedHomeNavigationProp = StackNavigationProp<DemoNestedStackParam, 'NestedHome'>;
type NestedHomeProps = { route: NestedHomeRouteProp, navigation: NestedHomeNavigationProp }

export function NestedHomeScreen({route, navigation}: NestedHomeProps) {
    return (<View>
        <Text>NestedHome</Text>
        <Button title="Go to nested settings" onPress={() => navigation.navigate('NestedSettings', {item: "001"})}/>
    </View>);
}


export default NestedHomeScreen;
