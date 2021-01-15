import * as React from "react";
import {View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {DemoBitcoinStackParam, RootStackParam} from "../../../types/stacks";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {Text} from "../../../components/base-ui"
import containerStyle from "../../../containers/box";

type BitcoinHomeRouteProp = RouteProp<DemoBitcoinStackParam, 'BitcoinHome'>;
type BitcoinHomeNavigationProp = BottomTabNavigationProp<DemoBitcoinStackParam, 'BitcoinHome'>;
type BitcoinHomeProps = { route: BitcoinHomeRouteProp, navigation: BitcoinHomeNavigationProp }


export function BitcoinHomeScreen({route,navigation}:BitcoinHomeProps) {
    return (<View>
        <View style={containerStyle.box}>
            <Text>Demo Bitcoin Home</Text>
        </View>
    </View>);
}

export default BitcoinHomeScreen;
