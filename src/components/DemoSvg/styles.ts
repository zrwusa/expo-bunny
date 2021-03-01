import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types/styles";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
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
