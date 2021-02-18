import React from "react";
import {View} from "../base-ui"
import {getStyles} from "./styles";
import {ActivityIndicator} from "react-native";
import {useSizer} from "../../styles/sizer";
import {useTheme} from "../../styles/theme";

export const Preparing: React.FC = () => {
    const sizer = useSizer();
    const theme = useTheme();
    const styles = getStyles(sizer,theme)
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
        </View>
    )
}
