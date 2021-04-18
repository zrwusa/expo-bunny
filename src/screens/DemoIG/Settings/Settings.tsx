import * as React from "react";
import {Text} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {DemoIGStackParam, RootStackParam} from "../../../types";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {Card, getContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {SafeAreaView} from "react-native";
import {getStyles} from "./styles";
import {StackNavigationProp} from "@react-navigation/stack";


type IGSettingsRouteProp = RouteProp<DemoIGStackParam, 'IGSettings'>;
type IGSettingsNavigationProp = StackNavigationProp<RootStackParam, 'DemoIG'>;

export interface IGSettingsProps {
    route: IGSettingsRouteProp,
    navigation: IGSettingsNavigationProp
}

export function IGSettingsScreen({route, navigation}: IGSettingsProps) {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.IGSettings');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {theme} = themeLabor
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor)

    return (
        <SafeAreaView style={containerStyles.Screen}>
            <Card title={st(`title`)}>
                <Text>{route.params.item}</Text>
            </Card>
        </SafeAreaView>
    );
}
