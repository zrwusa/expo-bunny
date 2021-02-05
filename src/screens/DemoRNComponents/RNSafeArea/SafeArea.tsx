import React from "react";
import {SafeAreaView} from "react-native";
import {Text} from "../../../components/base-ui";
import getContainerStyles from "../../../containers";

const RNFlatListScreen: React.FC = () => {
    const containerStyles = getContainerStyles()

    return (
        <SafeAreaView style={[containerStyles.screen, containerStyles.centralized]}>
            <Text>Safe Area View</Text>
        </SafeAreaView>
    );
}

export default RNFlatListScreen;
