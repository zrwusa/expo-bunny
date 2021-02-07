import React from "react";
import {SafeAreaView} from "react-native";
import {Text} from "../../../components/base-ui";
import getContainerStyles from "../../../containers";
import {useSizer} from "../../../styles/sizer";
import {useTheme} from "../../../styles/theme";

const RNFlatListScreen: React.FC = () => {
    const sizer = useSizer();
    const theme = useTheme();
    const containerStyles = getContainerStyles(sizer, theme);

    return (
        <SafeAreaView style={[containerStyles.screen, containerStyles.centralized]}>
            <Text>Safe Area View</Text>
        </SafeAreaView>
    );
}

export default RNFlatListScreen;
