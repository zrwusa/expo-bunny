import * as React from "react";
import {View, Text, ButtonTO, TextBtn} from "../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types/stacks";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../lang/short-t";
import {useSelector} from "react-redux";
import {RootState} from "../../types/models";
import {Avatar} from "react-native-elements";
import containerStyle from "../../containers";
import {ScrollView} from "react-native";
import styles from "./styles";
import {useResponsive} from "../../styles/responsive/responsiveHooks";
import {useRequest} from "../../utils/requestHooks";
import ImageProgressive from "../../components/base-ui/ImageProgressive";

type ProfileRouteProp = RouteProp<RootStackParam, 'Profile'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'Profile'>;
type Props = { route: ProfileRouteProp; navigation: ProfileNavigationProp; };

function ProfileScreen({route, navigation}: Props) {
    const {user} = useSelector((rootState: RootState) => rootState.authState);
    const {bunnyUI} = useResponsive();
    const {wp, hp} = bunnyUI;

    // const request = useRequest();
    // request.get(`/employees`)
    //     .then(res => {
    //     })
    //     .catch(err => {
    //     })
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.Profile');
    const avatar_url = 'https://raw.githubusercontent.com/zrwusa/assets/master/images/alert-orange-border.png';
    return (
        <ScrollView>
            <View style={[containerStyle.screen, containerStyle.centralized]}>
                <Avatar source={{uri: avatar_url}}/>
                <Text>{st(`profileScreenId`)}{route.params.id}</Text>
                <Text>{st(`email`)}{user?.email}</Text>
                <ImageProgressive
                    sourcePH={{uri: `https://raw.githubusercontent.com/zrwusa/assets/master/images/pexels-5451714-placeholder.jpg`}}
                    source={{uri: `https://raw.githubusercontent.com/zrwusa/assets/master/images/pexels-5451714-medium.jpg`}}
                    style={{width: wp(400), height: wp(400)}}
                    resizeMode="cover"
                />
                <ButtonTO onPress={() => navigation.navigate('Home')}>
                    <TextBtn>{st(`goToHomeScreen`)}</TextBtn>
                </ButtonTO>
                <View style={styles.tallBlock}/>
            </View>
        </ScrollView>
    )
}

export default ProfileScreen;
