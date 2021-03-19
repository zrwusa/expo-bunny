import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, responsive} = sizeLabor;
    const {wp, hp} = responsive.iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        text: {
            maxWidth: wp(260),
            maxHeight: wp(200),
            overflow: 'scroll',
            flexShrink: 1,
            color: colors.surface,
        },
    });
}
