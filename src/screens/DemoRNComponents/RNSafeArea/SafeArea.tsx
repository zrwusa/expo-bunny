import React from "react";
import {SafeAreaView} from "react-native";
import {Text} from "../../../components/base-ui";
import getContainerStyles from "../../../containers";
import {useSmartStyle} from "../../../styles/smart-style";

const RNFlatListScreen: React.FC = () => {
    const smartStyle = useSmartStyle();
    const containerStyles = getContainerStyles(smartStyle);

    return (
        <SafeAreaView style={[containerStyles.screen, containerStyles.centralized]}>
            <Text>Safe Area View</Text>
        </SafeAreaView>
    );
}

export default RNFlatListScreen;
