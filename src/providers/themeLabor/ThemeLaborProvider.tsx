import * as React from "react";
import {ThemeName, ThemeProviderProps} from "../../types";
import {ThemeLaborContext} from "./ThemeLaborContext";
import {useEffect, useMemo, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BunnyConstants, {EThemes} from "../../constants/constants";
import {sysError} from "../../stores/sys/actions";
import {useColorScheme} from "react-native-appearance";
import {useDispatch} from "react-redux";
import {Preparing} from "../../components/Preparing";
import {Provider as PaperProvider} from "react-native-paper";
import {Theme as ThemeRNE, ThemeProvider as ThemeProviderRNE} from "react-native-elements";
import {themes} from "./theme";

function ThemeLaborProvider(props: ThemeProviderProps): JSX.Element {
    const {children} = props;
    const sysColorSchemeName = useColorScheme();
    const [isReady, setIsReady] = useState(false);
    const [theme, setTheme] = useState(themes[EThemes.light]);

    const changeTheme = (themeName: ThemeName) => {
        setTheme(themes[themeName])
    };

    const dispatch = useDispatch();
    useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                const themeNameSaved = await AsyncStorage.getItem(BunnyConstants.THEME_NAME_PERSISTENCE_KEY);
                let themeName: ThemeName;
                if (themeNameSaved) {
                    themeName = (themeNameSaved === EThemes.dark) ? EThemes.dark : EThemes.light;
                } else {
                    themeName = (sysColorSchemeName === EThemes.dark) ? EThemes.dark : EThemes.light;
                }
                changeTheme(themeName)
            } catch (err) {
                dispatch(sysError(err.toString()));
            }
        }
        bootstrapAsync().then(() => {
            setIsReady(true)
        })
    }, [])

    const themeLaborMemorized = useMemo(
        () => ({theme, changeTheme, sysColorSchemeName})
        , [theme, changeTheme, sysColorSchemeName])

    return (
        isReady
            ? <ThemeLaborContext.Provider value={themeLaborMemorized}>
                <PaperProvider theme={themeLaborMemorized.theme as ReactNativePaper.Theme}>
                    {/*RNE does not support changing theme in runtime,need to be refreshed or restarted*/}
                    <ThemeProviderRNE theme={themeLaborMemorized.theme as ThemeRNE}>
                        {children}
                    </ThemeProviderRNE>
                </PaperProvider>
            </ThemeLaborContext.Provider>
            : <Preparing text="Theme Provider loading"/>
    )
}

export {ThemeLaborProvider};
