import * as React from "react";
import {ButtonTO, InButtonText, View} from "../../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoNestedLv2StackParam} from "../../../../types";
import {shortenTFunctionKey} from "../../../../providers/i18n-labor";
import {getContainerStyles} from "../../../../containers";
import {getSharedStyles} from "../../../../helpers";
import {useBunnyKit} from "../../../../hooks/bunny-kit";

type NestedLv2HomeRouteProp = RouteProp<DemoNestedLv2StackParam, 'NestedLv2Home'>;
type NestedLv2HomeNavigationProp = StackNavigationProp<DemoNestedLv2StackParam, 'NestedLv2Settings'>;

export interface NestedLv2HomeProps {
    route: NestedLv2HomeRouteProp,
    navigation: NestedLv2HomeNavigationProp
}

function NestedLv2HomeScreen({route, navigation}: NestedLv2HomeProps) {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.NestedLv2Home');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);

    return (
        <View style={[containerStyles.Screen, sharedStyles.centralized]}>
            <ButtonTO onPress={() => navigation.navigate('NestedLv2Settings', {itemlv2: "001"})}>
                <InButtonText>{st(`goToNestedLv2Settings`)}</InButtonText>
            </ButtonTO>
        </View>
    );
}


export default NestedLv2HomeScreen;
