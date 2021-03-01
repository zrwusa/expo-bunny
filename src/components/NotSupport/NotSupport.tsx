import React from "react";
import {createStyles} from "./styles";
import {Text, View} from "react-native";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";

export interface NotSupportProps {
    text?: string | JSX.Element
}

export const NotSupport = (props: NotSupportProps) => {
    const {text} = props;
    const themeLabor = useThemeLabor();
    const sizeLabor = useSizeLabor();
    const styles = createStyles(sizeLabor, themeLabor);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}
