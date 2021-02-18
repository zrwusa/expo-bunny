import {StyleSheet} from "react-native";
import {Sizer, Theme} from "../../types/styles";

export const getStyles = (sizer: Sizer, theme: Theme) => {
    const {ms, responsive} = sizer;
    const {wp, hp} = responsive.iphoneX;
    const {colors} = theme;
    return StyleSheet.create({
        demoShadow: {
            width: wp(326),
            height: wp(140),
            borderRadius: ms.br.s,
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
        },
        demoSurface:{
            width: wp(326),
            height: wp(140),
        }
    });
}
