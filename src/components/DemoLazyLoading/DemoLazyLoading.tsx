import React from "react";
import {Text, View} from "../UI"
import {getStyles} from "./styles";
import {ActivityIndicator} from "react-native";
import {useSizeLabor} from "../../providers/sizeLabor";
import {useThemeLabor} from "../../providers/themeLabor";

export const DemoLazyLoading: React.FC = () => {
    const sizeLabor = useSizeLabor()
    const themeLabor = useThemeLabor();
    const styles = getStyles(sizeLabor, themeLabor);
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
            <Text>Waiting fro lazy components</Text>
        </View>
    )
}

