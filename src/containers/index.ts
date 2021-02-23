import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../types";
import getSmartStyles from "../utils/smartStyles";

const getContainerStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const smartStyles = getSmartStyles(sizeLabor, themeLabor);
    const {ms} = sizeLabor;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        card: {
            margin: ms.sp.m,
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
