import {Platform, StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../../types";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        item: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: wp(16),
            paddingVertical: wp(12),
        },
        switch: Platform.select(
            {
                ios: {
                    width: wp(36),
                    height: wp(32),
                    marginRight: ms.sp.m
                },
                default: {
                    width: wp(20),
                    height: wp(20),
                    marginRight: ms.sp.s
                }
            }
        )
    });
}
