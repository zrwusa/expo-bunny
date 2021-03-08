import React, {useMemo} from "react";
import {Platform, StatusBar, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";
import {AppearanceProvider} from "react-native-appearance";
import {Theme as ThemeNavigation} from "@react-navigation/native";
import BunnyConstants from "./constants/constants";
import {RootState} from "./types";
import {restoreIsReady, restoreNavInitialState, sysError} from "./store/actions";
import {ThemeLaborContext, ThemeLaborProvider} from "./providers/theme-labor";
import {Preparing} from "./components/Preparing";
import {useTranslation} from "react-i18next";
import {RequestProvider} from "./providers/request-labor";
import {loadAsync} from "expo-font";
import icoMoonFont from "./assets/fonts/icomoon-cus/icomoon.ttf"
import {SizeLaborProvider} from "./providers/size-labor";
import NavigatorTree from "./navigation/NavigatorTree";
import Sys from "./components/Sys";
import {AuthLaborProvider} from "./providers/auth-labor";
import {I18nLaborProvider} from "./providers/i18n-labor";
import BLInfo from "./components/BLInfo";
import RequestLoading from "./components/RequestLoading";

function App() {
    const dispatch = useDispatch();
    const {isReady, navInitialState} = useSelector((rootState: RootState) => rootState.sysState);
    const {t} = useTranslation();

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
        };
        bootstrapAsync()
            .catch((err) => dispatch(sysError(err.toString())));
        return () => clearTimeout(mockPreparingTimer);
    }, []);

    return isReady
        ? (
            // Context or HOC(with*) or Hooks(use*)
            // Providers are Prepared for using the Context method to pass likely global props, the follow-up recommends HOCs, most recommend Hooks(explicitly dependencies vs HOCs) in the latest React version
            <AppearanceProvider>
                <I18nLaborProvider>
                    <SizeLaborProvider>
                        <RequestProvider>
                            <AuthLaborProvider>
                                <ThemeLaborProvider>
                                    <ThemeLaborContext.Consumer>{({theme}) => {
                                        return <>
                                            <StatusBar backgroundColor={Platform.OS === 'android' ? theme.colors.background : ''}
                                                       barStyle={theme.dark ? 'light-content' : 'dark-content'}/>
                                            <NavigatorTree
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
                                            <Sys/>
                                            <BLInfo/>
                                            <RequestLoading/>
                                        </>
                                    }}
                                    </ThemeLaborContext.Consumer>
                                </ThemeLaborProvider>
                            </AuthLaborProvider>
                        </RequestProvider>
                    </SizeLaborProvider>
                </I18nLaborProvider>
            </AppearanceProvider>
        )
        : (<Preparing/>)
}

export default App;
