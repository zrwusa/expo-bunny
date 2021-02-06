import * as React from "react";
import {View, ButtonTO, TextBtn} from "../../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoNestedLv1StackParam} from "../../../types/stacks";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../lang/short-t";
import getContainerStyles from "../../../containers";
import {useSmartStyle} from "../../../styles/smart-style";

type NestedLv1HomeRouteProp = RouteProp<DemoNestedLv1StackParam, 'NestedLv1Home'>;
type NestedLv1HomeNavigationProp = StackNavigationProp<DemoNestedLv1StackParam, 'NestedLv1Home'>;
export type NestedLv1HomeProps = { route: NestedLv1HomeRouteProp, navigation: NestedLv1HomeNavigationProp }

function NestedLv1HomeScreen({route, navigation}: NestedLv1HomeProps) {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.NestedLv1Home');
    const smartStyle = useSmartStyle();
    const containerStyles = getContainerStyles(smartStyle);

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
