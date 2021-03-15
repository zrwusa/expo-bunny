import * as React from "react";
import {ButtonTO, IcoMoon, Text, TextBtn, View} from "../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../providers/i18n-labor";
import {Avatar} from "react-native-elements";
import {ScrollView} from "react-native";
import {createStyles} from "./styles";
import ImageProgressive from "../../components/UI/ImageProgressive";
import {createContainerStyles} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {useAuthLabor} from "../../providers/auth-labor";
import {createSmartStyles} from "../../utils";

type ProfileRouteProp = RouteProp<RootStackParam, 'Profile'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'Profile'>;

interface Props {
    route: ProfileRouteProp;
    navigation: ProfileNavigationProp;
}

function ProfileScreen({route, navigation}: Props) {
    const {authResult} = useAuthLabor()
    const {user} = authResult;
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.Profile');
    const avatar_url = 'https://raw.githubusercontent.com/zrwusa/assets/master/images/alert-orange-border.png';
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = createContainerStyles(sizeLabor, themeLabor);
    const styles = createStyles(sizeLabor, themeLabor)
    const {smartStyles} = createSmartStyles(sizeLabor, themeLabor);

    return (
        <ScrollView>
            <View style={[containerStyles.Screen, smartStyles.centralized]}>
                <Avatar source={{uri: avatar_url}}/>
                <Text>{st(`profileScreenId`)}{route.params.id}</Text>
                <Text>{st(`email`)}{user?.email}</Text>
                <IcoMoon name="profile1"/>
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
