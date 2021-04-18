import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";
import {getSharedStyles} from "../../utils";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor)
    const {shadowAround} = sharedStylesFlatten;
    return StyleSheet.create({
        header: {
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
        },
        content: {
            height: wp(440),
            marginHorizontal: 20,
            borderRadius: wp(10),
            ...shadowAround
        },
        footer: {
            flex: 1,
            zIndex: 1
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
