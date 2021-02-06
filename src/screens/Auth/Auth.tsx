import {Platform, View} from "react-native";
import * as React from "react";
import {signIn, signInGoogle, signInDummy} from "../../stores/auth/actions";
import {useDispatch} from "react-redux";
import {ButtonRNE, TextInput} from "../../components/base-ui";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../lang/short-t";
import getContainerStyles from "../../containers";
import {useSmartStyle} from "../../styles/smart-style";

export const SignInScreen = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const i18nPrefix = 'screens.SignIn';
    const st = stFactory(t, i18nPrefix);
    const smartStyle = useSmartStyle();
    return (
        <View style={getContainerStyles(smartStyle).screen}>
            <TextInput placeholder={st(`username`)}/>
            <TextInput placeholder={st(`password`)} secureTextEntry/>
            <ButtonRNE onPress={() => {
                dispatch(signIn({email: 'bruno@email.com', password: 'bruno'}))
            }} title={st(`signIn`)}/>
            <ButtonRNE onPress={() => {
                dispatch(signInDummy())
            }} title={st(`signInDummy`)}/>
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


