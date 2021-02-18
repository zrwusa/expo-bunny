import {StyleSheet} from "react-native";
import {Sizer, Theme} from "../../types/styles";

export const getStyles = (sizer: Sizer, theme: Theme) => {
    const {ms, responsive} = sizer;
    const {wp, hp} = responsive.iphoneX;
    const {colors} = theme;

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
        }
    });
}
