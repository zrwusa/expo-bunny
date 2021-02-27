import * as React from "react";
import {Text, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {DemoTabStackParam} from "../../../types";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../providers/i18nLabor";
import getContainerStyles from "../../../containers";
import {useSizeLabor} from "../../../providers/sizeLabor";
import {useThemeLabor} from "../../../providers/themeLabor";
import {Card} from "../../../containers/Card";

type TabSettingsRouteProp = RouteProp<DemoTabStackParam, 'TabSettings'>;
type TabSettingsNavigationProp = BottomTabNavigationProp<DemoTabStackParam, 'TabSettings'>;
export type TabSettingsProps = { route: TabSettingsRouteProp, navigation: TabSettingsNavigationProp }

function TabSettingsScreen({route, navigation}: TabSettingsProps) {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.TabSettings');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);

    return (
        <View style={containerStyles.screen}>
            <Card title={st(`title`)}>
                <Text>{route.params.item}</Text>
            </Card>
        </View>
    );
}

export default TabSettingsScreen;
