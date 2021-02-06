import * as React from "react";
import {View} from "../../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../lang/short-t";
import {ScrollView} from "react-native";
import {DemoModalStackParam} from "../../../types/stacks";
import getContainerStyles from "../../../containers";
import {useSmartStyle} from "../../../styles/smart-style";

type ModalHomeRouteProp = RouteProp<DemoModalStackParam, 'ModalHome'>;
type ModalHomeNavigationProp = StackNavigationProp<DemoModalStackParam, 'ModalHome'>;
export type ModalHomeProps = { route: ModalHomeRouteProp; navigation: ModalHomeNavigationProp; };

function ModalHomeScreen({route, navigation}: ModalHomeProps) {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.ModalHome');
    const smartStyle = useSmartStyle();
    const containerStyles = getContainerStyles(smartStyle);

    return (
        <ScrollView>
            <View style={[containerStyles.screen, containerStyles.centralized]}>
            </View>
        </ScrollView>
    )
}

export default ModalHomeScreen;
