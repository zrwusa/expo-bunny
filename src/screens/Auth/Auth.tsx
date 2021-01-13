import {Platform, TextInput, View} from "react-native";
import * as React from "react";
import {signIn, signInGoogle, signInDummy} from "../../stores/auth/actions";
import {useDispatch, useSelector} from "react-redux";
import {ButtonRNE,Text} from "../../components/base-ui";

export const SplashScreen = () => {
    return (
        <View>
            <Text>Splash loading...</Text>
        </View>
    );
};

export const SignInScreen = () => {
    const dispatch = useDispatch();
    return (
        <View>
            <TextInput placeholder="Username"/>
            <TextInput placeholder="Password" secureTextEntry/>
            <ButtonRNE onPress={() => {
                dispatch(signIn({email: 'bruno@email.com', password: 'bruno'}))
            }} title="Sign in"/>
            <ButtonRNE onPress={() => {
                dispatch(signInDummy())
            }} title="Sign in(Dummy)"/>
            {
                Platform.OS !== 'web'
                    ? <ButtonRNE onPress={() => {
                        dispatch(signInGoogle())
                    }} title="Sign in with google"/>
                    : <></>
            }
        </View>
    );
};


