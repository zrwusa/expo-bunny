import React from "react";
import {FlexStyle, StyleProp, View, ViewStyle} from "react-native";
import {SizeKeys} from "../../types";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {getStyles} from "./styles";

export interface RowProps {
    children?: React.ReactNode,
    size?: number,
    align?: FlexStyle['justifyContent'];
    paddingVertical?: SizeKeys,
    style?: StyleProp<ViewStyle>
}

export type RowSizeMap = {
    [key in SizeKeys]: number
}

export const Row = function (props: RowProps) {
    const {children, size, paddingVertical, style, align = 'flex-start'} = props
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {wp} = sizeLabor.designsBasedOn.iphoneX
    const styles = getStyles(sizeLabor, themeLabor);
    const rowPaddingVertical: RowSizeMap = {
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
            alignSelf: 'stretch',
            // width: '100%',
            flex: size,
            alignItems: 'center',
            justifyContent: align,
            paddingVertical: paddingVertical ? rowPaddingVertical[paddingVertical] : 0
        },
        style
    ]
    return <View style={mergeStyle}>
        {children ? children : null}
    </View>
}
