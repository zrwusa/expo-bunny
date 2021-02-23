import * as React from "react";
import {View, Text, ButtonTO, TextBtn, IcoMoon} from "../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../providers/i18nLabor/short-t";
import {useSelector} from "react-redux";
import {RootState} from "../../types/models";
import {Avatar} from "react-native-elements";
import {ScrollView} from "react-native";
import {getStyles} from "./styles";
import ImageProgressive from "../../components/UI/ImageProgressive";
import getContainerStyles from "../../containers";
import {useSizeLabor} from "../../providers/sizeLabor";
import {useThemeLabor} from "../../providers/themeLabor";
import {useAuthLabor} from "../../providers/authLabor";

type ProfileRouteProp = RouteProp<RootStackParam, 'Profile'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'Profile'>;
type Props = { route: ProfileRouteProp; navigation: ProfileNavigationProp; };

function ProfileScreen({route, navigation}: Props) {
    const {authedResult} = useAuthLabor()
    const {user} = authedResult;
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.Profile');
    const avatar_url = 'https://raw.githubusercontent.com/zrwusa/assets/master/images/alert-orange-border.png';
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor)
    return (
        <ScrollView>
            <View style={[containerStyles.screen, containerStyles.centralized]}>
                <Avatar source={{uri: avatar_url}}/>
                <Text>{st(`profileScreenId`)}{route.params.id}</Text>
                <Text>{st(`email`)}{user?.email}</Text>
                <IcoMoon name="profile1" color="green"/>
                <ImageProgressive
                    sourcePH={{uri: `https://raw.githubusercontent.com/zrwusa/assets/master/images/pexels-5451714-placeholder.jpg`}}
                    source={{uri: `https://raw.githubusercontent.com/zrwusa/assets/master/images/pexels-5451714-medium.jpg`}}
                    style={styles.imageProgressive}
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
