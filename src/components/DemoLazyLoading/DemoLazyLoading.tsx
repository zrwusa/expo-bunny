import React from "react";
import {Text, View} from "../base-ui"
import getStyles from "./styles";
import {ActivityIndicator} from "react-native";

export const DemoLazyLoading: React.FC = () => {
    const styles = getStyles();
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
            <Text>Waiting fro lazy components</Text>
        </View>
    )
}

