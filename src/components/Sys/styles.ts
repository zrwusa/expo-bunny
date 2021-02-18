import {StyleSheet} from "react-native";
import {Sizer, Theme} from "../../types/styles";
import getSmartStyles from "../../styles/utils/smartStyles";

export const getStyles = (sizer: Sizer, theme: Theme) => {
    const {ms, responsive} = sizer;
    const {wp, hp} = responsive.iphoneX;
    const {absoluteBottomLeft} = getSmartStyles(sizer, theme);
    const {colors} = theme;

    return StyleSheet.create({
        errorConsole: {
            ...absoluteBottomLeft,
            backgroundColor: colors.backgroundSecondary,
            zIndex: 1000,
            width: wp(375),
            // height: wp(200)
            padding:ms.sp.s
        },
        errorText:{
            width: wp(375),
            height: wp(100),
        },
        buttonBox:{
            flexDirection:"row",
           justifyContent:"space-evenly"
        }
    });
}
