import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        container: {
            padding: ms.sp.m,
            backgroundColor: colors.background,
        },
        modal: {
            justifyContent: 'flex-end',
            margin: 0,
        },
        modalContainer: {
            paddingHorizontal: ms.sp.m,
            backgroundColor: colors.background,
        },
        header: {
            paddingHorizontal: wp(10),
        },
        content: {},
        footer: {
            backgroundColor: colors.background,
            marginTop: ms.sp.m,
            borderRadius: ms.br.s,
            paddingBottom: ms.sp.l,
            paddingHorizontal: ms.sp.l,
        },
    });
}
