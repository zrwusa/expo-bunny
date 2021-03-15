import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";
import {createSmartStyles} from "../../utils";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, responsive} = sizeLabor;
    const {wp, hp} = responsive.iphoneX;
    const {smartStylesObj} = createSmartStyles(sizeLabor, themeLabor);
    const {absoluteBottomLeft, row, evenly} = smartStylesObj;
    const {colors} = themeLabor.theme;

    return StyleSheet.create({
        errorConsole: {
            ...absoluteBottomLeft,
            backgroundColor: colors.backgroundSecondary,
            zIndex: 1000,
            width: wp(375),
            padding: ms.sp.s
        },
        errorText: {
            width: wp(375),
            height: wp(100),
        },
        buttonBox: {
            ...row,
            ...evenly
        }
    });
}
