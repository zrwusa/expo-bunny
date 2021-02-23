import {Platform} from "react-native";
import * as React from "react";
import {useDispatch} from "react-redux";
import {View, ButtonRNE, TextInput} from "../../components/UI";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../providers/i18nLabor/short-t";
import getContainerStyles from "../../containers";
import {useSizeLabor} from "../../providers/sizeLabor";
import {useThemeLabor} from "../../providers/themeLabor";
import {useState} from "react";
import {useAuthLabor} from "../../providers/authLabor";

export type AuthProps = { type?: 'sign-in' | 'sign-up' }
export const AuthScreen = (props: AuthProps) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.Auth');
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
