import {StyleSheet} from "react-native";
import {useSizer} from "../../styles/sizer";
import {useTheme} from "../../styles/theme";

export const getStyles = () => {
    const {ms, responsive} = useSizer();
    const {colors} = useTheme();
    const {wp} = responsive.iphoneX;
    return StyleSheet.create({
        demoShadow: {
            width: wp(326),
            height: wp(140),
            borderRadius: ms.br.s,
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
        },
        demoSurface:{
            width: wp(326),
            height: wp(140),
        }
    });
}
