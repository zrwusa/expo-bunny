import React from "react";
import {Text, View} from "../base-ui"
import {styles} from "./styles";

interface Props {
    title: string
}

export const DemoLazy: React.FC<Props> = (props) => {
    return (
        <View>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}
