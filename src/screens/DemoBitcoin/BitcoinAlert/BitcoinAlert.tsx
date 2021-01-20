import * as React from "react";
import {View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {DemoBitcoinStackParam} from "../../../types/stacks";
import {Text} from "../../../components/base-ui";
import containerStyle from "../../../containers/box";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../i18n/short-t";

type BitcoinAlertRouteProp = RouteProp<DemoBitcoinStackParam, 'BitcoinAlert'>;
type BitcoinAlertNavigationProp = BottomTabNavigationProp<DemoBitcoinStackParam, 'BitcoinAlert'>;
type BitcoinAlertProps = { route: BitcoinAlertRouteProp, navigation: BitcoinAlertNavigationProp }

export function BitcoinAlertScreen({route, navigation}: BitcoinAlertProps) {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.BitcoinAlert';
    const st = stFactory(t, i18nPrefix);
    return (
        <View>
            <View style={containerStyle.box}>
                <Text>{st(`title`)}</Text>
                <Text>{st(`paramIsPush`)}{route.params.isPush ? "true" : "false"}</Text>
            </View>
        </View>
    );
}

export default BitcoinAlertScreen;
