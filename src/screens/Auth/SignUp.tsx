import {InButtonText, LinearGradientButton, TextInputIcon, View} from "../../components/UI";
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
import {Keyboard} from "react-native";
import {collectBLResult, sysError} from "../../store/actions";
import {LoginVector} from "./LoginVector";

type SignUpRouteProp = RouteProp<AuthTopStackParam, 'SignUp'>;
type SignUpNavigationProp = StackNavigationProp<RootStackParam, 'Auth'>;

export interface SignUpProps {
    route: SignUpRouteProp;
    navigation: SignUpNavigationProp;
}

export function SignUpScreen({route, navigation}: SignUpProps) {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.Auth');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {ms, designsBasedOn} = sizeLabor;
    const {wp} = designsBasedOn.iphoneX;
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {authFunctions} = useAuthLabor()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

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
        if (route.params && route.params.reference) {
            navigation.navigate('Auth', {screen: 'SignIn', params: {reference: route.params.reference}})

        } else {
            navigation.navigate('Auth', {screen: 'SignIn'})
        }
    }

    const firebaseEmailSignUp = async () => {
        Keyboard.dismiss()
        try {
            const result = await authFunctions.firebaseEmailSignUp(username, password)
            if (result.success) {
                navToReference()
            } else {
                dispatch(collectBLResult(result))
            }
        } catch (e) {
            dispatch(sysError(e))
        }
    }

    const bunnySignUp = async () => {
        Keyboard.dismiss()
        try {
            const result = await authFunctions.signUp({email: username, password: password})
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
        <View style={{paddingHorizontal: wp(20)}}>
            <InputCard title={st(`username`)}>
                <TextInputIcon placeholder={st(`username`)}
                               textContentType="username"
                               value={username}
                               onChangeText={(value) => {
                                   setUsername(value)
                               }}
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
                               }} secureTextEntry
                               renderIcon={() => {
                                   return <LinearGradientIcon name="lock" size={wp(22)}/>
                               }}
                />
            </InputCard>
            <>
                <Row style={{marginTop: ms.sp.l}}>
                    <LinearGradientButton onPress={firebaseEmailSignUp}><InButtonText>{st(`signUp`)}</InButtonText></LinearGradientButton>
                </Row>
                <LoginVector route={route} navigation={navigation}/>
            </>
        </View>

    </View>
}
