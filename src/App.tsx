import * as React from "react";
import {Platform, Text, StatusBar} from "react-native";
import {NavigationContainer, DefaultTheme as DefaultThemeNav, DarkTheme as DarkThemeNav} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {restoreAuth} from "./stores/auth/actions";
import * as Linking from "expo-linking";
import {restoreTheme, sysError} from "./stores/sys/actions";
import RootNavigator, {getConfig} from "./navigator/RootNavigator";
import {Provider as PaperProvider} from 'react-native-paper';
import {RootState} from "./types/models";
import BunnyConstants from "./common/constants";
import {DarkTheme, DefaultTheme} from "./components/base-ui";

const basePath = Linking.makeUrl('/');

const linking = {prefixes: [basePath], config: {initialRouteName: "Home", screens: getConfig()}};


function App() {
    const [isReady, setIsReady] = React.useState(false);
    const {theme} = useSelector((rootState: RootState) => rootState.sysState)
    const dispatch = useDispatch();
    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let accessToken, user;
            try {
                accessToken = await AsyncStorage.getItem('accessToken');
                user = await AsyncStorage.getItem('user');
                accessToken && dispatch(restoreAuth({
                    access_token: accessToken,
                    user: user ? JSON.parse(user) : {}
                }));
                const themeName = await AsyncStorage.getItem(BunnyConstants.THEME_PERSISTENCE_KEY);
                dispatch(restoreTheme({theme: themeName === 'dark' ? DarkTheme : DefaultTheme}))
            } catch (err) {
                dispatch(sysError(err.toString()));
            } finally {
                setIsReady(true);
            }
        };
        bootstrapAsync()
            .catch((err) => dispatch(sysError(err.toString())));
    }, []);

    return isReady
        ? (
            <PaperProvider theme={theme}>
                {Platform.OS === 'ios' && (
                    <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'}/>
                )}
                <NavigationContainer linking={linking} theme={theme.dark ? DarkThemeNav : DefaultThemeNav}
                                     fallback={<Text>Fallback loading...</Text>}>
                    <RootNavigator/>
                </NavigationContainer>
            </PaperProvider>
        )
        : (<Text>Preparing resources</Text>)
}

export default App;
