import {View, Text} from "../components/base-ui";
import React from "react";
import getContainerStyles from "./index";
import {useTheme} from "../styles/theme";
import {useSizer} from "../styles/sizer";

export type CardProps = { title?: string };

export const Card: React.FC<CardProps> = (props) => {
    const {title, children} = props;
    const theme = useTheme();
    const sizer = useSizer();
    const styles = getContainerStyles(sizer, theme)
    return (<View style={styles.card}>
        <Text style={styles.cardTitle}>
            {title}
        </Text>
        {children}
    </View>)
}

// const CardTitle: React.FC = (props) => {
//     const {children} = props;
//     const theme = useTheme();
//     const sizer = useSizer();
//     const styles = getContainerStyles(sizer, theme)
//     return (<View style={styles.card}>
//         <Text style={styles.cardTitle}>
//             {children}
//         </Text>
//     </View>)
// }
// CardTitle.displayName = 'Card.Title';
