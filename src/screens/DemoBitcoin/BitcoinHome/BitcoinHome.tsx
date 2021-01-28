import * as React from "react";
import {View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {DemoBitcoinStackParam} from "../../../types/stacks";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {Text} from "../../../components/base-ui"
import containerStyle from "../../../containers";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../lang/short-t";

type BitcoinHomeRouteProp = RouteProp<DemoBitcoinStackParam, 'BitcoinHome'>;
type BitcoinHomeNavigationProp = BottomTabNavigationProp<DemoBitcoinStackParam, 'BitcoinHome'>;
export type BitcoinHomeProps = { route: BitcoinHomeRouteProp, navigation: BitcoinHomeNavigationProp }


function BitcoinHomeScreen({route, navigation}: BitcoinHomeProps) {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.BitcoinHome'
    const st = stFactory(t, i18nPrefix);

    return (
        <View style={containerStyle.screen}>
            <View style={containerStyle.card}>
                <Text>{st(`title`)}</Text>
            </View>
        </View>
    );
}

export default BitcoinHomeScreen;
