import React from "react";
import {StyleProp, View, ViewStyle} from "react-native";
import {SizeKeys} from "../../types";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {createStyles} from "./styles";

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
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = createStyles(sizeLabor, themeLabor);
    // const colSizeMap: ColSizeMap = {
    //     xxs: 1,
    //     xs: 2,
    //     s: 3,
    //     m: 4,
    //     l: 5,
    //     xl: 6,
    //     xxl: 7
    // }
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
