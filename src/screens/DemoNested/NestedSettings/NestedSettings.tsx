import * as React from "react";
import {View, Text, Button} from "../../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoNestedStackParam} from "../../../types/stacks";
import containerStyle from "../../../containers/box";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../i18n/short-t";

type NestedSettingsRouteProp = RouteProp<DemoNestedStackParam, 'NestedSettings'>;
type NestedSettingsNavigationProp = StackNavigationProp<DemoNestedStackParam, 'NestedSettings'>;
type NestedSettingsProps = { route: NestedSettingsRouteProp, navigation: NestedSettingsNavigationProp }

export function NestedSettingsScreen({route, navigation}: NestedSettingsProps) {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.NestedSettings';
    const st = stFactory(t, i18nPrefix);
    return (
        <View>
            <View style={containerStyle.box}>
                <Text>{route.params.item}</Text>
                <Button title={st(`goToNestedHome`)} onPress={() => navigation.navigate('NestedHome')}/>
            </View>
        </View>);
}

export default NestedSettingsScreen;
