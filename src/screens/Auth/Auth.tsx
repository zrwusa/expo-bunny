import {Keyboard, Platform} from "react-native";
import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {ButtonTO, TextInput, View} from "../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../providers";
import {createContainerStyles} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {useAuthLabor} from "../../providers/auth-labor";
import {sysError} from "../../store/actions";
import {RouteProp} from "@react-navigation/native";
import {RootStackParam} from "../../types";
import {StackNavigationProp} from "@react-navigation/stack";

type ProfileRouteProp = RouteProp<RootStackParam, 'Auth'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'Auth'>;

export interface AuthProps {
    route: ProfileRouteProp;
    navigation: ProfileNavigationProp;
    type?: 'sign-in' | 'sign-up'
}

export const AuthScreen = ({route, navigation}: AuthProps) => {
    // const dispatch = useDispatch();
    // const {t} = useTranslation();
    // const st = shortenTFunctionKey(t, 'screens.Auth');
    // const sizeLabor = useSizeLabor();
    // const themeLabor = useThemeLabor();
    // const containerStyles = createContainerStyles(sizeLabor, themeLabor);
    // const [type, setType] = useState('sign-in');
    // const {authFunctions} = useAuthLabor()
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    //
    // const navToReference = () => {
    //     let referenceRoute;
    //     if (route.params && route.params.reference) {
    //         referenceRoute = JSON.parse(route.params.reference)
    //         navigation.navigate(referenceRoute)
    //     } else {
    //         navigation.navigate('Home')
    //     }
    // }
    //
    // return (
    //     <View style={containerStyles.Screen}>
    //         <TextInput placeholder={st(`username`)} textContentType="username" value={username} onChangeText={(value) => {
    //             setUsername(value)
    //         }}/>
    //         <TextInput placeholder={st(`password`)} textContentType="password" value={password} onChangeText={(value) => {
    //             setPassword(value)
    //         }} secureTextEntry/>
    //         {
    //             type === 'sign-in'
    //                 ? <>
    //                     <ButtonTO onPress={async () => {
    //                         Keyboard.dismiss()
    //                         try {
    //                             await authFunctions.signIn({email: username, password: password})
    //                             navToReference()
    //                         } catch (e) {
    //                             dispatch(sysError(e))
    //                         }
    //                     }}>{st(`signIn`)}</ButtonTO>
    //                     <ButtonTO onPress={async () => {
    //                         Keyboard.dismiss()
    //                         try {
    //                             await authFunctions.signInDummy()
    //                             navToReference()
    //                         } catch (e) {
    //                             dispatch(sysError(e))
    //                         }
    //                     }}>{st(`signInDummy`)}</ButtonTO>
    //                     <ButtonTO onPress={() => {
    //                         setType('signUp')
    //                     }}>{st(`goToSignUp`)}</ButtonTO>
    //                 </>
    //                 : <>
    //                     <ButtonTO onPress={async () => {
    //                         Keyboard.dismiss()
    //                         try {
    //                             await authFunctions.signUp({email: username, password: password})
    //                             navToReference()
    //                         } catch (e) {
    //                             dispatch(sysError(e))
    //                         }
    //                     }}>{st(`signUp`)}</ButtonTO>
    //                     <ButtonTO onPress={() => {
    //                         Keyboard.dismiss()
    //                         setType('sign-in')
    //                     }}>{st(`goToSignIn`)}</ButtonTO>
    //                 </>
    //         }
    //         {
    //             Platform.OS !== 'web'
    //                 ? <ButtonTO onPress={async () => {
    //                     Keyboard.dismiss()
    //                     try {
    //                         const {success} = await authFunctions.signInGoogle()
    //                         if (success) navToReference()
    //                     } catch (e) {
    //                         dispatch(sysError(e))
    //                     }
    //                 }}>{st(`signInGoogle`)}</ButtonTO>
    //                 : <></>
    //         }
    //     </View>
    // );
};
