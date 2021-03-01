import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {theme} = themeLabor;
    const {colors} = theme;
    const {wp} = sizeLabor.responsive.iphoneX;
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            marginTop: wp(10),
            fontSize: wp(16),
            color: colors.text,
        }
    });
}
