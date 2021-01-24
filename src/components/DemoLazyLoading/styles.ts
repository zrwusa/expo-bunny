import {StyleSheet} from "react-native";
import {palette} from "../../styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.grey200,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: palette.cyan600,
        fontSize: 16
    }
})
