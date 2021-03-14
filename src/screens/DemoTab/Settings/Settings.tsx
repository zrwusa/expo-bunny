import * as React from "react";
import {Text, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {DemoTabStackParam} from "../../../types";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../../providers/i18n-labor";
import {Card, createContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";

type TabSettingsRouteProp = RouteProp<DemoTabStackParam, 'TabSettings'>;
type TabSettingsNavigationProp = BottomTabNavigationProp<DemoTabStackParam, 'TabSettings'>;

export interface TabSettingsProps {
    route: TabSettingsRouteProp,
    navigation: TabSettingsNavigationProp
}

function TabSettingsScreen({route, navigation}: TabSettingsProps) {
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.TabSettings');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = createContainerStyles(sizeLabor, themeLabor);

    return (
        <View style={containerStyles.Screen}>
            <Card title={st(`title`)}>
                <Text>{route.params.item}</Text>
            </Card>
        </View>
    );
}

export default TabSettingsScreen;
