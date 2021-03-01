import {Platform} from "react-native";
import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {ButtonRNE, TextInput, View} from "../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../providers";
import {getContainerStyles} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {useAuthLabor} from "../../providers/auth-labor";

export interface AuthProps {
    type?: 'sign-in' | 'sign-up'
}

export const AuthScreen = (props: AuthProps) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.Auth');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const [type, setType] = useState('sign-in');
    const {authFunctions} = useAuthLabor()

    return (
        <View style={containerStyles.screen}>
            <TextInput placeholder={st(`username`)}/>
            <TextInput placeholder={st(`password`)} secureTextEntry/>
            {
                type === 'sign-in'
                    ? <>
                        <ButtonRNE onPress={() => {
                            authFunctions.signIn({email: 'bruno@email.com', password: 'bruno'})
                        }} title={st(`signIn`)}/>
                        <ButtonRNE onPress={() => {
                            authFunctions.signInDummy()
                        }} title={st(`signInDummy`)}/>
                        <ButtonRNE onPress={() => {
                            setType('signUp')
                        }} title={st(`goToSignUp`)}/>
                    </>
                    : <>
                        <ButtonRNE onPress={() => {
                            authFunctions.signUp({email: 'bruno@email.com', password: 'bruno'})
                        }} title={st(`signUp`)}/>
                        <ButtonRNE onPress={() => {
                            setType('sign-in')
                        }} title={st(`goToSignIn`)}/>
                    </>
            }
            {
                Platform.OS !== 'web'
                    ? <ButtonRNE onPress={() => {
                        authFunctions.signInGoogle()
                    }} title={st(`signInGoogle`)}/>
                    : <></>
            }
        </View>
    );
};
