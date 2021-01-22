import * as React from "react";
import {View, Text, Button} from "../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types/stacks";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../i18n/short-t";
import {useSelector} from "react-redux";
import {RootState} from "../../types/models";
import {Avatar} from "react-native-elements";
import containerStyle from "../../containers";

type ProfileRouteProp = RouteProp<RootStackParam, 'Profile'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'Profile'>;
type Props = { route: ProfileRouteProp; navigation: ProfileNavigationProp; };

function ProfileScreen({route, navigation}: Props) {
    const {user} = useSelector((rootState:RootState)=>rootState.authState);
    const {t} = useTranslation();
    const i18nPrefix = 'screens.Profile';
    const st = stFactory(t, i18nPrefix);
    const avatar_url = 'https://raw.githubusercontent.com/zrwusa/assets/master/images/alert-orange-border.png';
    return (
        <View style={[containerStyle.screen,containerStyle.centralized]}>
            <Avatar source={{uri: avatar_url}}/>
            <Text>{st(`profileScreenId`)}{route.params.id}</Text>
            <Text>{st(`email`)}{user?.email}</Text>

            <Button title={st(`goToHomeScreen`)} onPress={() => navigation.navigate('Home')}/>
        </View>
    )
}

export default ProfileScreen;
