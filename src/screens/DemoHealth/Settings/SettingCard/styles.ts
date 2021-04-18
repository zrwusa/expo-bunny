import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../../../types";
import {getSharedStyles} from "../../../../utils";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {theme} = themeLabor;
    const {colors, borderRadius} = theme;
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor)
    const {shadowAround, title} = sharedStylesFlatten;
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
