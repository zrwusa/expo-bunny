import {StyleSheet} from "react-native";
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
        horizontal: {
            width: '100%',
            borderTopWidth: wp(1),
            borderTopColor: colors.divider
        },
        vertical: {
            height: '100%',
            minHeight: wp(5),
            borderLeftWidth: wp(1),
            borderLeftColor: colors.divider
        }
    });
}
