import {Button, Platform, Text, TextInput, View} from "react-native";
import * as React from "react";
import {signIn, signInGoogle, signInDummy} from "../../stores/auth/actions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types/models";

export const SplashScreen = () => {
    return (
        <View>
            <Text>Splash loading...</Text>
        </View>
    );
};

export const SignInScreen = () => {
    const dispatch = useDispatch();
    const authState = useSelector((store: RootState) => store.authState)
    return (
        <View>
            <Text>{JSON.stringify(authState?.user)}</Text>
            <TextInput placeholder="Username"/>
            <TextInput placeholder="Password" secureTextEntry/>
            <Button onPress={() => {
                dispatch(signIn({email: 'bruno@email.com', password: 'bruno'}))
            }} title="Sign in"/>
            <Button onPress={() => {
                dispatch(signInDummy())
            }} title="Sign in(Dummy)"/>
            {
                Platform.OS !== 'web'
                    ? <Button onPress={() => {
                        dispatch(signInGoogle())
                    }} title="Sign in with google"/>
                    : <></>
            }
        </View>
    );
};


