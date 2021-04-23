import {InButtonText, LinearGradientButton, Text, TextInputIcon, View} from "../../components/UI";
import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {getContainerStyles, InputCard, Row} from "../../containers";
import {useAuthLabor} from "../../providers/auth-labor";
import {RouteProp} from "@react-navigation/native";
import {AuthTopStackParam, RootStackParam} from "../../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {LinearGradientIcon} from "../../components/LinearGradientIcon";
import {Keyboard, TouchableOpacity} from "react-native";
import {collectBLResult, sysError} from "../../store/actions";
import {getStyles} from "./styles";
import {LoginVector} from "./LoginVector";
import {FirebasePhoneLogin} from "./FirebasePhoneLogin";
import {Tab} from "../../components/Tab";
import {ForgotPassword} from "./ForgotPassword";

type SignInRouteProp = RouteProp<AuthTopStackParam, 'SignIn'>;
type SignInNavigationProp = StackNavigationProp<RootStackParam, 'Auth'>;

export interface SignInProps {
    route: SignInRouteProp;
    navigation: SignInNavigationProp;
}

export function SignInScreen({route, navigation}: SignInProps) {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.Auth');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {ms, designsBasedOn} = sizeLabor;
    const {wp} = designsBasedOn.iphoneX
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);
    const {authFunctions} = useAuthLabor()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const firebaseLoginMethods = ['email', 'phone'];
    const [loginMethod, setLoginMethod] = useState('email')
    const [isForgot, setIsForgot] = useState(false)


    const navToReference = () => {
        let referenceRoute;
        if (route.params && route.params.reference) {
            referenceRoute = JSON.parse(route.params.reference)
            navigation.navigate(referenceRoute)
        } else {
            navigation.navigate('Home')
        }
    }
    const navToSignUp = () => {
        if (route.params && route.params.reference) {
            navigation.navigate('Auth', {screen: 'SignUp', params: {reference: route.params.reference}})

        } else {
            navigation.navigate('Auth', {screen: 'SignUp'})
        }
    }

    const firebaseEmailSignIn = async () => {
        Keyboard.dismiss()
        // todo can not use await to catch error,wait for Firebase to resolve this bug
        try {
            const result = await authFunctions.firebaseEmailSignIn(username, password)
            if (result.success) {
                navToReference()
            } else {
                dispatch(collectBLResult(result))
            }
        } catch (e) {
            dispatch(sysError(e))
        }
    }

    const bunnySignIn = async () => {
        Keyboard.dismiss()
        try {
            const result = await authFunctions.signIn({email: username, password: password})
            if (result.success) {
                navToReference()
            } else {
                dispatch(collectBLResult(result))
            }
        } catch (e) {
            dispatch(sysError(e))
        }
    }

    return <View style={{flex: 1, zIndex: -1}}>
        <Tab items={firebaseLoginMethods} value={loginMethod} onChange={(item) => {
            setLoginMethod(item)
        }}/>
        {loginMethod === 'email' && !isForgot
            ?
            <View style={styles.container}>
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
                <InputCard title={st(`password`)}>
                    <TextInputIcon placeholder={st(`password`)}
                                   textContentType="password"
                                   value={password}
                                   onChangeText={(value) => {
                                       setPassword(value)
                                   }}
                                   secureTextEntry
                                   renderIcon={() => {
                                       return <LinearGradientIcon name="lock" size={wp(22)}/>
                                   }}
                    />
                </InputCard>
                <Row style={{marginTop: ms.sp.l, justifyContent: 'flex-end'}}>
                    <TouchableOpacity onPress={
                        () => {
                            setIsForgot(true)
                        }
                    }><Text>Forgot password?</Text></TouchableOpacity>
                </Row>
                <Row style={{marginTop: ms.sp.l}}>
                    <LinearGradientButton onPress={firebaseEmailSignIn}><InButtonText>{st(`signIn`)}</InButtonText></LinearGradientButton>
                </Row>
            </View>
            : null
        }
        {
            loginMethod === 'phone'
                ? <FirebasePhoneLogin route={route} navigation={navigation}/>
                : null
        }
        {
            loginMethod === 'email' && isForgot
                ? <ForgotPassword route={route}
                                  navigation={navigation}
                                  onSent={() => {
                                      setIsForgot(false)
                                  }}
                                  onCancel={() => {
                                      setIsForgot(false)
                                  }}
                                  email={username}
                />
                : null
        }
        <LoginVector route={route} navigation={navigation}/>
    </View>
}
