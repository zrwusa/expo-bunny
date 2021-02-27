import React from "react";
import {getStyles} from "./styles";
import {ActivityIndicator, Text, View} from "react-native";

export type PreparingProps = { text?: string | JSX.Element }
export const Preparing = (props: PreparingProps) => {
    const {text} = props;
    const styles = getStyles();
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
            {text
                ? typeof text === 'string'
                    ? <Text style={styles.text}>
                        {text}
                    </Text>
                    : {text}
                : null
            }
        </View>
    )
}
