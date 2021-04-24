import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";
import {getSharedStyles} from "../../utils";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor)
    const {shadowAround} = sharedStylesFlatten;
    return StyleSheet.create({
        orRow: {
            marginTop: ms.sp.l
        },
        vectorRow: {
            marginTop: ms.sp.m,
            marginBottom: ms.sp.xl
        },
        orCol: {
            alignItems: 'center'
        },
        vectorButton: {
            justifyContent: 'center'
        },
        icon: {marginRight: wp(5)}
    });
}
