import React from "react";
import {Text, View} from "../UI"
import {createStyles} from "./styles";
import {ActivityIndicator} from "react-native";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";

export function DemoLazyLoading() {
    const sizeLabor = useSizeLabor()
    const themeLabor = useThemeLabor();
    const styles = createStyles(sizeLabor, themeLabor);
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
            <Text>Waiting fro lazy components</Text>
        </View>
    )
}

