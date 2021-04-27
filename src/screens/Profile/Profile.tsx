import * as React from "react";
import {ButtonTO, InButtonText, Text, View} from "../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {SafeAreaView, ScrollView} from "react-native";
import {getStyles} from "./styles";
import ImageProgressive from "../../components/UI/ImageProgressive";
import {Col, getContainerStyles, Row} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {useAuthLabor} from "../../providers/auth-labor";
import {getSharedStyles} from "../../utils";
import {Avatar} from "../../components/Avatar";

type ProfileRouteProp = RouteProp<RootStackParam, 'Profile'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'Profile'>;

interface Props {
    route: ProfileRouteProp;
    navigation: ProfileNavigationProp;
}

// type A = {a:string,m:string}
// type B = {b:string,m:string}
// type C = {c:string,m:string}
// type M = A | B | C
// let m:M;

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

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={[containerStyles.Screen, sharedStyles.centralized]}>
                    <View style={styles.user}>
                        {
                            user
                                ?
                                <Row>
                                    <Col>
                                        <Row>
                                            <Text style={sharedStyles.title}>Welcome,</Text>
                                        </Row>
                                        <Row>
                                            <Text style={[sharedStyles.title, {fontWeight: 'bold'}]}>{
                                                user.googleUser?.name || user.bunnyUser?.email || user.firebaseUser?.email || user.facebookUser?.name || 'Dummy User Name'
                                            }</Text>
                                        </Row>
                                    </Col>
                                    <Col align="flex-end">
                                        <Avatar
                                            source={{uri: user.firebaseUser?.photoURL || user.googleUser?.photoUrl || 'https://raw.githubusercontent.com/zrwusa/assets/master/images/mcenany.jpeg'}}/>
                                    </Col>
                                </Row>
                                : null
                        }
                    </View>

                    {/*<Text>{st(`profileScreenId`)}{route.params.id}</Text>*/}
                    {/*<Text>{st(`email`)}{user?.email}</Text>*/}
                    <ImageProgressive
                        sourcePH={{uri: `https://raw.githubusercontent.com/zrwusa/assets/master/images/pexels-5451714-placeholder.jpg`}}
                        source={{uri: `https://raw.githubusercontent.com/zrwusa/assets/master/images/pexels-5451714-medium.jpg`}}
                        style={styles.imageProgressive}
                        resizeMode="cover"
                    />
                    <Row size="l" align="center">
                        <ButtonTO onPress={() => navigation.navigate('Home')}>
                            <InButtonText>{st(`goToHomeScreen`)}</InButtonText>
                        </ButtonTO>
                    </Row>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default ProfileScreen;
