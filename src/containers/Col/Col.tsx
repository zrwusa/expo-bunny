import React from "react";
import {StyleProp, View, ViewStyle} from "react-native";
import {SizeKeys} from "../../types";

export interface ColProps {
    children?: React.ReactNode,
    size?: number,
    style?: StyleProp<ViewStyle>
}

export type ColSizeMap = {
    [key in SizeKeys]: number
}

export const Col = function (props: ColProps) {
    const {children, size, style} = props
    const mergeStyle: StyleProp<ViewStyle> = [
        {
            flexDirection: 'column',
            flex: size ? size : 1
        },
        style
    ]
    return <View style={mergeStyle}>
        {children ? children : null}
    </View>
}
