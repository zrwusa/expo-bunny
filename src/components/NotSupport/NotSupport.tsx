import React from "react";
import {getStyles} from "./styles";
import {Text, View} from "react-native";

export type NotSupportProps = { text?: string | JSX.Element }
export const NotSupport = (props: NotSupportProps) => {
    const {text} = props;
    const styles = getStyles();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}
