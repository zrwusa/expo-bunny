import {useSizeLabor} from '../../providers/size-labor';
import {useThemeLabor} from '../../providers/theme-labor';
import {useTranslation} from 'react-i18next';
import {useAuthLabor} from '../../providers/auth-labor';
import {
    AuthFunctions,
    AuthLaborContextType,
    Measure,
    SizeLabor,
    Theme,
    ThemeColors,
    ThemeLabor,
    User,
    WPOrHP
} from '../../types';
import {i18n, TFunction} from 'i18next';

export interface BunnyKit {
    sizeLabor: SizeLabor,
    themeLabor: ThemeLabor,
    authLabor: AuthLaborContextType,
    theme: Theme,
    wp: WPOrHP,
    hp: WPOrHP,
    ms: Measure,
    t: TFunction,
    i18n: i18n,
    language: string,
    colors: ThemeColors,
    user: User,
    authFunctions: AuthFunctions
}

export const useBunnyKit = () => {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const authLabor = useAuthLabor();
    const {wp, hp} = sizeLabor.designsBasedOn.iphoneX;
    const {ms} = sizeLabor
    const {t, i18n} = useTranslation();
    const {language} = i18n;
    const {theme} = themeLabor;
    const {colors} = theme;
    const {authResult, authFunctions} = authLabor;
    const {user} = authResult;
    return {
        sizeLabor,
        themeLabor,
        authLabor,
        theme,
        wp,
        hp,
        ms,
        t,
        language,
        i18n,
        colors,
        user,
        authFunctions
    } as BunnyKit
};
