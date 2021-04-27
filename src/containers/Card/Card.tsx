import * as React from "react";
import {StyleProp, View, ViewStyle} from "react-native";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {getStyles} from "./styles";
import {Text} from "../../components/UI"
import {getContainerStyles} from "../styles";
import {LinearGradient} from "expo-linear-gradient";

export interface OutTitleCardProps {
    title: string,
    children: React.ReactNode,
    titleMode?: 'IN' | 'OUT',
    style?: StyleProp<ViewStyle>
    isLinear?: boolean
}

export function Card(props: OutTitleCardProps) {
    const {title, children, style, titleMode, isLinear = false} = props;
    const finalTitleMode = titleMode || 'IN'
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {colors} = themeLabor.theme
    const styles = getStyles(sizeLabor, themeLabor)
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const mergedStyle = [containerStyles.Card, style]
    debugger
    return finalTitleMode === 'OUT'
        ?
        <View>
            <Text style={containerStyles.CardOutTitle}>{title}</Text>
            {
                isLinear
                    ? <LinearGradient style={mergedStyle} colors={colors.linearSurface}>
                        {children}
                    </LinearGradient>
                    : <View style={mergedStyle}>
                        {children}
                    </View>
            }
        </View>
        : isLinear
            ? <LinearGradient style={mergedStyle} colors={colors.linearSurface}>
                <Text style={containerStyles.CardInTitle}>{title}</Text>
                {children}
            </LinearGradient>
            : <View style={mergedStyle}>
                <Text style={containerStyles.CardInTitle}>{title}</Text>
                {children}
            </View>


}
