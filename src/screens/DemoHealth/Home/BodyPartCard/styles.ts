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
        bodyPartCard: {
            ...shadowAround,
            padding: ms.sp.m,
            borderRadius: borderRadius.surface,
            marginRight: ms.sp.s,
        },
    });
}
