import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
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
