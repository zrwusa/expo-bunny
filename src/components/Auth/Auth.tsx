import {Button, Text, TextInput, View} from "react-native";
import * as React from "react";

export const SplashScreen = () => {
    return (
        <View>
            <Text>Splash loading...</Text>
        </View>
    );
};

export const SignInScreen = () => {
    const {signIn} = React.useContext(AuthContext);

    return (
        <View>
            <TextInput
                placeholder="Username"
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
            />
            <Button onPress={signIn} title="Sign in"/>

        </View>
    );
};

export type AuthState = {
    isLoading: boolean;
    isSignOut: boolean;
    userToken: undefined | string | null;
};

export type AuthAction =
    | { type: 'RESTORE_TOKEN'; token: undefined | string | null }
    | { type: 'SIGN_IN'; token: string }
    | { type: 'SIGN_OUT' };


const AUTH_CONTEXT_ERROR =
    'Authentication context not found. Have your wrapped your components with AuthContext.Consumer?';

export const AuthContext = React.createContext<{
    signIn: () => void;
    signOut: () => void;
}>({
    signIn: () => {
        throw new Error(AUTH_CONTEXT_ERROR);
    },
    signOut: () => {
        throw new Error(AUTH_CONTEXT_ERROR);
    },
});
