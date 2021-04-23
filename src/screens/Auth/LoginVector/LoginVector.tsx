import {IcoMoon, Text, TextButton, View} from "../../../components/UI";
import * as React from "react";
import {Row} from "../../../containers/Row";
import {Col} from "../../../containers/Col";
import {Divider} from "../../../components/Divider";
import {Keyboard, Platform} from "react-native";
import {collectBLResult, sysError} from "../../../store/actions";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {getStyles} from "./styles";
import {useAuthLabor} from "../../../providers/auth-labor";
import {useDispatch} from "react-redux";
import {RouteProp} from "@react-navigation/native";
import {AuthTopStackParam, RootStackParam} from "../../../types";
import {StackNavigationProp} from "@react-navigation/stack";

type LoginVectorRouteProp = RouteProp<AuthTopStackParam, 'SignIn'> | RouteProp<AuthTopStackParam, 'SignUp'>;
type LoginVectorNavigationProp = StackNavigationProp<RootStackParam, 'Auth'>;

export interface LoginVectorProps {
    route: LoginVectorRouteProp;
    navigation: LoginVectorNavigationProp;
}

export const LoginVector = ({route, navigation}: LoginVectorProps) => {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.Auth');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {designsBasedOn} = sizeLabor;
    const {wp} = designsBasedOn.iphoneX
    const styles = getStyles(sizeLabor, themeLabor);
    const {authFunctions} = useAuthLabor()
    const dispatch = useDispatch();


    const navToReference = () => {
        let referenceRoute;
        if (route.params && route.params.reference) {
            referenceRoute = JSON.parse(route.params.reference)
            navigation.navigate(referenceRoute)
        } else {
            navigation.navigate('Home')
        }
    }

    return <View>
        <Row style={styles.orRow}>
            <Col>
                <Divider/>
            </Col>
            <Col style={styles.orCol}>
                <Text>Or</Text>
            </Col>
            <Col>
                <Divider/>
            </Col>
        </Row>

        <Row style={styles.vectorRow}>
            <Col size={6}>
                <TextButton style={styles.vectorButton} onPress={async () => {
                    Keyboard.dismiss()
                    try {
                        await authFunctions.signInDummy()
                        navToReference()
                    } catch (e) {
                        dispatch(sysError(e))
                    }
                }}>
                    <IcoMoon name="drink" size={wp(24)} style={styles.icon}/>
                    <Text>{st(`signInDummy`)}</Text>
                </TextButton>
            </Col>
            {
                Platform.OS !== 'web'
                    ? <>
                        <Col size={6}>
                            <TextButton style={styles.vectorButton} onPress={async () => {
                                Keyboard.dismiss()
                                try {
                                    const result = await authFunctions.signInFacebook(false)
                                    if (result.success) {
                                        navToReference()
                                    } else {
                                        dispatch(collectBLResult(result))
                                    }
                                } catch (e) {
                                    dispatch(sysError(e))
                                }
                            }}>
                                <IcoMoon name="facebook" style={styles.icon}/>
                                <Text>{st(`signInFacebook`)}</Text>
                            </TextButton>
                        </Col>
                        <Col size={6}>
                            <TextButton style={styles.vectorButton} onPress={async () => {
                                Keyboard.dismiss()
                                try {
                                    const result = await authFunctions.signInGoogle(true)
                                    if (result.success) {
                                        navToReference()
                                    } else {
                                        dispatch(collectBLResult(result))
                                    }
                                } catch (e) {
                                    dispatch(sysError(e))
                                }
                            }}>
                                <IcoMoon name="google" style={styles.icon}/>
                                <Text>{st(`signInGoogle`)}</Text>
                            </TextButton>
                        </Col>
                    </>
                    : <></>
            }
        </Row>
    </View>
}
