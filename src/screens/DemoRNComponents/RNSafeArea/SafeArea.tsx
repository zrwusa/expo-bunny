import React from "react";
import {SafeAreaView, Text} from "react-native";
import {safeAreaViewStyles} from "./styles";

export const RNFlatListScreen: React.FC = () => {
    return (
        <SafeAreaView style={safeAreaViewStyles.container}>
            <Text>Safe Area View</Text>
        </SafeAreaView>
    );
}

export default RNFlatListScreen;
