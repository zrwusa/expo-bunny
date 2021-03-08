import * as React from "react";
import {View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {DemoBitcoinStackParam} from "../../../types";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {Text} from "../../../components/UI"
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../../providers/i18n-labor";
import {getContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";

type BitcoinHomeRouteProp = RouteProp<DemoBitcoinStackParam, 'BitcoinHome'>;
type BitcoinHomeNavigationProp = BottomTabNavigationProp<DemoBitcoinStackParam, 'BitcoinHome'>;

export interface BitcoinHomeProps {
    route: BitcoinHomeRouteProp,
    navigation: BitcoinHomeNavigationProp
}


function BitcoinHomeScreen({route, navigation}: BitcoinHomeProps) {
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.BitcoinHome');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    return (
        <View style={containerStyles.Screen}>
            <View style={containerStyles.Card}>
                <Text>{st(`title`)}</Text>
            </View>
        </View>
    );
}

export default BitcoinHomeScreen;
