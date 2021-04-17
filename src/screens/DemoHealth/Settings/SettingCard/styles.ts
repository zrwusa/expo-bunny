import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../../../types";
import {createSmartStyles} from "../../../../utils";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {theme} = themeLabor;
    const {colors, borderRadius} = theme;
    const {smartStylesObj} = createSmartStyles(sizeLabor, themeLabor)
    const {shadowAround, title} = smartStylesObj;
    return StyleSheet.create({
        settingCard: {},
        title: {
            ...title,
            marginTop: ms.sp.m,
            fontWeight: 'bold',
        },
        contentWrapper: {
            ...shadowAround,
            marginTop: ms.sp.m,
            paddingHorizontal: ms.sp.l,
            borderRadius: borderRadius.surface,
        }
    });
}
