import {Platform, View} from "react-native";
import * as React from "react";
import {signIn, signInGoogle, signInDummy} from "../../stores/auth/actions";
import {useDispatch} from "react-redux";
import {ButtonRNE,TextInput} from "../../components/base-ui";
import {useTranslation} from "react-i18next";

export const SignInScreen = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const i18nPrefix = 'screens.SignIn';
    return (
        <View>
            <TextInput placeholder={t(`${i18nPrefix}.labels.username`)}/>
            <TextInput placeholder={t(`${i18nPrefix}.labels.password`)} secureTextEntry/>
            <ButtonRNE onPress={() => {
                dispatch(signIn({email: 'bruno@email.com', password: 'bruno'}))
            }} title={t(`${i18nPrefix}.buttons.signIn`)}/>
            <ButtonRNE onPress={() => {
                dispatch(signInDummy())
            }} title={t(`${i18nPrefix}.buttons.signInDummy`)}/>
            {
                Platform.OS !== 'web'
                    ? <ButtonRNE onPress={() => {
                        dispatch(signInGoogle())
                    }} title={t(`${i18nPrefix}.buttons.signInGoogle`)}/>
                    : <></>
            }
        </View>
    );
};


