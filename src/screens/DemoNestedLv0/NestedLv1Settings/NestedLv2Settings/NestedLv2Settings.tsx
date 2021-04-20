import * as React from "react";
import {ButtonTO, InButtonText, View} from "../../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoNestedLv2StackParam} from "../../../../types";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../../providers/i18n-labor";
import {getContainerStyles} from "../../../../containers";
import {useSizeLabor} from "../../../../providers/size-labor";
import {useThemeLabor} from "../../../../providers/theme-labor";
import {getSharedStyles} from "../../../../helpers/shared-styles";

type NestedLv2SettingsRouteProp = RouteProp<DemoNestedLv2StackParam, 'NestedLv2Settings'>;
type NestedLv2SettingsNavigationProp = StackNavigationProp<DemoNestedLv2StackParam, 'NestedLv2Settings'>;

export interface NestedLv2SettingsProps {
    route: NestedLv2SettingsRouteProp,
    navigation: NestedLv2SettingsNavigationProp
}

function NestedLv2SettingsScreen({route, navigation}: NestedLv2SettingsProps) {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.NestedLv2Settings');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);

    return (
        <View style={[containerStyles.Screen, sharedStyles.centralized]}>
            <ButtonTO onPress={() => navigation.navigate('NestedLv2Home')}>
                <InButtonText>{st(`goToNestedLv2Home`)}</InButtonText>
            </ButtonTO>
        </View>
    );
}


export default NestedLv2SettingsScreen;
