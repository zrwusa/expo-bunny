import * as React from "react";
import {StyleProp, View, ViewStyle} from "react-native";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {getStyles} from "./styles";
import {Text} from "../../components/UI"
import {getContainerStyles} from "../styles";

export interface OutTitleCardProps {
    title: string,
    children: React.ReactNode,
    titleMode?: 'IN' | 'OUT',
    style?: StyleProp<ViewStyle>
}

export function Card(props: OutTitleCardProps) {
    const {title, children, style, titleMode} = props;
    const finalTitleMode = titleMode || 'IN'
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = getStyles(sizeLabor, themeLabor)
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const mergedStyle = [containerStyles.Card, style]
    return finalTitleMode === 'OUT'
        ? <View>
            <Text style={containerStyles.CardOutTitle}>{title}</Text>
            <View style={mergedStyle}>
                {children}
            </View>
        </View>
        : <View style={mergedStyle}>
            <Text style={containerStyles.CardInTitle}>{title}</Text>
            {children}
        </View>
}
