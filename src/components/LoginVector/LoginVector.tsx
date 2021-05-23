import {IcoMoon, Text, TextButton, View} from "../UI";
import * as React from "react";
import {Row} from "../../containers/Row";
import {Col} from "../../containers/Col";
import {Divider} from "../Divider";
import {Keyboard, Platform} from "react-native";
import {collectBLResult, sysError} from "../../store/actions";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {getStyles} from "./styles";
import {useAuthLabor} from "../../providers/auth-labor";
import {useDispatch} from "react-redux";
import {RouteProp} from "@react-navigation/native";
import {AuthTopStackParam, RootStackParam} from "../../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {navToReference} from "../../helpers";
import {useBunnyKit} from "../../hooks/bunny-kit";

type LoginVectorRouteProp = RouteProp<AuthTopStackParam, 'Login'> | RouteProp<AuthTopStackParam, 'SignUp'>;
type LoginVectorNavigationProp = StackNavigationProp<RootStackParam, 'Auth'>;

export interface LoginVectorProps {
    route: LoginVectorRouteProp;
    navigation: LoginVectorNavigationProp;
}

export const LoginVector = ({route, navigation}: LoginVectorProps) => {
    const {sizeLabor, themeLabor, t, wp} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.Auth');
    const styles = getStyles(sizeLabor, themeLabor);
    const {authFunctions} = useAuthLabor()
    const dispatch = useDispatch();

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
                        await authFunctions.dummyLogin()
                        navToReference(route, navigation)
                    } catch (e) {
                        dispatch(sysError(e))
                    }
                }}>
                    <IcoMoon name="drink" size={wp(24)} style={styles.icon}/>
                    <Text>{st(`dummyLogin`)}</Text>
                </TextButton>
            </Col>
            {
                Platform.OS !== 'web'
                    ? <>
                        <Col size={6}>
                            <TextButton style={styles.vectorButton} onPress={async () => {
                                Keyboard.dismiss()
                                try {
                                    const result = await authFunctions.facebookLogin(true, true)
                                    if (result.success) {
                                        navToReference(route, navigation)
                                    } else {
                                        dispatch(collectBLResult(result))
                                    }
                                } catch (e) {
                                    dispatch(sysError(e))
                                }
                            }}>
                                <IcoMoon name="facebook" style={styles.icon}/>
                                <Text>{st(`facebookLogin`)}</Text>
                            </TextButton>
                        </Col>
                        <Col size={6}>
                            <TextButton style={styles.vectorButton} onPress={async () => {
                                Keyboard.dismiss()
                                try {
                                    const result = await authFunctions.googleLogin(true, true)
                                    if (result.success) {
                                        navToReference(route, navigation)
                                    } else {
                                        dispatch(collectBLResult(result))
                                    }
                                } catch (e) {
                                    dispatch(sysError(e))
                                }
                            }}>
                                <IcoMoon name="google" style={styles.icon}/>
                                <Text>{st(`googleLogin`)}</Text>
                            </TextButton>
                        </Col>
                    </>
                    : <></>
            }
        </Row>
    </View>
}
