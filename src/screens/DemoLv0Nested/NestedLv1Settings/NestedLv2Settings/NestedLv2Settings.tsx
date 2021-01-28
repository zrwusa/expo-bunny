import * as React from "react";
import {View, ButtonTO, TextBtn} from "../../../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoNestedLv2StackParam} from "../../../../types/stacks";
import containerStyle from "../../../../containers";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../../lang/short-t";

type NestedLv2SettingsRouteProp = RouteProp<DemoNestedLv2StackParam, 'NestedLv2Settings'>;
type NestedLv2SettingsNavigationProp = StackNavigationProp<DemoNestedLv2StackParam, 'NestedLv2Settings'>;
export type NestedLv2SettingsProps = { route: NestedLv2SettingsRouteProp, navigation: NestedLv2SettingsNavigationProp }

function NestedLv2SettingsScreen({route, navigation}: NestedLv2SettingsProps) {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.NestedLv2Settings';
    const st = stFactory(t, i18nPrefix);
    return (
        <View style={containerStyle.screen}>
            <View style={containerStyle.card}>
                <ButtonTO onPress={() => navigation.navigate('NestedLv2Home')}>
                    <TextBtn>{st(`goToNestedLv2Home`)}</TextBtn>
                </ButtonTO>
            </View>
        </View>
    );
}


export default NestedLv2SettingsScreen;
