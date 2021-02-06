import * as React from "react";
import {View, Text} from "../../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {DemoTabStackParam} from "../../../types/stacks";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../lang/short-t";
import getContainerStyles from "../../../containers";
import {useSmartStyle} from "../../../styles/smart-style";

type TabSettingsRouteProp = RouteProp<DemoTabStackParam, 'TabSettings'>;
type TabSettingsNavigationProp = BottomTabNavigationProp<DemoTabStackParam, 'TabSettings'>;
export type TabSettingsProps = { route: TabSettingsRouteProp, navigation: TabSettingsNavigationProp }

function TabSettingsScreen({route, navigation}: TabSettingsProps) {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.TabSettings');
    const smartStyle = useSmartStyle();
    const containerStyles = getContainerStyles(smartStyle);

    return (
        <View style={containerStyles.screen}>
            <View style={containerStyles.card}>
                <Text>{st(`title`)}</Text>
                <Text>{route.params.item}</Text>
            </View>
        </View>
    );
}

export default TabSettingsScreen;
