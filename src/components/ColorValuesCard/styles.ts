import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";
import {createSmartStyles} from "../../utils";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    const {smartStylesObj} = createSmartStyles(sizeLabor, themeLabor);

    return StyleSheet.create({
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom:ms.sp.l,
            alignItems:'center'
        },
        colorPanel: {
            width: wp(100),
            height: wp(20),
            borderColor:colors.background,
            borderRadius:ms.br.xs,
            borderWidth:ms.sp.xxs,
        }
    });
}
