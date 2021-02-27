import * as React from "react";
import {ButtonTO, TextBtn, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoNestedLv1StackParam} from "../../../types";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../providers/i18nLabor";
import getContainerStyles from "../../../containers";
import {useSizeLabor} from "../../../providers/sizeLabor";
import {useThemeLabor} from "../../../providers/themeLabor";

type NestedLv1HomeRouteProp = RouteProp<DemoNestedLv1StackParam, 'NestedLv1Home'>;
type NestedLv1HomeNavigationProp = StackNavigationProp<DemoNestedLv1StackParam, 'NestedLv1Home'>;
export type NestedLv1HomeProps = { route: NestedLv1HomeRouteProp, navigation: NestedLv1HomeNavigationProp }

function NestedLv1HomeScreen({route, navigation}: NestedLv1HomeProps) {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.NestedLv1Home');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);

    return (
        <View style={containerStyles.screen}>
            <View style={containerStyles.card}>
                <ButtonTO onPress={() => navigation.navigate('NestedLv1Settings', {item: "001"})}>
                    <TextBtn>{st(`goToNestedLv1Settings`)}</TextBtn>
                </ButtonTO>
            </View>
        </View>
    );
}


export default NestedLv1HomeScreen;
