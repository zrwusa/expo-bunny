import React, {useMemo} from "react";
import {Platform, StatusBar, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";
import {Provider as PaperProvider} from "react-native-paper";
import {ThemeProvider as ThemeProviderRNE, Theme as ThemeRNE} from "react-native-elements";
import {AppearanceProvider, useColorScheme} from "react-native-appearance";
import {
    Theme as ThemeNavigation
} from "@react-navigation/native";
import BunnyConstants, {EThemes} from "./utils/constants";
import {RootState} from "./types/models";
import {restoreAuth} from "./stores/auth/actions";
import {
    restoreIsReady, restoreLanguage, restoreNavInitialState,
    restoreTheme, sysError
} from "./stores/sys/actions";
import {ThemeProvider} from "./styles/theme";
import {getThemes} from "./styles/theme/theme";
import {Theme} from "./types/styles";
import {Preparing} from "./components/Preparing";
import {useTranslation} from "react-i18next";
import * as localization from "expo-localization";
import {RequestProvider} from "./utils/requestHooks";
import {loadAsync} from "expo-font";
import icoMoonFont from "./assets/fonts/icomoon-cus/icomoon.ttf"
import {SizerProvider} from "./styles/sizer";
import NavigationTree from "./navigation/NavigationTree";
import Sys from "./components/Sys";



const themes = getThemes();
const defaultTheme = themes.default as unknown as Theme;
const darkTheme = themes.dark as unknown as Theme;


function App() {
    const dispatch = useDispatch();
    const {isReady, themeName, navInitialState} = useSelector((rootState: RootState) => rootState.sysState);
    const {t, i18n} = useTranslation();
    const theme = (themeName === EThemes.dark) ? darkTheme : defaultTheme;
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
                    const accessToken = await AsyncStorage.getItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY);
                    const user = await AsyncStorage.getItem(BunnyConstants.USER_PERSISTENCE_KEY);
                    if(accessToken){
                        dispatch(restoreAuth({
                            access_token: accessToken,
                            user: user ? JSON.parse(user) : {}
                        }));
                    }
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
                <SizerProvider>
                    <RequestProvider>
                        <ThemeProvider theme={theme}>
                            <PaperProvider theme={theme as ReactNativePaper.Theme}>
                                {/*RNE does not support changing theme in runtime,need to be refreshed or restarted*/}
                                <ThemeProviderRNE theme={theme as ThemeRNE}>
                                    <StatusBar barStyle={Platform.select({
                                        ios: theme.dark ? 'light-content' : 'dark-content',
                                        android: sysScheme === EThemes.dark ? 'light-content' : 'dark-content'
                                    })}/>
                                    <NavigationTree
                                        theme={theme as ThemeNavigation}
                                        fallback={<Text>{t(`sys.navigationFallback`)}</Text>}
                                        initialState={navInitialStateMemorized}
                                        onStateChange={(state) =>
                                            AsyncStorage.setItem(
                                                BunnyConstants.NAV_STATE_PERSISTENCE_KEY,
                                                JSON.stringify(state)
                                            )
                                        }
                                    />
                                    <Sys />
                                </ThemeProviderRNE>
                            </PaperProvider>
                        </ThemeProvider>
                    </RequestProvider>
                </SizerProvider>
            </AppearanceProvider>
        )
        : (<Preparing/>)
}

export default App;
