import React from "react";
import {FlexAlignType, StyleProp, View, ViewStyle} from "react-native";

export interface ColProps {
    children?: React.ReactNode,
    size?: number,
    style?: StyleProp<ViewStyle>,
    align?: FlexAlignType;
}

export const Col = function (props: ColProps) {
    const {children, size = 1, style, align = 'center'} = props

    const mergeStyle: StyleProp<ViewStyle> = [
        {
            flexDirection: 'column',
            flex: size,
            alignSelf: 'stretch',
            // height: '100%'
            alignItems: align,
            justifyContent: 'center',
        },
        style
    ]
    return <View style={mergeStyle}>
        {children ? children : null}
    </View>
}
