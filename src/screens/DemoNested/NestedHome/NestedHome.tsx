import * as React from "react";
import {View, Text, Button} from "../../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoNestedStackParam} from "../../../types/stacks";
import containerStyle from "../../../containers/box";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../i18n/short-t";

type NestedHomeRouteProp = RouteProp<DemoNestedStackParam, 'NestedHome'>;
type NestedHomeNavigationProp = StackNavigationProp<DemoNestedStackParam, 'NestedHome'>;
type NestedHomeProps = { route: NestedHomeRouteProp, navigation: NestedHomeNavigationProp }

export function NestedHomeScreen({route, navigation}: NestedHomeProps) {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.NestedHome';
    const st = stFactory(t, i18nPrefix);
    return (
        <View>
            <View style={containerStyle.box}>
                <Button title={st(`goToNestedSettings`)} onPress={() => navigation.navigate('NestedSettings', {item: "001"})}/>
            </View>

        </View>);
}


export default NestedHomeScreen;
