import React from "react";
import {SafeAreaView} from "react-native";
import {Text} from "../../../components/UI";
import getContainerStyles from "../../../containers";
import {useSizeLabor} from "../../../providers/sizeLabor";
import {useThemeLabor} from "../../../providers/themeLabor";

function RNFlatListScreen() {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);

    return (
        <SafeAreaView style={[containerStyles.screen, containerStyles.centralized]}>
            <Text>Safe Area View</Text>
        </SafeAreaView>
    );
}

export default RNFlatListScreen;
