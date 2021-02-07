import {StyleSheet} from "react-native";
import {Sizer, Theme} from "../types/styles";
import getSmartStyles from "../styles/utils/smartStyles";

const getContainerStyles = (sizer: Sizer, theme: Theme) => {
    const smartStyles = getSmartStyles(sizer,theme);
    const {ms} = sizer;
    const {colors} = theme;
    return StyleSheet.create({
        card: {
            margin: ms.sp.l,
            padding: ms.sp.m,
            borderColor: colors.border,
            borderWidth: ms.sp.xxs,
            borderRadius: ms.br.s,
        },
        cardTitle: {
            ...smartStyles.h3
        },
        screen: {
            flex: 1,
        },
        contentContainer: {
            justifyContent: 'center',
        },
        centralized: {
            justifyContent: 'center',
            alignItems: 'center'
        },
    });
}
export default getContainerStyles;
