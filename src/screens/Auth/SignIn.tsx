import {IcoMoon, InButtonText, LinearGradientButton, Text, TextButton, TextInputIcon, View} from "../../components/UI";
import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {Col, getContainerStyles, InputCard, Row} from "../../containers";
import {useAuthLabor} from "../../providers/auth-labor";
import {RouteProp} from "@react-navigation/native";
import {AuthTopStackParam, RootStackParam} from "../../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {LinearGradientIcon} from "../../components/LinearGradientIcon";
import {Keyboard, Platform, TouchableOpacity} from "react-native";
import {sysError} from "../../store/actions";
import {Divider} from "../../components/Divider";

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
    const {authFunctions} = useAuthLabor()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
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
    const navToSignUp = () => {
        if (route.params && route.params.reference) {
            navigation.navigate('Auth', {screen: 'SignUp', params: {reference: route.params.reference}})

        } else {
            navigation.navigate('Auth', {screen: 'SignUp'})
        }
    }
    return <View style={{flex: 1, zIndex: -1}}>
        <View style={{paddingHorizontal: wp(20)}}>
            <InputCard title={st(`username`)}>
                <TextInputIcon placeholder={st(`username`)}
                               textContentType="username"
                               value={username}
                               onChangeText={(value) => {
                                   setUsername(value)
                               }}
                               renderIcon={() => {
                                   return <LinearGradientIcon name="profile-male" size={wp(20)}/>
                               }}/>
            </InputCard>
            <InputCard title={st(`password`)}>
                <TextInputIcon placeholder={st(`password`)}
                               textContentType="password"
                               value={password}
                               onChangeText={(value) => {
                                   setPassword(value)
                               }} secureTextEntry
                               renderIcon={() => {
                                   return <LinearGradientIcon name="lock" size={wp(22)}/>
                               }}
                />
            </InputCard>
            <Row style={{marginTop: ms.sp.l, justifyContent: 'flex-end'}}>
                <TouchableOpacity><Text>Forgot password?</Text></TouchableOpacity>
            </Row>
            <Row style={{marginTop: ms.sp.l}}>
                <LinearGradientButton onPress={async () => {
                    Keyboard.dismiss()
                    try {
                        await authFunctions.signIn({email: username, password: password})
                        navToReference()
                    } catch (e) {
                        dispatch(sysError(e))
                    }
                }}><InButtonText>{st(`signIn`)}</InButtonText></LinearGradientButton>
            </Row>
            <Row style={{marginTop: ms.sp.l}}>
                <Col>
                    <Divider/>
                </Col>
                <Col style={{alignItems: 'center'}}>
                    <Text>Or</Text>
                </Col>
                <Col>
                    <Divider/>
                </Col>
            </Row>
            <Row style={{marginTop: ms.sp.m, marginBottom: ms.sp.xl}}>
                <Col size={6}>
                    <TextButton style={{justifyContent: 'center'}} onPress={async () => {
                        Keyboard.dismiss()
                        try {
                            await authFunctions.signInDummy()
                            navToReference()
                        } catch (e) {
                            dispatch(sysError(e))
                        }
                    }}>
                        <IcoMoon name="drink" size={24} style={{marginRight: wp(5)}}/>
                        <Text>{st(`signInDummy`)}</Text>
                    </TextButton>
                </Col>
                {
                    Platform.OS !== 'web'
                        ? <>
                            <Col size={1}/>
                            <Col size={6}>
                                <TextButton style={{justifyContent: 'center'}} onPress={async () => {
                                    Keyboard.dismiss()
                                    try {
                                        const {success} = await authFunctions.signInGoogle()
                                        if (success) navToReference()
                                    } catch (e) {
                                        dispatch(sysError(e))
                                    }
                                }}>
                                    <IcoMoon name="google" style={{marginRight: wp(5)}}/>
                                    <Text>{st(`signInGoogle`)}</Text>
                                </TextButton>
                            </Col>
                        </>
                        : <></>
                }
            </Row>
        </View>
    </View>
}
