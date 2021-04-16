import {Platform, StyleSheet} from "react-native";
import {useSizeLabor} from "../../providers/size-labor";
import {createSmartStyles} from "../../utils";
import {SizeLabor, ThemeLabor} from "../../types";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = useSizeLabor();
    const {wp} = designsBasedOn.iphoneX;
    const {smartStylesObj} = createSmartStyles(sizeLabor, themeLabor)
    const {shadow} = smartStylesObj;
    const {theme} = themeLabor
    const {colors} = theme
    return StyleSheet.create({
        headerBackImage: {
            fontSize: ms.fontSizes.xxl,
        },
        headerStyle: {
            height: Platform.select({
                web: wp(50),
            })
        },
        drawerHeadLeftIcon: {
            paddingLeft: ms.spacings.l,
            fontSize: ms.fontSizes.l,
        },
        headerTitleStyle: {
            fontSize: ms.fontSizes.m
        },
        settingBox: {
            marginRight: wp(10)
        },
        auth: {
            paddingTop: wp(160),
            paddingHorizontal: ms.sp.l,
        }
    });
}
