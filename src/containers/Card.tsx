import {Text, View} from "../components/UI";
import * as React from "react";
import {getContainerStyles} from "./index";
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
    return (<View style={styles.card}>
        {title
            ? typeof title === 'string'
                ? <Text style={styles.cardTitle}>
                    {title}
                </Text>
                : {title}
            : null
        }
        {children}
    </View>)
}
