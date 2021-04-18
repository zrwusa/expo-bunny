import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../../types";
import {getSharedStyles} from "../../../utils";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor);
    const {} = sharedStylesFlatten
    return StyleSheet.create({
        tabs: {
            borderBottomColor: colors.border,
            borderBottomWidth: wp(1),
        },
        tab: {
            flex: 1,
        },
        tabText: {
            fontSize: ms.fs.s,
            padding: ms.sp.m,
            paddingHorizontal: ms.sp.l,
            textAlign: 'center',
        },
        tabTextActive: {
            color: colors.primary
        },
        active: {
            borderBottomColor: colors.secondary,
            borderBottomWidth: wp(2),
        },
        inActive: {
            borderBottomColor: colors.transparent,
            borderBottomWidth: wp(2),
        },
        btcChart: {
            marginTop: wp(36),
            paddingBottom: wp(6)
        }
    });
}
