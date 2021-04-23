import {InButtonText, LinearGradientButton, Text, TextButton, TextInputIcon, View} from "../../../components/UI";
import * as React from "react";
import {useState} from "react";
import {Row} from "../../../containers/Row";
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
import {InputCard} from "../../../containers/InputCard";
import {LinearGradientIcon} from "../../../components/LinearGradientIcon";
import {blError} from "../../../helpers";
import {Col} from "../../../containers/Col";

type ForgotPasswordRouteProp = RouteProp<AuthTopStackParam, 'SignIn'> | RouteProp<AuthTopStackParam, 'SignUp'>;
type ForgotPasswordNavigationProp = StackNavigationProp<RootStackParam, 'Auth'>;

export interface ForgotPasswordProps {
    route: ForgotPasswordRouteProp;
    navigation: ForgotPasswordNavigationProp;
    onSent?: () => void,
    onCancel?: () => void,
    email?: string
}

export const ForgotPassword = ({route, navigation, onSent, onCancel, email}: ForgotPasswordProps) => {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.Auth');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {designsBasedOn} = sizeLabor;
    const {wp} = designsBasedOn.iphoneX
    const styles = getStyles(sizeLabor, themeLabor);
    const {authFunctions} = useAuthLabor()
    const dispatch = useDispatch();
    const [username, setUsername] = useState(email)
    const [isSent, setIsSent] = useState(false)

    const navToReference = () => {
        let referenceRoute;
        if (route.params && route.params.reference) {
            referenceRoute = JSON.parse(route.params.reference)
            navigation.navigate(referenceRoute)
        } else {
            navigation.navigate('Home')
        }
    }

    const navToSignIn = () => {
        let referenceRoute;
        if (route.params && route.params.reference) {
            referenceRoute = JSON.parse(route.params.reference)
            navigation.navigate(referenceRoute)
        } else {
            navigation.navigate('Home')
        }
    }

    const forgotPassword = async () => {
        try {
            if (username) {
                const result = await authFunctions.passwordReset(username)
                if (result.success) {
                    setIsSent(true)
                } else {
                    dispatch(collectBLResult(result))
                }
            } else {
                dispatch(collectBLResult(blError('Please enter email')))
            }

        } catch (e) {
            dispatch(sysError(e))
        }

    }
    return <View style={styles.container}>
        <InputCard title={st(`username`)}>
            <TextInputIcon placeholder={st(`username`)}
                           textContentType="username"
                           value={username}
                           onChangeText={(value) => {
                               setUsername(value)
                           }}
                           autoCapitalize="none"
                           renderIcon={() => {
                               return <LinearGradientIcon name="mail" size={wp(20)}/>
                           }}/>
        </InputCard>
        <Row style={styles.row}>
            <Col size={6}>
                <LinearGradientButton onPress={forgotPassword}>
                    <InButtonText>{st(`resetPassword`)}</InButtonText>
                </LinearGradientButton>
            </Col>
            <Col size={1}/>
            <Col size={6}>
                <TextButton onPress={() => {
                    if (onCancel) onCancel()
                }}>
                    <Text>{st(`goToSignIn`)}</Text></TextButton>
            </Col>
        </Row>
        {
            isSent
                ? <>
                    <Row style={styles.row}>
                        <Text>{st(`checkYourEmail`)}</Text>
                    </Row>
                    <Row style={styles.row}>
                        <LinearGradientButton onPress={() => {
                            if (onSent) onSent()
                        }}><InButtonText>{st(`goToSignIn`)}</InButtonText></LinearGradientButton>
                    </Row>

                </>
                : null
        }
    </View>
}
