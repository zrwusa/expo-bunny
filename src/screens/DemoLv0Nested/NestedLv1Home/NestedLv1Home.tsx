import * as React from "react";
import {ButtonTO, TextBtn, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoNestedLv1StackParam} from "../../../types";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../../providers/i18n-labor";
import {createContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";

type NestedLv1HomeRouteProp = RouteProp<DemoNestedLv1StackParam, 'NestedLv1Home'>;
type NestedLv1HomeNavigationProp = StackNavigationProp<DemoNestedLv1StackParam, 'NestedLv1Home'>;

export interface NestedLv1HomeProps {
    route: NestedLv1HomeRouteProp,
    navigation: NestedLv1HomeNavigationProp
}

function NestedLv1HomeScreen({route, navigation}: NestedLv1HomeProps) {
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.NestedLv1Home');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = createContainerStyles(sizeLabor, themeLabor);

    return (
        <View style={containerStyles.Screen}>
            <View style={containerStyles.Card}>
                <ButtonTO onPress={() => navigation.navigate('NestedLv1Settings', {item: "001"})}>
                    <TextBtn>{st(`goToNestedLv1Settings`)}</TextBtn>
                </ButtonTO>
            </View>
        </View>
    );
}


export default NestedLv1HomeScreen;
