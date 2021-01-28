import * as React from "react";
import {View} from "../../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../lang/short-t";
import containerStyle from "../../../containers";
import {ScrollView} from "react-native";
import {DemoModalStackParam} from "../../../types/stacks";

type ModalHomeRouteProp = RouteProp<DemoModalStackParam, 'ModalHome'>;
type ModalHomeNavigationProp = StackNavigationProp<DemoModalStackParam, 'ModalHome'>;
export type ModalHomeProps = { route: ModalHomeRouteProp; navigation: ModalHomeNavigationProp; };

function ModalHomeScreen({route, navigation}: ModalHomeProps) {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.ModalHome';
    const st = stFactory(t, i18nPrefix);
    return (
        <ScrollView>
            <View style={[containerStyle.screen, containerStyle.centralized]}>
            </View>
        </ScrollView>
    )
}

export default ModalHomeScreen;
