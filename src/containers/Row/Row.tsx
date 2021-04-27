import React from "react";
import {FlexStyle, StyleProp, View, ViewStyle} from "react-native";
import {SizeKeys} from "../../types";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {getStyles} from "./styles";

export interface RowProps {
    children?: React.ReactNode,
    align?: FlexStyle['justifyContent'];
    size?: SizeKeys,
    style?: StyleProp<ViewStyle>
}

export type RowSizeMap = {
    [key in SizeKeys]: number
}

export const Row = function (props: RowProps) {
    const {children, size, style, align = 'flex-start'} = props
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {wp} = sizeLabor.designsBasedOn.iphoneX
    const styles = getStyles(sizeLabor, themeLabor);
    const rowSizeMap: RowSizeMap = {
        xxs: wp(2),
        xs: wp(4),
        s: wp(6),
        m: wp(8),
        l: wp(10),
        xl: wp(12),
        xxl: wp(16)
    }
    const mergeStyle: StyleProp<ViewStyle> = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: align,
            paddingVertical: size ? rowSizeMap[size] : 0
        },
        style
    ]
    return <View style={mergeStyle}>
        {children ? children : null}
    </View>
}
