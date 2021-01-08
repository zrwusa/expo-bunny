import * as React from "react";
import {Text} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {restoreToken} from "./stores/auth/actions";
import * as Linking from "expo-linking";
import {sysError} from "./stores/sys/actions";
import RootNavigator, {getConfig} from "./navigator/RootNavigator";

const basePath = Linking.makeUrl('/');

const linking = {prefixes: [basePath], config: {initialRouteName: "Home", screens: getConfig()}};

function App() {
    const dispatch = useDispatch();
    const [isReady, setIsReady] = React.useState(false);
    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let accessToken;
            try {
                accessToken = await AsyncStorage.getItem('accessToken');
                accessToken && dispatch(restoreToken({access_token: accessToken}));
                setIsReady(true);
            } catch (err) {
                dispatch(sysError(err.toString()));
            }
        };
        bootstrapAsync()
            .catch((err) => dispatch(sysError(err.toString())));
    }, []);

    return isReady
        ? (
            <>
                <NavigationContainer linking={linking} fallback={<Text>Fallback loading...</Text>}>
                    <RootNavigator/>
                </NavigationContainer>
            </>
        )
        : (<Text>Preparing resources</Text>)
}

export default App;
