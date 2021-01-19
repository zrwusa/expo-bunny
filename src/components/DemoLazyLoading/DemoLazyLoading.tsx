import React from "react";
import {Text, View} from "../base-ui"
import {styles} from "./styles";
import {ActivityIndicator} from "react-native";

export const DemoLazyLoading: React.FC = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
            <Text>Waiting fro lazy components</Text>
        </View>
    )
}

