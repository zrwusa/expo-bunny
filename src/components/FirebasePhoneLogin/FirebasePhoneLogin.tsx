import {ActivityIndicator, TextInput, View} from "react-native";
import * as React from "react";
import {InputCard} from "../../containers/InputCard";
import {InButtonText, LinearGradientButton, Text, TextInputIcon} from "../UI";
import {LinearGradientIcon} from "../LinearGradientIcon";
import {Row} from "../../containers/Row";
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import {FIREBASE_CONFIG} from "../../firebase";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {getStyles} from "./styles";
import {useAuthLabor} from "../../providers/auth-labor";
import {RouteProp} from "@react-navigation/native";
import {AuthTopStackParam, RootStackParam} from "../../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {useDispatch} from "react-redux";
import {collectBLResult} from "../../store/actions";
import {navToReference} from "../../helpers";

type FirebasePhoneLoginRouteProp = RouteProp<AuthTopStackParam, 'Login'>;
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
    const dispatch = useDispatch()

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

    const firebaseSendOTP = async () => {
        setVerifyError('');
        setVerifyInProgress(true);
        setVerificationId('');
        try {
            const result = await authFunctions.firebaseSendOTP(phoneNumber,
                // @ts-ignore
                recaptchaVerifier.current)
            if (result.success) {
                const {verificationId} = result.data
                setVerifyInProgress(false);
                setVerificationId(verificationId);
                verificationCodeTextInput.current?.focus();
            } else {
                dispatch(collectBLResult(result))
            }
        } catch ({message}) {
            setVerifyError(message);
            setVerifyInProgress(false);
        }
    }
    const firebaseConfirmOTP = async () => {
        setConfirmError('');
        setConfirmInProgress(true);
        try {
            const result = await authFunctions.firebaseConfirmOTP(verificationId, verificationCode)
            if (result.success) {
                setConfirmInProgress(false);
                setVerificationId('');
                setVerificationCode('');
                verificationCodeTextInput.current?.clear();
                navToReference(route, navigation)
            } else {
                dispatch(collectBLResult(result))
            }
        } catch ({message}) {
            setConfirmError(message);
            setConfirmInProgress(false);
        }
    }
    return <View>
        <View style={styles.contentPhone}>
            <InputCard title={st(`enterPhoneNumber`)}>
                <TextInputIcon
                    // autoFocus={isConfigValid}
                    autoCompleteType="tel"
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    placeholder={t(`placeholders.phone`)}
                    editable={!verificationId}
                    onChangeText={(phoneNumber: string) => setPhoneNumber(phoneNumber)}
                    renderIcon={() => {
                        return <LinearGradientIcon name="phone" size={wp(20)}/>
                    }}
                />
            </InputCard>
            <Row paddingVertical="xxl">
                <LinearGradientButton
                    disabled={!phoneNumber}
                    onPress={firebaseSendOTP}
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
                <Text style={styles.success}>{st(`otpSentSuccess`)}</Text>
            ) : null}
            <InputCard title={st(`enterVerificationCode`)}>
                <TextInputIcon
                    ref={verificationCodeTextInput}
                    editable={!!verificationId}
                    placeholder={t(`placeholders.otp`)}
                    onChangeText={(verificationCode: string) => setVerificationCode(verificationCode)}
                    renderIcon={() => {
                        return <LinearGradientIcon name="sort-numerically-outline" size={wp(20)}/>
                    }}
                />
            </InputCard>
            <Row paddingVertical="xxl">
                <LinearGradientButton
                    disabled={!verificationCode}
                    onPress={firebaseConfirmOTP}
                >
                    <InButtonText>{st('firebaseConfirmOTP')}</InButtonText>
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
