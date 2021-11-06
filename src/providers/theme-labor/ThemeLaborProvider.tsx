// todo description this provider
import * as React from 'react';
import {useEffect, useMemo, useState} from 'react';
import {ThemeName, ThemeProviderProps} from '../../types';
import {ThemeLaborContext} from './ThemeLaborContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BunnyConstants, {EThemes} from '../../constants/constants';
import {collectBizLogicResult, collectSysError} from '../../store/actions';
import {useColorScheme} from 'react-native-appearance';
import {useDispatch} from 'react-redux';
import {Preparing} from '../../components/Preparing';
import {Provider as PaperProvider} from 'react-native-paper';
import {getThemes} from './theme';
import _ from 'lodash';
import {Dimensions} from 'react-native';
import {bizLogicError} from '../../helpers';

export const ThemeLaborProvider = (props: ThemeProviderProps): JSX.Element => {
    const {children} = props;
    const dispatch = useDispatch();
    const sysColorSchemeName = useColorScheme();
    const [themes, setThemes] = useState(getThemes());
    const [isReady, setIsReady] = useState(false);
    const [themeName, setThemeName] = useState(EThemes.light);
    const [theme, setTheme] = useState(themes[themeName]);

    const changeTheme = async (themeName: ThemeName) => {
        if (Object.keys(EThemes).includes(themeName)) {
            await AsyncStorage.setItem(BunnyConstants.THEME_NAME_PERSISTENCE_KEY, themeName);
            setThemeName(themeName);
            setTheme(themes[themeName]);
        } else {
            dispatch(collectBizLogicResult(bizLogicError(`No ${themeName} `, true)));
        }
    };

    useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                const themeNameSaved = await AsyncStorage.getItem(BunnyConstants.THEME_NAME_PERSISTENCE_KEY);
                let themeName: ThemeName;
                if (themeNameSaved) {
                    themeName = themeNameSaved as ThemeName;
                } else if (sysColorSchemeName) {
                    themeName = (sysColorSchemeName === EThemes.dark) ? EThemes.dark : EThemes.light;
                } else {
                    themeName = EThemes.light;
                }
                await changeTheme(themeName);
            } catch (err: any) {
                dispatch(collectSysError(err));
            }
        };
        bootstrapAsync()
            .then(() => {
                setIsReady(true);
            });

    }, []);

    useEffect(() => {
        setTheme(themes[themeName]);
    }, [themes]);

    useEffect(() => {
        const onDimensionsChange = _.throttle(() => {
            setThemes(getThemes());
        }, BunnyConstants.throttleWait);
        Dimensions.addEventListener('change', onDimensionsChange);
        return () => Dimensions.removeEventListener('change', onDimensionsChange);
    });

    const themeLaborMemorized = useMemo(
        () => {
            return {theme, currentThemeName: themeName, themes, changeTheme, sysColorSchemeName};
        }
        , [theme, changeTheme, themeName, sysColorSchemeName]);

    return (
        isReady
            ? <ThemeLaborContext.Provider value={themeLaborMemorized}>
                <PaperProvider theme={themeLaborMemorized.theme as ReactNativePaper.Theme}>
                    {children}
                </PaperProvider>
            </ThemeLaborContext.Provider>
            : <Preparing text="Theme Provider loading"/>
    );
};
