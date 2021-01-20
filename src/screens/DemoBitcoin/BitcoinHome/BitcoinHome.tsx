import * as React from "react";
import {View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {DemoBitcoinStackParam, RootStackParam} from "../../../types/stacks";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {Text} from "../../../components/base-ui"
import containerStyle from "../../../containers/box";
import {useTranslation} from "react-i18next";

type BitcoinHomeRouteProp = RouteProp<DemoBitcoinStackParam, 'BitcoinHome'>;
type BitcoinHomeNavigationProp = BottomTabNavigationProp<DemoBitcoinStackParam, 'BitcoinHome'>;
type BitcoinHomeProps = { route: BitcoinHomeRouteProp, navigation: BitcoinHomeNavigationProp }


export function BitcoinHomeScreen({route, navigation}: BitcoinHomeProps) {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.BitcoinHome'
    return (
        <View>
            <View style={containerStyle.box}>
                <Text>{t(`${i18nPrefix}.title`)}</Text>
            </View>
        </View>
    );
}

export default BitcoinHomeScreen;
