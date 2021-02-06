import * as React from "react";
import {View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {DemoBitcoinStackParam} from "../../../types/stacks";
import {Text} from "../../../components/base-ui";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../lang/short-t";
import getContainerStyles from "../../../containers";
import {useSmartStyle} from "../../../styles/smart-style";

type BitcoinAlertRouteProp = RouteProp<DemoBitcoinStackParam, 'BitcoinAlert'>;
type BitcoinAlertNavigationProp = BottomTabNavigationProp<DemoBitcoinStackParam, 'BitcoinAlert'>;
export type BitcoinAlertProps = { route: BitcoinAlertRouteProp, navigation: BitcoinAlertNavigationProp }

function BitcoinAlertScreen({route, navigation}: BitcoinAlertProps) {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.BitcoinAlert';
    const st = stFactory(t, i18nPrefix);
    const smartStyle = useSmartStyle();
    const containerStyles = getContainerStyles(smartStyle);
    return (
        <View style={containerStyles.screen}>
            <View style={containerStyles.card}>
                <Text>{st(`title`)}</Text>
                <Text>{st(`paramIsPush`)}{route.params.isPush ? "true" : "false"}</Text>
            </View>
        </View>
    );
}

export default BitcoinAlertScreen;
