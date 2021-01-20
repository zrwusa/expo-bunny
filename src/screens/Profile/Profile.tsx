import * as React from "react";
import {View, Text, Button} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types/stacks";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../i18n/short-t";

type ProfileRouteProp = RouteProp<RootStackParam, 'Profile'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'Profile'>;
type Props = { route: ProfileRouteProp; navigation: ProfileNavigationProp; };

function ProfileScreen({route, navigation}: Props) {
    const {t} = useTranslation()
    const i18nPrefix = 'screens.Profile';
    const st = stFactory(t, i18nPrefix);
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>{st(`profileScreenId`)}{route.params.id}</Text>
            <Button title={st(`goToHomeScreen`)} onPress={() => navigation.navigate('Home')}/>
        </View>
    )
}

export default ProfileScreen;
