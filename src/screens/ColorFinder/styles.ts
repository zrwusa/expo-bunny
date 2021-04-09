import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";
import {createSmartStyles} from "../../utils";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    const {smartStylesObj} = createSmartStyles(sizeLabor, themeLabor);

    return StyleSheet.create({
        xxx: {...smartStylesObj.btn},
        shadow: {
            shadowColor: 'black',
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowOffset: {
                width: 0,
                height: 1,
            },
        },
        input:{
            marginVertical:ms.sp.m,
            borderWidth:ms.sp.xxs,
            borderColor:colors.border,
        },
        container:{
            padding:ms.sp.xxs
        },

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
