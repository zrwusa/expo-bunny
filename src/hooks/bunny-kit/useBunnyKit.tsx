import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {useTranslation} from "react-i18next";
import {useAuthLabor} from "../../providers/auth-labor";

export interface UseBunnyKit {
}

export const useBunnyKit = () => {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const authLabor = useAuthLabor();
    const {wp, hp} = sizeLabor.designsBasedOn.iphoneX;
    const {t} = useTranslation();
    const {theme} = themeLabor;
    const {colors} = theme;
    const {authResult, authFunctions} = authLabor;
    const {user} = authResult;
    return {sizeLabor, themeLabor, authLabor, wp, hp, t, colors, user, authFunctions}
};
