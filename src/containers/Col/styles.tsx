import {Platform, StyleSheet} from "react-native";
import {useSizeLabor} from "../../providers/size-labor";
import {createSmartStyles} from "../../utils";
import {SizeLabor, ThemeLabor} from "../../types";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = useSizeLabor();
    const {wp} = designsBasedOn.iphoneX;
    const {smartStylesObj} = createSmartStyles(sizeLabor, themeLabor)
    const {shadow} = smartStylesObj;
    const {theme} = themeLabor
    const {colors} = theme
    return StyleSheet.create({
    });
}
