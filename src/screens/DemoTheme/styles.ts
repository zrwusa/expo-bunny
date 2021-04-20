import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types/styles";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        buttonCard: {
            width: wp(326),
        },
        demoCard: {
            width: wp(350),
        },
        demoShadow: {
            width: wp(326),
            height: wp(140),
            borderRadius: ms.br.s,
            backgroundColor: colors.surface2,
            justifyContent: "center",
            alignItems: "center",
        },
        demoSurface: {
            width: wp(326),
            height: wp(140),
        }
    });
}
