import {Button, Text, TextInput, View} from "react-native";
import * as React from "react";
import {signIn} from "../../stores/auth/actions";
import {useDispatch} from "react-redux";

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
            <TextInput
                placeholder="Username"
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
            />
            <Button onPress={() => {
                dispatch(signIn({email: 'bruno@email.com', password: 'bruno'}))
            }} title="Sign in"/>
        </View>
    );
};


