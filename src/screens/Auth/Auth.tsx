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
import {sysError} from "../../store/actions";

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
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    return (
        <View style={containerStyles.screen}>
            <TextInput placeholder={st(`username`)} value={username} onChangeText={(value)=>{setUsername(value)}}/>
            <TextInput placeholder={st(`password`)} value={password} onChangeText={(value)=>{setPassword(value)}} secureTextEntry/>
            {
                type === 'sign-in'
                    ? <>
                        <ButtonRNE onPress={async () => {
                            try {
                                await authFunctions.signIn({email: username, password: password})
                            } catch (e) {
                                dispatch(sysError({error: e}))
                            }
                        }} title={st(`signIn`)}/>
                        <ButtonRNE onPress={async () => {
                            try {
                                await authFunctions.signInDummy()
                            } catch (e) {
                                dispatch(sysError({error: e}))
                            }
                        }} title={st(`signInDummy`)}/>
                        <ButtonRNE onPress={() => {
                            setType('signUp')
                        }} title={st(`goToSignUp`)}/>
                    </>
                    : <>
                        <ButtonRNE onPress={async () => {
                            try {
                                await authFunctions.signUp({email: username, password: password})
                            } catch (e) {
                                dispatch(sysError({error: e}))
                            }
                        }} title={st(`signUp`)}/>
                        <ButtonRNE onPress={() => {
                            setType('sign-in')
                        }} title={st(`goToSignIn`)}/>
                    </>
            }
            {
                Platform.OS !== 'web'
                    ? <ButtonRNE onPress={async () => {
                        try {
                            await authFunctions.signInGoogle()
                        } catch (e) {
                            dispatch(sysError({error: e}))
                        }
                    }} title={st(`signInGoogle`)}/>
                    : <></>
            }
        </View>
    );
};
