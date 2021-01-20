import * as React from "react";
import {View, Text, Button} from "../../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoNestedStackParam} from "../../../types/stacks";
import containerStyle from "../../../containers/box";
import {useTranslation} from "react-i18next";

type NestedSettingsRouteProp = RouteProp<DemoNestedStackParam, 'NestedSettings'>;
type NestedSettingsNavigationProp = StackNavigationProp<DemoNestedStackParam, 'NestedSettings'>;
type NestedSettingsProps = { route: NestedSettingsRouteProp, navigation: NestedSettingsNavigationProp }

export function NestedSettingsScreen({route, navigation}: NestedSettingsProps) {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.NestedSettings'
    return (
        <View>
            <View style={containerStyle.box}>
                <Text>{route.params.item}</Text>
                <Button title={t(`${i18nPrefix}.buttons.goToNestedHome`)} onPress={() => navigation.navigate('NestedHome')}/>
            </View>
        </View>);
}

export default NestedSettingsScreen;
