import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        masonry: {
            flexDirection: 'row'
        },
        column: {
            marginRight: wp(1)
        },
        columnLast: {
            marginRight: 0
        },
        item: {marginBottom: wp(1)}
    });
}
