import React from "react";
import {SafeAreaView} from "react-native";
import {Text} from "../../../components/UI";
import {getContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {createSmartStyles} from "../../../utils";

function RNFlatListScreen() {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const smartStyles = createSmartStyles(sizeLabor, themeLabor);
    return (
        <SafeAreaView style={[containerStyles.Screen, smartStyles.centralized]}>
            <Text>Safe Area View</Text>
        </SafeAreaView>
    );
}

export default RNFlatListScreen;
