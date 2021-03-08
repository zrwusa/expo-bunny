import {Text, View} from "../components/UI";
import * as React from "react";
import {getContainerStyles} from "./styles";
import {useThemeLabor} from "../providers/theme-labor";
import {useSizeLabor} from "../providers/size-labor";

export interface CardProps {
    title?: string | JSX.Element
}

export const Card: React.FC<CardProps> = (props) => {
    const {title, children} = props;
    const themeLabor = useThemeLabor();
    const sizeLabor = useSizeLabor();
    const styles = getContainerStyles(sizeLabor, themeLabor);
    return (<View style={styles.Card}>
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
