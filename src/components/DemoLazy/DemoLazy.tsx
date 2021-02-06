import React from "react";
import {Text, View} from "../base-ui"
import getStyles from "./styles";

interface Props {
    title: string
}

export const DemoLazy: React.FC<Props> = (props) => {
    const styles = getStyles();
    return (
        <View>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}
