import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types/styles";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, responsive} = sizeLabor;
    const {wp, hp} = responsive.iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        demoShadow: {
            width: wp(326),
            height: wp(140),
            borderRadius: ms.br.s,
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
        },
        demoSurface: {
            width: wp(326),
            height: wp(140),
        }
    });
}
