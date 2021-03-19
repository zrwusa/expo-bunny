import {Platform} from "react-native";
import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {Button, TextInput, View} from "../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../providers";
import {createContainerStyles} from "../../containers";
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
    const containerStyles = createContainerStyles(sizeLabor, themeLabor);
    const [type, setType] = useState('sign-in');
    const {authFunctions} = useAuthLabor()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={containerStyles.Screen}>
            <TextInput placeholder={st(`username`)} value={username} onChangeText={(value) => {
                setUsername(value)
            }}/>
            <TextInput placeholder={st(`password`)} value={password} onChangeText={(value) => {
                setPassword(value)
            }} secureTextEntry/>
            {
                type === 'sign-in'
                    ? <>
                        <Button onPress={async () => {
                            try {
                                await authFunctions.signIn({email: username, password: password})
                            } catch (e) {
                                dispatch(sysError(e))
                            }
                        }} title={st(`signIn`)}/>
                        <Button onPress={async () => {
                            try {
                                await authFunctions.signInDummy()
                            } catch (e) {
                                dispatch(sysError(e))
                            }
                        }} title={st(`signInDummy`)}/>
                        <Button onPress={() => {
                            setType('signUp')
                        }} title={st(`goToSignUp`)}/>
                    </>
                    : <>
                        <Button onPress={async () => {
                            try {
                                await authFunctions.signUp({email: username, password: password})
                            } catch (e) {
                                dispatch(sysError(e))
                            }
                        }} title={st(`signUp`)}/>
                        <Button onPress={() => {
                            setType('sign-in')
                        }} title={st(`goToSignIn`)}/>
                    </>
            }
            {
                Platform.OS !== 'web'
                    ? <Button onPress={async () => {
                        try {
                            await authFunctions.signInGoogle()
                        } catch (e) {
                            dispatch(sysError(e))
                        }
                    }} title={st(`signInGoogle`)}/>
                    : <></>
            }
        </View>
    );
};
