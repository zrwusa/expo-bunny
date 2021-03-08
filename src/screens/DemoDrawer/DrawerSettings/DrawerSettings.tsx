import * as React from "react";
import {Text, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {DrawerNavigationProp} from "react-navigation-drawer-no-warnings";
import {DemoDrawerStackParam} from "../../../types";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../../providers/i18n-labor";
import {getContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";

type DrawerSettingsRouteProp = RouteProp<DemoDrawerStackParam, 'DrawerSettings'>;
type DrawerSettingsNavigationProp = DrawerNavigationProp<DemoDrawerStackParam, 'DrawerSettings'>;

export interface DrawerSettingsProps {
    route: DrawerSettingsRouteProp,
    navigation: DrawerSettingsNavigationProp
}

function DrawerSettingsScreen({route, navigation}: DrawerSettingsProps) {
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.DrawerSettings');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    return (
        <View style={containerStyles.Screen}>
            <View style={containerStyles.Card}>
                <Text>{st(`title`)}</Text>
                <Text>{route.params.item}</Text>
            </View>
        </View>
    );
}

export default DrawerSettingsScreen;
