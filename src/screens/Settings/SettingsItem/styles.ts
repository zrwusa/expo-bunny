import {StyleSheet, Platform} from "react-native";
import {useSizeLabor} from "../../../providers/sizeLabor";
import {SizeLabor, Theme, ThemeLabor} from "../../../types/styles";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, responsive} = sizeLabor;
    const {wp, hp} = responsive.iphoneX;
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
