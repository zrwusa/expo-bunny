import * as React from "react";
import {View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {DemoBitcoinStackParam} from "../../../types/stacks";
import {Text} from "../../../components/base-ui";
import containerStyle from "../../../containers/box";
import {useTranslation} from "react-i18next";

type BitcoinAlertRouteProp = RouteProp<DemoBitcoinStackParam, 'BitcoinAlert'>;
type BitcoinAlertNavigationProp = BottomTabNavigationProp<DemoBitcoinStackParam, 'BitcoinAlert'>;
type BitcoinAlertProps = { route: BitcoinAlertRouteProp, navigation: BitcoinAlertNavigationProp }

export function BitcoinAlertScreen({route, navigation}: BitcoinAlertProps) {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.BitcoinAlert';
    return (
        <View>
            <View style={containerStyle.box}>
                <Text>{t(`${i18nPrefix}.title`)}</Text>
                <Text>{t(`${i18nPrefix}.labels.paramIsPush`)}{route.params.isPush ? "true" : "false"}</Text>
            </View>
        </View>
    );
}

export default BitcoinAlertScreen;
