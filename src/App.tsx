import React, {Suspense} from "react";
import {Platform, StatusBar, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";
import * as Linking from "expo-linking";
import {Provider as PaperProvider} from "react-native-paper";
import {AppearanceProvider, useColorScheme} from "react-native-appearance";
import {
    DarkTheme as DarkThemeNav, DefaultTheme as DefaultThemeNav,
    NavigationContainer, InitialState, useTheme
} from "@react-navigation/native";
import RootNavigator, {getScreensConfig} from "./navigator/RootNavigator";
import {EThemes} from "./types/enums";
import BunnyConstants from "./common/constants";
import {RootState} from "./types/models";
import {restoreAuth} from "./stores/auth/actions";
import {restoreTheme, sysError} from "./stores/sys/actions";
import {ThemeProvider} from "./styles/theme";
import {getThemes} from "./styles/theme/theme";
import {Theme} from "./types/styles";
import {Preparing} from "./components/Preparing";
import {DemoLazyLoading} from "./components/DemoLazyLoading";
import {useTranslation} from "react-i18next";

const themes = getThemes();
const defaultTheme = themes.default as unknown as Theme;
const darkTheme = themes.dark as unknown as Theme;

const basePath = Linking.makeUrl('/');

const linking = {prefixes: [basePath], config: {initialRouteName: "Home", screens: getScreensConfig()}};

function App() {
    const {t} = useTranslation();
    const [isReady, setIsReady] = React.useState(false);
    const [navInitialState, setNavInitialState] = React.useState<InitialState | undefined>();
    const {themeName} = useSelector((rootState: RootState) => rootState.sysState);
    const sysScheme = useColorScheme();
    const theme = themeName === EThemes.dark ? darkTheme : defaultTheme;
    const themePaper = theme as ReactNativePaper.Theme;
    const dispatch = useDispatch();
    let mockPreparingTimer = BunnyConstants.fooTimeout;
    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let accessToken, user;
            try {
                const themeNameSaved = await AsyncStorage.getItem(BunnyConstants.THEME_NAME_PERSISTENCE_KEY);
                let themeName;
                if (themeNameSaved) {
                    themeName = (themeNameSaved === EThemes.dark) ? EThemes.dark : EThemes.default;
                } else {
                    themeName = (sysScheme === EThemes.dark) ? EThemes.dark : EThemes.default;
                }
                dispatch(restoreTheme({themeName: themeName}));

                accessToken = await AsyncStorage.getItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY);
                user = await AsyncStorage.getItem(BunnyConstants.USER_PERSISTENCE_KEY);
                accessToken && dispatch(restoreAuth({
                    access_token: accessToken,
                    user: user ? JSON.parse(user) : {}
                }));

                if (Platform.OS !== 'web') {
                    const savedState = await AsyncStorage.getItem(BunnyConstants.NAV_STATE_PERSISTENCE_KEY);
                    const state = savedState ? JSON.parse(savedState) : undefined;
                    if (state !== undefined) {
                        setNavInitialState(state);
                    }
                }
            } catch (err) {
                dispatch(sysError(err.toString()));
            } finally {
                mockPreparingTimer = setTimeout(() => {
                    setIsReady(true);
                }, 1)
                // setIsReady(true);
            }
        };
        bootstrapAsync()
            .catch((err) => dispatch(sysError(err.toString())));

        return () => clearTimeout(mockPreparingTimer);
    }, []);

    return isReady
        ? (
            <Suspense fallback={<DemoLazyLoading/>}>
                <AppearanceProvider>
                    <ThemeProvider theme={theme}>
                        <PaperProvider theme={themePaper}>
                            {Platform.OS === 'ios' && (
                                <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'}/>
                            )}
                            <NavigationContainer linking={linking}
                                                 theme={theme?.dark ? DarkThemeNav : DefaultThemeNav}
                                                 fallback={<Text>{t(`sys.navigationFallback`)}</Text>}
                                                 initialState={navInitialState}
                                                 onStateChange={(state) =>
                                                     AsyncStorage.setItem(
                                                         BunnyConstants.NAV_STATE_PERSISTENCE_KEY,
                                                         JSON.stringify(state)
                                                     )
                                                 }>
                                <RootNavigator/>
                            </NavigationContainer>
                        </PaperProvider>
                    </ThemeProvider>
                </AppearanceProvider>
            </Suspense>
        )
        : (<Preparing/>)
}

export default App;
