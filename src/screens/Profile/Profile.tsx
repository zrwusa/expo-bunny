import * as React from "react";
import {ButtonTO, InButtonText, View} from "../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {ScrollView} from "react-native";
import {getStyles} from "./styles";
import ImageProgressive from "../../components/UI/ImageProgressive";
import {getContainerStyles, Row} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {useAuthLabor} from "../../providers/auth-labor";
import {getSharedStyles} from "../../utils";

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
    const st = shortenTFunctionKey(t, 'screens.Profile');
    const sizeLabor = useSizeLabor();
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor)
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    const authLabor = useAuthLabor()
    return (
        <ScrollView>
            <View style={[containerStyles.Screen, sharedStyles.centralized]}>
                {/*{user&&user.photoURL?*/}
                {/*    <Row>*/}
                {/*        <Col>*/}
                {/*            <Row>*/}
                {/*                <Text style={sharedStyles.title}>Welcome,</Text>*/}
                {/*            </Row>*/}
                {/*            <Row>*/}
                {/*                <Text style={[sharedStyles.title, {fontWeight: 'bold'}]}>{user.displayName||'Dummy User Name'}</Text>*/}
                {/*            </Row>*/}
                {/*        </Col>*/}
                {/*        <Col style={{alignItems: 'flex-end'}}>*/}
                {/*            <Avatar source={{uri: user.photoURL||'https://raw.githubusercontent.com/zrwusa/assets/master/images/mcenany.jpeg'}}/>*/}
                {/*        </Col>*/}
                {/*    </Row>:null}*/}
                {/*<Text>{st(`profileScreenId`)}{route.params.id}</Text>*/}
                {/*<Text>{st(`email`)}{user?.email}</Text>*/}
                <ImageProgressive
                    sourcePH={{uri: `https://raw.githubusercontent.com/zrwusa/assets/master/images/pexels-5451714-placeholder.jpg`}}
                    source={{uri: `https://raw.githubusercontent.com/zrwusa/assets/master/images/pexels-5451714-medium.jpg`}}
                    style={styles.imageProgressive}
                    resizeMode="cover"
                />
                <Row size="l">
                    <ButtonTO onPress={() => navigation.navigate('Home')}>
                        <InButtonText>{st(`goToHomeScreen`)}</InButtonText>
                    </ButtonTO>
                </Row>
            </View>
        </ScrollView>
    )
}

export default ProfileScreen;
