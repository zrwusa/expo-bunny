import {StyleSheet} from "react-native";
import {SizeLabor, Theme, ThemeLabor} from "../../types/styles";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, responsive} = sizeLabor;
    const {wp, hp} = responsive.iphoneX;
    const {colors} = themeLabor.theme;

    return StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
        },
        text: {
            color: colors.text,
            fontSize: 16
        }
    });
}
