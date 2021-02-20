import {Platform} from "react-native";
import * as React from "react";
import {signIn, signInGoogle, signInDummy, register} from "../../stores/auth/actions";
import {useDispatch, useSelector} from "react-redux";
import {View, Text, ButtonRNE, TextInput} from "../../components/base-ui";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../lang/short-t";
import getContainerStyles from "../../containers";
import {useSizer} from "../../styles/sizer";
import {useTheme} from "../../styles/theme";
import {RootState} from "../../types/models";
import {useState} from "react";

export type AuthProps = { type?: 'login' | 'register' }
export const SignInScreen = (props: AuthProps) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const i18nPrefix = 'screens.SignIn';
    const st = stFactory(t, i18nPrefix);
    const sizer = useSizer();
    const theme = useTheme();
    const {redirection} = useSelector((rootState: RootState) => rootState.authState)
    const containerStyles = getContainerStyles(sizer, theme);
    let initType;
    if (props.type) {
        initType = props.type;
    } else {
        initType = (redirection === 'login' || redirection === 'register') ? redirection : undefined;
    }
    const [type, setType] = useState(initType);

    return (
        <View style={containerStyles.screen}>
            <TextInput placeholder={st(`username`)}/>
            <TextInput placeholder={st(`password`)} secureTextEntry/>
            {
                type === 'login'
                    ? <>
                        <ButtonRNE onPress={() => {
                            dispatch(signIn({email: 'bruno@email.com', password: 'bruno'}))
                        }} title={st(`signIn`)}/>
                        <ButtonRNE onPress={() => {
                            dispatch(signInDummy())
                        }} title={st(`signInDummy`)}/>
                        <ButtonRNE onPress={() => {
                            setType('register')
                        }} title={st(`goToRegister`)}/>
                    </>
                    : <>
                        <ButtonRNE onPress={() => {
                            dispatch(register({email: 'bruno@email.com', password: 'bruno'}))
                        }} title={st(`register`)}/>
                        <ButtonRNE onPress={() => {
                            setType('login')
                        }} title={st(`goToLogin`)}/>
                    </>
            }
            {
                Platform.OS !== 'web'
                    ? <ButtonRNE onPress={() => {
                        dispatch(signInGoogle())
                    }} title={st(`signInGoogle`)}/>
                    : <></>
            }
        </View>
    );
};


