import * as React from "react";
import {View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../providers/i18nLabor";
import {ScrollView} from "react-native";
import {DemoModalStackParam} from "../../../types";
import getContainerStyles from "../../../containers";
import {useSizeLabor} from "../../../providers/sizeLabor";
import {useThemeLabor} from "../../../providers/themeLabor";

type ModalHomeRouteProp = RouteProp<DemoModalStackParam, 'ModalHome'>;
type ModalHomeNavigationProp = StackNavigationProp<DemoModalStackParam, 'ModalHome'>;
export type ModalHomeProps = { route: ModalHomeRouteProp; navigation: ModalHomeNavigationProp; };

function ModalHomeScreen({route, navigation}: ModalHomeProps) {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.ModalHome');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);

    return (
        <ScrollView>
            <View style={[containerStyles.screen, containerStyles.centralized]}>
            </View>
        </ScrollView>
    )
}

export default ModalHomeScreen;
