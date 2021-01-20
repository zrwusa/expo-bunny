import * as React from "react";
import {View, Text, Button} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types/stacks";
import {useTranslation} from "react-i18next";

type ProfileRouteProp = RouteProp<RootStackParam, 'Profile'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'Profile'>;
type Props = { route: ProfileRouteProp; navigation: ProfileNavigationProp; };

function ProfileScreen({route, navigation}: Props) {
    const {t} = useTranslation()
    const i18nPrefix = 'screens.Profile';
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>{t(`${i18nPrefix}.labels.profileScreenId`)}{route.params.id}</Text>
            <Button title={t(`${i18nPrefix}.buttons.goToHomeScreen`)} onPress={() => navigation.navigate('Home')}/>
        </View>
    )
}

export default ProfileScreen;
