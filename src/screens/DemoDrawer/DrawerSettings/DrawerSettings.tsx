import * as React from "react";
import {Text, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {DrawerNavigationProp} from "react-navigation-drawer-no-warnings";
import {DemoDrawerStackParam} from "../../../types";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../providers/i18nLabor";
import getContainerStyles from "../../../containers";
import {useSizeLabor} from "../../../providers/sizeLabor";
import {useThemeLabor} from "../../../providers/themeLabor";

type DrawerSettingsRouteProp = RouteProp<DemoDrawerStackParam, 'DrawerSettings'>;
type DrawerSettingsNavigationProp = DrawerNavigationProp<DemoDrawerStackParam, 'DrawerSettings'>;
export type DrawerSettingsProps = { route: DrawerSettingsRouteProp, navigation: DrawerSettingsNavigationProp }

function DrawerSettingsScreen({route, navigation}: DrawerSettingsProps) {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.DrawerSettings');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    return (
        <View style={containerStyles.screen}>
            <View style={containerStyles.card}>
                <Text>{st(`title`)}</Text>
                <Text>{route.params.item}</Text>
            </View>
        </View>
    );
}

export default DrawerSettingsScreen;
