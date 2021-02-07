import * as React from "react";
import {View, Text} from "../../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {DrawerNavigationProp} from "react-navigation-drawer-no-warnings";
import {DemoDrawerStackParam} from "../../../types/stacks";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../lang/short-t";
import getContainerStyles from "../../../containers";
import {useSizer} from "../../../styles/sizer";
import {useTheme} from "../../../styles/theme";

type DrawerSettingsRouteProp = RouteProp<DemoDrawerStackParam, 'DrawerSettings'>;
type DrawerSettingsNavigationProp = DrawerNavigationProp<DemoDrawerStackParam, 'DrawerSettings'>;
export type DrawerSettingsProps = { route: DrawerSettingsRouteProp, navigation: DrawerSettingsNavigationProp }

function DrawerSettingsScreen({route, navigation}: DrawerSettingsProps) {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.DrawerSettings');
    const sizer = useSizer();
    const theme = useTheme();
    const containerStyles = getContainerStyles(sizer, theme);
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
