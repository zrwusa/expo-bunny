import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";
import {getSharedStyles} from "../../helpers";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor);

    return StyleSheet.create({
        colorPanel: {
            height: wp(20),
            borderColor: colors.background,
            borderRadius: ms.br.xs,
            borderWidth: ms.sp.xxs,
        }
    });
}
