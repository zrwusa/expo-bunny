// todo description this provider
import * as React from "react";
import {useEffect, useMemo, useState} from "react";
import {ThemeName, ThemeProviderProps} from "../../types";
import {ThemeLaborContext} from "./ThemeLaborContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BunnyConstants, {EThemes} from "../../constants/constants";
import {sysError} from "../../store/actions";
import {useColorScheme} from "react-native-appearance";
import {useDispatch} from "react-redux";
import {Preparing} from "../../components/Preparing";
import {Provider as PaperProvider} from "react-native-paper";
import {getThemes} from "./theme";
import _ from "lodash";
import {Dimensions} from "react-native";


function ThemeLaborProvider(props: ThemeProviderProps): JSX.Element {
    const {children} = props;
    const sysColorSchemeName = useColorScheme();
    const [themes, setThemes] = useState(getThemes())
    const [isReady, setIsReady] = useState(false);
    const [themeName, setThemeName] = useState(EThemes.light)
    const [theme, setTheme] = useState(themes[themeName]);
    const changeTheme = (themeName: ThemeName) => {
        setThemeName(themeName);
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
        bootstrapAsync()
            .then(() => {
                setIsReady(true)
            })

    }, [])
    useEffect(() => {
        const onDimensionsChange = _.throttle(() => {
            setThemes(getThemes())
            setTheme(themes[themeName])
        }, BunnyConstants.throttleWait);
        Dimensions.addEventListener('change', onDimensionsChange);
        return () => Dimensions.removeEventListener('change', onDimensionsChange);
    });
    const themeLaborMemorized = useMemo(
        () => ({theme, themes,changeTheme, sysColorSchemeName})
        , [theme, changeTheme, sysColorSchemeName])

    return (
        isReady
            ? <ThemeLaborContext.Provider value={themeLaborMemorized}>
                <PaperProvider theme={themeLaborMemorized.theme as ReactNativePaper.Theme}>
                    {children}
                </PaperProvider>
            </ThemeLaborContext.Provider>
            : <Preparing text="Theme Provider loading"/>
    )
}

export {ThemeLaborProvider};
