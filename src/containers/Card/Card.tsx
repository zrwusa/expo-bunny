import {Text, View} from "../../components/UI";
import * as React from "react";
import {getContainerStyles} from "../styles";
import {useThemeLabor} from "../../providers/theme-labor";
import {useSizeLabor} from "../../providers/size-labor";
import {StyleProp, ViewStyle} from "react-native";

export interface CardProps {
    title?: string | JSX.Element,
    style?: StyleProp<ViewStyle>
}

export const Card: React.FC<CardProps> = (props) => {
    const {title, children, style} = props;
    const themeLabor = useThemeLabor();
    const sizeLabor = useSizeLabor();
    const styles = getContainerStyles(sizeLabor, themeLabor);
    const mergedStyle = [styles.Card, style]
    return (<View style={mergedStyle}>
        {title
            ? typeof title === 'string'
                ? <Text style={styles.CardTitle}>
                    {title}
                </Text>
                : {title}
            : null
        }
        {children}
    </View>)
}
