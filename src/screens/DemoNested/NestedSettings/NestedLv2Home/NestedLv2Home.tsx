import * as React from "react";
import {View, Button} from "../../../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {DemoNestedLv2StackParam} from "../../../../types/stacks";
import containerStyle from "../../../../containers";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../../i18n/short-t";

type NestedLv2HomeRouteProp = RouteProp<DemoNestedLv2StackParam, 'NestedLv2Home'>;
type NestedLv2HomeNavigationProp = StackNavigationProp<DemoNestedLv2StackParam, 'NestedLv2Settings'>;
type NestedLv2HomeProps = { route: NestedLv2HomeRouteProp, navigation: NestedLv2HomeNavigationProp }

function NestedLv2HomeScreen({route, navigation}: NestedLv2HomeProps) {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.NestedLv2Home';
    const st = stFactory(t, i18nPrefix);
    return (
        <View style={containerStyle.screen}>
            <View style={containerStyle.card}>
                <Button title={st(`goToNestedLv2Settings`)}
                        onPress={() => navigation.navigate('NestedLv2Settings', {itemlv2: "001"})}/>
            </View>
        </View>
    );
}


export default NestedLv2HomeScreen;
