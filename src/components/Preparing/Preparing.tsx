import React from "react";
import {View} from "../base-ui"
import {styles} from "./styles";
import {ActivityIndicator} from "react-native";

export const Preparing: React.FC = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
        </View>
    )
}
