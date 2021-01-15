import * as React from "react";
import {View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {DemoBitcoinStackParam} from "../../../types/stacks";
import {Text} from "../../../components/base-ui";
import containerStyle from "../../../containers/box";

type BitcoinAlertRouteProp = RouteProp<DemoBitcoinStackParam, 'BitcoinAlert'>;
type BitcoinAlertNavigationProp = BottomTabNavigationProp<DemoBitcoinStackParam, 'BitcoinAlert'>;
type BitcoinAlertProps = { route: BitcoinAlertRouteProp, navigation: BitcoinAlertNavigationProp }

export function BitcoinAlertScreen({route, navigation}: BitcoinAlertProps) {
    return (<View>
        <View style={containerStyle.box}>
            <Text>Bitcoin Alert Screen</Text>
            <Text>{route.params.isPush?"true":"false"}</Text>
        </View>
    </View>);
}

export default BitcoinAlertScreen;
