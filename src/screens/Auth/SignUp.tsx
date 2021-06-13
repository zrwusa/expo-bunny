import {InButtonText, LinearGradientButton, TextInputIcon, View} from "../../components/UI";
import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {getContainerStyles, InputCard, Row} from "../../containers";
import {useAuthLabor} from "../../providers/auth-labor";
import {RouteProp} from "@react-navigation/native";
import {AuthTopStackParam, RootStackParam} from "../../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {LinearGradientIcon} from "../../components/LinearGradientIcon";
import {Keyboard} from "react-native";
import {collectBLResult, sysError} from "../../store/actions";
import {LoginVector} from "../../components/LoginVector";
import {getSharedStyles, navToReference} from "../../helpers";
import {getStyles} from "./styles";
import {useBunnyKit} from "../../hooks/bunny-kit";

type SignUpRouteProp = RouteProp<AuthTopStackParam, 'SignUp'>;
type SignUpNavigationProp = StackNavigationProp<RootStackParam, 'Auth'>;

export interface SignUpProps {
    route: SignUpRouteProp;
    navigation: SignUpNavigationProp;
}

export function SignUpScreen({route, navigation}: SignUpProps) {
    const {sizeLabor, themeLabor, colors, wp, theme, t, ms} = useBunnyKit();
    const dispatch = useDispatch();
    const st = shortenTFunctionKey(t, 'screens.Auth');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);
    const {authFunctions} = useAuthLabor()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const firebaseEmailSignUp = async () => {
        Keyboard.dismiss()
        try {
            const result = await authFunctions.firebaseEmailSignUp(username, password, true)
            if (result.success) {
                navToReference(route, navigation)
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
            const result = await authFunctions.bunnySignUp({email: username, password: password})
            if (result.success) {
                navToReference(route, navigation)
            } else {
                dispatch(collectBLResult(result))
            }
        } catch (e) {
            dispatch(sysError(e))
        }
    }

    const handleSignUp = async () => {
        await firebaseEmailSignUp()
    }
    return <View style={containerStyles.Screen}>
        <View style={styles.loginOrSignUpContainer}>
            <InputCard title={st(`email`)}>
                <TextInputIcon placeholder={t('placeholders.email')}
                               textContentType="emailAddress"
                               value={username}
                               onChangeText={(value) => {
                                   setUsername(value)
                               }}
                               renderIcon={() => {
                                   return <LinearGradientIcon name="mail" size={wp(20)}/>
                               }}/>
            </InputCard>
            <InputCard title={st(`password`)}>
                <TextInputIcon placeholder={t(`placeholders.password`)}
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
                    <LinearGradientButton onPress={handleSignUp}><InButtonText>{st(`signUp`)}</InButtonText></LinearGradientButton>
                </Row>
                <LoginVector route={route} navigation={navigation}/>
            </>
        </View>

    </View>
}
