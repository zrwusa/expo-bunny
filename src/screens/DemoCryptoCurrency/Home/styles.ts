import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../../types";
import {createSmartStyles} from "../../../utils";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, responsive} = sizeLabor;
    const {wp, hp} = responsive.iphoneX;
    const {colors} = themeLabor.theme;
    const {smartStylesObj} = createSmartStyles(sizeLabor, themeLabor);
    const {row, around} = smartStylesObj
    return StyleSheet.create({
        tabs: {
            ...row,
            // ...around,
            borderBottomColor:colors.border,
            borderBottomWidth:wp(1),
        },
        tab: {
            flex:1,
        },
        tabText:{
            fontSize:ms.fs.s,
            padding:ms.sp.m,
            paddingHorizontal:ms.sp.l,
            textAlign:'center',
        },
        tabTextActive:{
          color:colors.primary
        },
        active: {
            borderBottomColor:colors.secondary,
            borderBottomWidth:wp(2),
        },
        inActive: {
            borderBottomColor:colors.transparent,
            borderBottomWidth:wp(2),
        },
        btcChart: {
            marginTop: wp(36),
            paddingBottom: wp(6)
        }
    });
}
