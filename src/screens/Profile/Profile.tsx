import * as React from "react";
import {useEffect} from "react";
import {ButtonTO, InButtonText, Text, View} from "../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam, RootState} from "../../types";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {ImageURISource, SafeAreaView, ScrollView} from "react-native";
import {getStyles} from "./styles";
import ImageProgressive from "../../components/UI/ImageProgressive";
import {Col, getContainerStyles, Row} from "../../containers";
import {getSharedStyles} from "../../helpers";
import {Avatar} from "../../components/Avatar";
import {useFirestore} from "react-redux-firebase";
import {useSelector} from "react-redux";
import {useBunnyKit} from "../../hooks/bunny-kit";

type ProfileRouteProp = RouteProp<RootStackParam, 'Profile'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'Profile'>;

interface Props {
    route: ProfileRouteProp;
    navigation: ProfileNavigationProp;
}

function ProfileScreen({route, navigation}: Props) {
    const {sizeLabor, themeLabor, t, user} = useBunnyKit()
    const st = shortenTFunctionKey(t, 'screens.Profile');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor)
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    const firestore = useFirestore()
    const userId = user?.storedUser?.uid

    const getStoredUser = async () => {
        await firestore.get({
            collection: 'users',
            where: [['uid', '==', userId]],
            storeAs: 'storedUser'
        })
    }

    const storedUser = useSelector((rootState: RootState) => rootState.firestoreState.ordered.storedUser)

    const _uploadedPortrait = async (source: ImageURISource) => {
        if (source?.uri) {
            if (!userId) {
                return
            }
            const usersRef = firestore.collection('users')
            await usersRef.doc(userId).set({photoURL: source.uri}, {merge: true});
            await getStoredUser()
        }
    }

    useEffect(() => {
        (async () => {
            await getStoredUser()
        })()
    }, [])

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={[containerStyles.Screen, sharedStyles.centralized]}>
                    <Row style={styles.user}>
                        {
                            storedUser?.[0]
                                ?
                                <Row>
                                    <Col>
                                        <Row>
                                            <Text style={sharedStyles.title}>Welcome,</Text>
                                        </Row>
                                        <Row>
                                            <Text style={[sharedStyles.title, {fontWeight: 'bold'}]}>{
                                                storedUser[0].displayName || storedUser[0].email
                                            }</Text>
                                        </Row>
                                    </Col>
                                    <Col>
                                        {
                                            storedUser?.[0].photoURL
                                                ? <Avatar
                                                    size="xl"
                                                    shouldUpload={true}
                                                    uploaderProps={{
                                                        onUploaded: _uploadedPortrait,
                                                        path: 'portraits'
                                                    }}
                                                    source={{uri: storedUser[0].photoURL}}/>
                                                : null
                                        }

                                    </Col>
                                </Row>
                                : null
                        }
                    </Row>
                    <ImageProgressive
                        previewSource={{uri: `https://raw.githubusercontent.com/zrwusa/assets/master/images/pexels-5451714-placeholder.jpg`}}
                        source={{uri: `https://raw.githubusercontent.com/zrwusa/assets/master/images/pexels-5451714-medium.jpg`}}
                        style={styles.imageProgressive}
                        resizeMode="cover"
                    />
                    <Row paddingVertical="l" align="center">
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
