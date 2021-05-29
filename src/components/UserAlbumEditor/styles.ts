import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../../types";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        albumContainer: {
            height: wp(375),
            // padding: ms.sp.m
            marginBottom: wp(10)
        }
    });
}
