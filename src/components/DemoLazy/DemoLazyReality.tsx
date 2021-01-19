import React from "react";
import {Text, View} from "../base-ui"
import {styles} from "./styles";

export const DemoLazyReality: React.FC = () => {
    return (
        <View>
            <Text style={styles.text}>I'm late,but only one time!</Text>
        </View>
    )
}
