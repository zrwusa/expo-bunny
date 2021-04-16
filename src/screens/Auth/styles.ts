import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";
import {createSmartStyles} from "../../utils";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    const {smartStylesObj} = createSmartStyles(sizeLabor, themeLabor)
    const {shadowAround} = smartStylesObj;
    return StyleSheet.create({
        header: {
            flex: 2,
            justifyContent:'center',
            alignItems:'center',
        },
        content: {
            height: hp(400),
            marginHorizontal: 20,
            borderRadius:wp(10),
            ...shadowAround
        },
        footer: {
            flex: 1, zIndex: 1
        },
        footerBtnWrapper: {
            alignItems: 'center'
        },
        footerBtn: {
            top: wp(18),
            width: wp(100),
            ...shadowAround
        }
    });
}
