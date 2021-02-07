import * as React from "react";
import {View, Text} from "../../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {DemoTabStackParam} from "../../../types/stacks";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../lang/short-t";
import getContainerStyles from "../../../containers";
import {useSizer} from "../../../styles/sizer";
import {useTheme} from "../../../styles/theme";
import {Card} from "../../../containers/Card";

type TabSettingsRouteProp = RouteProp<DemoTabStackParam, 'TabSettings'>;
type TabSettingsNavigationProp = BottomTabNavigationProp<DemoTabStackParam, 'TabSettings'>;
export type TabSettingsProps = { route: TabSettingsRouteProp, navigation: TabSettingsNavigationProp }

function TabSettingsScreen({route, navigation}: TabSettingsProps) {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.TabSettings');
    const sizer = useSizer();
    const theme = useTheme();
    const containerStyles = getContainerStyles(sizer, theme);

    return (
        <View style={containerStyles.screen}>
            <Card title={st(`title`)}>
                <Text>{route.params.item}</Text>
            </Card>
        </View>
    );
}

export default TabSettingsScreen;
