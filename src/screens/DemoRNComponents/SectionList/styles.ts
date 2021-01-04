import {StyleSheet} from "react-native";
import {statusBarHeight} from "../../../common/constants";
export const sectionListStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: statusBarHeight,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24
    }
})
