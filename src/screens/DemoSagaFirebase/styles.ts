import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";
import {getSharedStyles} from "../../utils";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor);

    return StyleSheet.create({
        todoContainer: {
            width: wp(350)
        },
        table: {
            padding: ms.sp.l
        },
        flatList: {
            height: hp(300),
        },
    });
}
