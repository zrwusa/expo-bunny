import React from "react";
import {SafeAreaView} from "react-native";
import {Text} from "../../../components/base-ui";
import containerStyle from "../../../containers";

const RNFlatListScreen: React.FC = () => {
    return (
        <SafeAreaView style={[containerStyle.screen, containerStyle.centralized]}>
            <Text>Safe Area View</Text>
        </SafeAreaView>
    );
}

export default RNFlatListScreen;
