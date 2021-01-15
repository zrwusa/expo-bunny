import React from "react";
import {SafeAreaView} from "react-native";
import {safeAreaViewStyles} from "./styles";
import {Text} from "../../../components/base-ui";

export const RNFlatListScreen: React.FC = () => {
    return (
        <SafeAreaView style={safeAreaViewStyles.container}>
            <Text>Safe Area View</Text>
        </SafeAreaView>
    );
}

export default RNFlatListScreen;
