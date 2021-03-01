import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";
import {createSmartStyles} from "../../utils";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, responsive} = sizeLabor;
    const {wp, hp} = responsive.iphoneX;
    const {absoluteBottomLeft} = createSmartStyles(sizeLabor, themeLabor);
    const {colors} = themeLabor.theme;

    return StyleSheet.create({
        errorConsole: {
            ...absoluteBottomLeft,
            backgroundColor: colors.backgroundSecondary,
            zIndex: 1000,
            width: wp(375),
            // height: wp(200)
            padding: ms.sp.s
        },
        errorText: {
            width: wp(375),
            height: wp(100),
        },
        buttonBox: {
            flexDirection: "row",
            justifyContent: "space-evenly"
        }
    });
}
