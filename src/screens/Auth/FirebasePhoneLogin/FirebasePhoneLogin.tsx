import {ActivityIndicator, TextInput, View} from "react-native";
import * as React from "react";
import {InputCard} from "../../../containers/InputCard";
import {InButtonText, LinearGradientButton, Text, TextInputIcon} from "../../../components/UI";
import {LinearGradientIcon} from "../../../components/LinearGradientIcon";
import {Row} from "../../../containers/Row";
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import {FIREBASE_CONFIG} from "../../../firebase";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {getStyles} from "./styles";
import {useAuthLabor} from "../../../providers/auth-labor";
import {RouteProp} from "@react-navigation/native";
import {AuthTopStackParam, RootStackParam} from "../../../types";
import {StackNavigationProp} from "@react-navigation/stack";

type FirebasePhoneLoginRouteProp = RouteProp<AuthTopStackParam, 'SignIn'>;
type FirebasePhoneLoginNavigationProp = StackNavigationProp<RootStackParam, 'Auth'>;

export interface FirebasePhoneLoginProps {
    route: FirebasePhoneLoginRouteProp;
    navigation: FirebasePhoneLoginNavigationProp;
}

export const FirebasePhoneLogin = ({route, navigation}: FirebasePhoneLoginProps) => {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.Auth');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {ms, designsBasedOn} = sizeLabor;
    const {wp} = designsBasedOn.iphoneX
    const styles = getStyles(sizeLabor, themeLabor);
    const {authFunctions} = useAuthLabor()

    const recaptchaVerifier = React.useRef<FirebaseRecaptcha.FirebaseRecaptchaVerifierModal>(null);
    const verificationCodeTextInput = React.useRef<TextInput>(null);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [verificationId, setVerificationId] = React.useState('');
    const [verifyError, setVerifyError] = React.useState('');
    const [verifyInProgress, setVerifyInProgress] = React.useState(false);
    const [verificationCode, setVerificationCode] = React.useState('');
    const [confirmError, setConfirmError] = React.useState('');
    const [confirmInProgress, setConfirmInProgress] = React.useState(false);
    const isConfigValid = !!FIREBASE_CONFIG.apiKey;

    const navToReference = () => {
        let referenceRoute;
        if (route.params && route.params.reference) {
            referenceRoute = JSON.parse(route.params.reference)
            navigation.navigate(referenceRoute)
        } else {
            navigation.navigate('Home')
        }
    }

    const sendVerificationCode = async () => {
        setVerifyError('');
        setVerifyInProgress(true);
        setVerificationId('');
        try {
            const {success, message, data} = await authFunctions.sendVerificationCode(phoneNumber,
                // @ts-ignore
                recaptchaVerifier.current)
            const {verificationId} = data
            setVerifyInProgress(false);
            setVerificationId(verificationId);
            verificationCodeTextInput.current?.focus();
        } catch ({message}) {
            setVerifyError(message);
            setVerifyInProgress(false);
        }
    }
    const confirmVerificationCode = async () => {
        setConfirmError('');
        setConfirmInProgress(true);
        try {
            const result = await authFunctions.confirmVerificationCode(verificationId, verificationCode)
            setConfirmInProgress(false);
            setVerificationId('');
            setVerificationCode('');
            verificationCodeTextInput.current?.clear();
            console.info('Phone authentication successful!');
            console.log(await authFunctions.getPersistenceAuthInfo())
            navToReference()
        } catch ({message}) {
            console.log(await authFunctions.getPersistenceAuthInfo())
            setConfirmError(message);
            setConfirmInProgress(false);
        }
    }
    return <View style={styles.container}>
        <View style={styles.contentPhone}>
            <InputCard title={st(`enterPhoneNumber`)}>
                <TextInputIcon
                    autoFocus={isConfigValid}
                    autoCompleteType="tel"
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    placeholder="+1 012 345 6789"
                    editable={!verificationId}
                    onChangeText={(phoneNumber: string) => setPhoneNumber(phoneNumber)}
                    renderIcon={() => {
                        return <LinearGradientIcon name="phone" size={wp(20)}/>
                    }}
                />
            </InputCard>
            <Row size="xxl">
                <LinearGradientButton
                    disabled={!phoneNumber}
                    onPress={sendVerificationCode}
                >
                    <InButtonText>{`${verificationId ? st('resend') : st('send')} ${st('verificationCode')}`}</InButtonText>
                </LinearGradientButton>
            </Row>
            <Row style={styles.recaptchaVerifierModal}>
                <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={FIREBASE_CONFIG}
                />
            </Row>
            {verifyError ? <Text style={styles.error}>{`Error: ${verifyError}`}</Text> : null}
            {verifyInProgress && <ActivityIndicator style={styles.loader}/>}
            {verificationId ? (
                <Text style={styles.success}>A verification code has been sent to your phone</Text>
            ) : null}
            <InputCard title={st(`enterVerificationCode`)}>
                <TextInputIcon
                    ref={verificationCodeTextInput}
                    editable={!!verificationId}
                    placeholder="123456"
                    onChangeText={(verificationCode: string) => setVerificationCode(verificationCode)}
                    renderIcon={() => {
                        return <LinearGradientIcon name="sort-numerically-outline" size={wp(20)}/>
                    }}
                />
            </InputCard>
            <Row size="xxl">
                <LinearGradientButton
                    disabled={!verificationCode}
                    onPress={confirmVerificationCode}
                >
                    <InButtonText>{st('confirmVerificationCode')}</InButtonText>
                </LinearGradientButton>
            </Row>
            {confirmError ? <Text style={styles.error}>{`Error: ${confirmError}`}</Text> : null}
            {confirmInProgress ? <ActivityIndicator style={styles.loader}/> : null}
        </View>
        {!isConfigValid && (
            <View style={styles.overlay} pointerEvents="none">
                <Text style={styles.overlayText}>
                    To get started, set a valid FIREBASE_CONFIG in App.tsx.
                </Text>
            </View>
        )}
    </View>
}
