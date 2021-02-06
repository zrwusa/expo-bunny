import React, {useMemo} from "react";
import {Platform, StatusBar, Text} from "react-native";
import AsyncStorageNext from "./utils/AsyncStorageNext";
import {useDispatch, useSelector} from "react-redux";
import {Provider as PaperProvider} from "react-native-paper";
import {AppearanceProvider, useColorScheme} from "react-native-appearance";
import {
    DarkTheme as DarkThemeNav, DefaultTheme as DefaultThemeNav,
} from "@react-navigation/native";
import NavigatorTree from "./navigation/NavigatorTree";
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
import {RequestProvider} from "./utils/requestHooks";
import {loadAsync} from "expo-font";
import icoMoonFont from "./assets/fonts/icomoon-cus/icomoon.ttf"
import {ResponsiveProvider} from "./styles/responsive";

const themes = getThemes();
const defaultTheme = themes.default as unknown as Theme;
const darkTheme = themes.dark as unknown as Theme;


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
                await loadAsync({IcoMoon: icoMoonFont})
            } catch (err) {
                dispatch(sysError(err.toString()));
            } finally {
                try {
                    const accessToken = await AsyncStorageNext.getItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY);
                    const user = await AsyncStorageNext.getItem(BunnyConstants.USER_PERSISTENCE_KEY);
                    accessToken && dispatch(restoreAuth({
                        access_token: accessToken,
                        user: user ? JSON.parse(user) : {}
                    }));
                } catch (err) {
                    dispatch(sysError(err.toString()));
                } finally {
                    try {
                        const themeNameSaved = await AsyncStorageNext.getItem(BunnyConstants.THEME_NAME_PERSISTENCE_KEY);
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
                            const language = await AsyncStorageNext.getItem(BunnyConstants.LANGUAGE_TYPE_PERSISTENCE_KEY)
                            const lang = language || localization.locale.substring(0, 2);
                            lang && await i18n.changeLanguage(lang);
                            lang && dispatch(restoreLanguage({language: lang}));
                        } catch (err) {
                            dispatch(sysError(err.toString()));
                        } finally {
                            try {
                                if (Platform.OS !== 'web') {
                                    const savedState = await AsyncStorageNext.getItem(BunnyConstants.NAV_STATE_PERSISTENCE_KEY);
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
            }
        };
        bootstrapAsync()
            .catch((err) => dispatch(sysError(err.toString())));

        return () => clearTimeout(mockPreparingTimer);
    }, []);


    return isReady
        ? (
            // Context or HOC(with*) or Hooks(use*)
            // Providers are Prepared for using the Context method to pass global props, the follow-up recommends HOCs, most recommend Hooks(explicitly dependencies vs HOCs) in the latest React version
            <AppearanceProvider>
                <ResponsiveProvider>
                    <RequestProvider>
                        <ThemeProvider theme={theme}>
                            <PaperProvider theme={themePaper}>
                                <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'}/>
                                <NavigatorTree
                                    theme={theme?.dark ? DarkThemeNav : DefaultThemeNav}
                                    fallback={<Text>{t(`sys.navigationFallback`)}</Text>}
                                    initialState={navInitialStateMemorized}
                                    onStateChange={(state) =>
                                        AsyncStorageNext.setItem(
                                            BunnyConstants.NAV_STATE_PERSISTENCE_KEY,
                                            JSON.stringify(state)
                                        )
                                    }

                                />
                            </PaperProvider>
                        </ThemeProvider>
                    </RequestProvider>
                </ResponsiveProvider>
            </AppearanceProvider>
        )
        : (<Preparing/>)
}

export default App;
