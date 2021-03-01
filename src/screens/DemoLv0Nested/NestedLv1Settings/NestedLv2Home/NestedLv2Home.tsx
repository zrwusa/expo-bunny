import * as React from "react";
import {ButtonTO, TextBtn, View} from "../../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoNestedLv2StackParam} from "../../../../types";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../../../providers/i18n-labor";
import {getContainerStyles} from "../../../../containers";
import {useSizeLabor} from "../../../../providers/size-labor";
import {useThemeLabor} from "../../../../providers/theme-labor";

type NestedLv2HomeRouteProp = RouteProp<DemoNestedLv2StackParam, 'NestedLv2Home'>;
type NestedLv2HomeNavigationProp = StackNavigationProp<DemoNestedLv2StackParam, 'NestedLv2Settings'>;

export interface NestedLv2HomeProps {
    route: NestedLv2HomeRouteProp,
    navigation: NestedLv2HomeNavigationProp
}

function NestedLv2HomeScreen({route, navigation}: NestedLv2HomeProps) {
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.NestedLv2Home');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);

    return (
        <View style={containerStyles.screen}>
            <View style={containerStyles.card}>
                <ButtonTO onPress={() => navigation.navigate('NestedLv2Settings', {itemlv2: "001"})}>
                    <TextBtn>{st(`goToNestedLv2Settings`)}</TextBtn>
                </ButtonTO>
            </View>
        </View>
    );
}


export default NestedLv2HomeScreen;
