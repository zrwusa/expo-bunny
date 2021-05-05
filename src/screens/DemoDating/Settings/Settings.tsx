import * as React from "react";
import {Text, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {DemoDatingTabStackParam} from "../../../types";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {getContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {getSharedStyles} from "../../../helpers/shared-styles";

type DatingSettingsRouteProp = RouteProp<DemoDatingTabStackParam, 'DatingSettings'>;
type DatingSettingsNavigationProp = BottomTabNavigationProp<DemoDatingTabStackParam, 'DatingSettings'>;

export interface DatingSettingsProps {
    route: DatingSettingsRouteProp,
    navigation: DatingSettingsNavigationProp
}

function DatingSettingsScreen({route, navigation}: DatingSettingsProps) {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.DatingSettings');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    return (
        <View style={[containerStyles.Screen, sharedStyles.centralized]}>
            <Text>{st(`title`)}</Text>
        </View>
    );
}

export default DatingSettingsScreen;
