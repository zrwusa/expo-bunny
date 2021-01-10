import * as React from "react";
import {View, Text, Button} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {DemoBitcoinStackParam, RootStackParam} from "../../../types/stacks";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {StackNavigationProp} from "@react-navigation/stack";

type BitcoinHomeRouteProp = RouteProp<DemoBitcoinStackParam, 'BitcoinHome'>;
type BitcoinHomeNavigationProp = BottomTabNavigationProp<DemoBitcoinStackParam, 'BitcoinHome'>;
type BitcoinHomeProps = { route: BitcoinHomeRouteProp, navigation: BitcoinHomeNavigationProp }


export function BitcoinHomeScreen({route,navigation}:BitcoinHomeProps) {
    return (<View>
        <Text>Demo Bitcoin Home</Text>
        {/*<Text>DemoBitcoin params from root route{routeRoot.params}</Text>*/}
        {/*<Button title="Go to Bitcoin Alert" onPress={()=>navigation.navigate('BitcoinAlert',{cate:'ETH'})} />*/}
        {/*<Button title="Go to Demo Map" onPress={()=>navigationRoot.navigate('DemoMap')} />*/}
    </View>);
}

export default BitcoinHomeScreen;
