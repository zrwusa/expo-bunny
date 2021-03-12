import * as React from "react";
import {View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../../providers/i18n-labor";
import {ScrollView} from "react-native";
import {DemoModalStackParam} from "../../../types";
import {getContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {createSmartStyles} from "../../../utils";

type ModalHomeRouteProp = RouteProp<DemoModalStackParam, 'ModalHome'>;
type ModalHomeNavigationProp = StackNavigationProp<DemoModalStackParam, 'ModalHome'>;

export interface ModalHomeProps {
    route: ModalHomeRouteProp;
    navigation: ModalHomeNavigationProp;
}

function ModalHomeScreen({route, navigation}: ModalHomeProps) {
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.ModalHome');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {smartStyles} = createSmartStyles(sizeLabor, themeLabor);

    return (
        <ScrollView>
            <View style={[containerStyles.Screen, smartStyles.centralized]}>
            </View>
        </ScrollView>
    )
}

export default ModalHomeScreen;
