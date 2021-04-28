import * as React from "react";
import {Text} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {DemoSocialMediaStackParam, RootStackParam} from "../../../types";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {Card, getContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {SafeAreaView} from "react-native";
import {getStyles} from "./styles";
import {StackNavigationProp} from "@react-navigation/stack";


type SocialMediaSettingsRouteProp = RouteProp<DemoSocialMediaStackParam, 'SocialMediaSettings'>;
type SocialMediaSettingsNavigationProp = StackNavigationProp<RootStackParam, 'DemoSocialMedia'>;

export interface SocialMediaSettingsProps {
    route: SocialMediaSettingsRouteProp,
    navigation: SocialMediaSettingsNavigationProp
}

export function SocialMediaSettingsScreen({route, navigation}: SocialMediaSettingsProps) {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.SocialMediaSettings');
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
