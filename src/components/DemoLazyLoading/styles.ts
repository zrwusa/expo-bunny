import {StyleSheet} from "react-native";
import {ms} from "../../styles/utils";
import {pl} from "../../styles/utils";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: pl.grey200,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: pl.cyan600,
        fontSize: ms.fs.s
    }
})
