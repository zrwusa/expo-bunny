import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    return StyleSheet.create({
        imageProgressive: {
            width: wp(370),
            height: wp(600)
        },
        tallBlock: {
            height: 2000
        },
    });
}
