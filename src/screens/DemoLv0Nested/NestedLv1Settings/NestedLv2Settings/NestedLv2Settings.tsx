import * as React from "react";
import {View, ButtonTO, TextBtn} from "../../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoNestedLv2StackParam} from "../../../../types/stacks";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../../providers/i18nLabor/short-t";
import getContainerStyles from "../../../../containers";
import {useSizeLabor} from "../../../../providers/sizeLabor";
import {useThemeLabor} from "../../../../providers/themeLabor";

type NestedLv2SettingsRouteProp = RouteProp<DemoNestedLv2StackParam, 'NestedLv2Settings'>;
type NestedLv2SettingsNavigationProp = StackNavigationProp<DemoNestedLv2StackParam, 'NestedLv2Settings'>;
export type NestedLv2SettingsProps = { route: NestedLv2SettingsRouteProp, navigation: NestedLv2SettingsNavigationProp }

function NestedLv2SettingsScreen({route, navigation}: NestedLv2SettingsProps) {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.NestedLv2Settings');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);

    return (
        <View style={containerStyles.screen}>
            <View style={containerStyles.card}>
                <ButtonTO onPress={() => navigation.navigate('NestedLv2Home')}>
                    <TextBtn>{st(`goToNestedLv2Home`)}</TextBtn>
                </ButtonTO>
            </View>
        </View>
    );
}


export default NestedLv2SettingsScreen;
