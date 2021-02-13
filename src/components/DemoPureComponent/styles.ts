import {StyleSheet} from "react-native";
import {Sizer, Theme} from "../../types/styles";

export const getStyles = (sizer: Sizer,theme:Theme) => {
    const {iphoneX} = sizer.responsive;
    const {wp} = iphoneX;
    const {colors} = theme;
    return StyleSheet.create({
        demoSizer: {
            width: wp(100),
            height: wp(20),
            backgroundColor: colors.secondary,
        }
    });
}
