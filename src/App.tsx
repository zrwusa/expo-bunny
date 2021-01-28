import React, {useMemo} from "react";
import {Platform, StatusBar, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";
import * as Linking from "expo-linking";
import {Provider as PaperProvider} from "react-native-paper";
import {AppearanceProvider, useColorScheme} from "react-native-appearance";
import {
    DarkTheme as DarkThemeNav, DefaultTheme as DefaultThemeNav,
    NavigationContainer, NavigationContainerRef
} from "@react-navigation/native";
import NavigatorTree, {getLinkingConfigScreens} from "./navigation/NavigatorTree";
import BunnyConstants, {EThemes} from "./utils/constants";
import {RootState} from "./types/models";
import {restoreAuth} from "./stores/auth/actions";
import {restoreIsReady, restoreLanguage, restoreNavInitialState, restoreTheme, sysError} from "./stores/sys/actions";
import {ThemeProvider} from "./styles/theme";
import {getThemes} from "./styles/theme/theme";
import {Theme} from "./types/styles";
import {Preparing} from "./components/Preparing";
import {useTranslation} from "react-i18next";
import * as localization from "expo-localization";
import {useReduxDevToolsExtension} from '@react-navigation/devtools';
import {ResponsiveProvider} from "./styles/responsive/responsiveHooks";
import {RequestProvider} from "./utils/requestHooks";

const themes = getThemes();
const defaultTheme = themes.default as unknown as Theme;
const darkTheme = themes.dark as unknown as Theme;
const basePath = Linking.makeUrl('/');
const linking = {prefixes: [basePath], config: {initialRouteName: "Home", screens: getLinkingConfigScreens()}};

function App() {
    const dispatch = useDispatch();
    const {isReady, themeName, navInitialState} = useSelector((rootState: RootState) => rootState.sysState);
    const {t, i18n} = useTranslation();
    const theme = (themeName === EThemes.dark) ? darkTheme : defaultTheme;
    const themePaper = theme as ReactNativePaper.Theme;
    const sysScheme = useColorScheme();


    const navInitialStateMemorized = useMemo(() => {
        return navInitialState;
    }, [navInitialState]);

    React.useEffect(() => {
        let mockPreparingTimer = BunnyConstants.fooTimeout;
        const bootstrapAsync = async () => {
            dispatch(restoreIsReady({isReady: false}));
            try {
                const accessToken = await AsyncStorage.getItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY);
                const user = await AsyncStorage.getItem(BunnyConstants.USER_PERSISTENCE_KEY);
                accessToken && dispatch(restoreAuth({
                    access_token: accessToken,
                    user: user ? JSON.parse(user) : {}
                }));
            } catch (err) {
                dispatch(sysError(err.toString()));
            } finally {
                try {
                    const themeNameSaved = await AsyncStorage.getItem(BunnyConstants.THEME_NAME_PERSISTENCE_KEY);
                    let themeName;
                    if (themeNameSaved) {
                        themeName = (themeNameSaved === EThemes.dark) ? EThemes.dark : EThemes.default;
                    } else {
                        themeName = (sysScheme === EThemes.dark) ? EThemes.dark : EThemes.default;
                    }
                    dispatch(restoreTheme({themeName: themeName}));
                } catch (err) {
                    dispatch(sysError(err.toString()));
                } finally {
                    try {
                        const language = await AsyncStorage.getItem(BunnyConstants.LANGUAGE_TYPE_PERSISTENCE_KEY)
                        const lang = language || localization.locale.substring(0, 2);
                        lang && await i18n.changeLanguage(lang);
                        lang && dispatch(restoreLanguage({language: lang}));
                    } catch (err) {
                        dispatch(sysError(err.toString()));
                    } finally {
                        try {
                            if (Platform.OS !== 'web') {
                                const savedState = await AsyncStorage.getItem(BunnyConstants.NAV_STATE_PERSISTENCE_KEY);
                                const state = savedState ? JSON.parse(savedState) : undefined;
                                if (state !== undefined) {
                                    dispatch(restoreNavInitialState({navInitialState: state}));
                                }
                            }
                        } catch (err) {
                            dispatch(sysError(err.toString()));
                        } finally {
                            mockPreparingTimer = setTimeout(() => {
                                dispatch(restoreIsReady({isReady: true}));
                            }, 1)
                        }
                    }
                }
            }
        };
        bootstrapAsync()
            .catch((err) => dispatch(sysError(err.toString())));

        return () => clearTimeout(mockPreparingTimer);
    }, []);

    const navigationRef = React.useRef<NavigationContainerRef>(null);

    useReduxDevToolsExtension(navigationRef);

    return isReady
        ? (
            <AppearanceProvider>
                <ResponsiveProvider>
                    <RequestProvider>
                        <ThemeProvider theme={theme}>
                            <PaperProvider theme={themePaper}>
                                <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'}/>
                                <NavigationContainer ref={navigationRef}
                                                     linking={linking}
                                                     theme={theme?.dark ? DarkThemeNav : DefaultThemeNav}
                                                     fallback={<Text>{t(`sys.navigationFallback`)}</Text>}
                                                     initialState={navInitialStateMemorized}
                                                     onStateChange={(state) =>
                                                         AsyncStorage.setItem(
                                                             BunnyConstants.NAV_STATE_PERSISTENCE_KEY,
                                                             JSON.stringify(state)
                                                         )
                                                     }>
                                    <NavigatorTree/>
                                </NavigationContainer>
                            </PaperProvider>
                        </ThemeProvider>
                    </RequestProvider>
                </ResponsiveProvider>
            </AppearanceProvider>
        )
        : (<Preparing/>)
}

export default App;
