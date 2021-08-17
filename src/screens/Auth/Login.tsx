import {InButtonText, LinearGradientButton, Text, TextInputIcon, View} from '../../components/UI';
import * as React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {shortenTFunctionKey} from '../../providers/i18n-labor';
import {getContainerStyles, InputCard, Row} from '../../containers';
import {useAuthLabor} from '../../providers/auth-labor';
import {RouteProp} from '@react-navigation/native';
import {AuthTopStackParam, RootStackParam} from '../../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {LinearGradientIcon} from '../../components/LinearGradientIcon';
import {Keyboard, ScrollView, TouchableOpacity} from 'react-native';
import {collectBLResult, sysError} from '../../store/actions';
import {getStyles} from './styles';
import {LoginVector} from '../../components/LoginVector';
import {FirebasePhoneLogin} from '../../components/FirebasePhoneLogin';
import {Tab} from '../../components/Tab';
import {ForgotPassword} from '../../components/ForgotPassword';
import {navToReference} from '../../helpers';
import {useBunnyKit} from '../../hooks/bunny-kit';

type LoginRouteProp = RouteProp<AuthTopStackParam, 'Login'>;
type LoginNavigationProp = StackNavigationProp<RootStackParam, 'Auth'>;

export interface LoginProps {
    route: LoginRouteProp;
    navigation: LoginNavigationProp;
}

export function LoginScreen({route, navigation}: LoginProps) {
    const {sizeLabor, themeLabor, wp, t, ms} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.Auth');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);
    const {authFunctions} = useAuthLabor()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const firebaseLoginMethods = ['email', 'phone'];
    const [loginMethod, setLoginMethod] = useState('email')
    const [isForgot, setIsForgot] = useState(false)

    const firebaseEmailLogin = async () => {
        Keyboard.dismiss()
        // todo can not use await to catch error,wait for Firebase to resolve this bug
        try {
            const result = await authFunctions.firebaseEmailLogin(email, password, true)
            if (result.success) {
                navToReference(route, navigation)
            } else {
                dispatch(collectBLResult(result))
            }
        } catch (e) {
            dispatch(sysError(e))
        }
    }

    const bunnyLogin = async () => {
        Keyboard.dismiss()
        try {
            const result = await authFunctions.bunnyLogin({email, password})
            if (result.success) {
                navToReference(route, navigation)
            } else {
                dispatch(collectBLResult(result))
            }
        } catch (e) {
            dispatch(sysError(e))
        }
    }

    const handleLogin = async () => {
        await firebaseEmailLogin()
    }
    return <View style={[containerStyles.Screen]}>
        <ScrollView style={styles.loginOrSignUpContainer}>
            <Tab items={firebaseLoginMethods} value={loginMethod} onChange={(item) => {
                setLoginMethod(item)
            }}/>
            {loginMethod === 'email' && !isForgot
                ?
                <View>
                    <InputCard title={st(`email`)}>
                        <TextInputIcon placeholder={t(`placeholders.email`)}
                                       textContentType="emailAddress"
                                       value={email}
                                       onChangeText={(value) => {
                                           setEmail(value)
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
                        <LinearGradientButton onPress={handleLogin}>
                            <InButtonText>{st(`login`)}</InButtonText>
                        </LinearGradientButton>
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
                                      email={email}
                    />
                    : null
            }
            <LoginVector route={route} navigation={navigation}/>
        </ScrollView>
    </View>
}
