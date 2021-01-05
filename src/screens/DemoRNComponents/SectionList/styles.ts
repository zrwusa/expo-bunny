import {StyleSheet} from "react-native";
import {statusBarHeight} from "../../../common/constants";
export const sectionListStyles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: statusBarHeight,
        marginHorizontal: 2
    },
    item: {
        backgroundColor: "#efefef",
        padding: 20,
        marginVertical: 1
    },
    header: {
        fontSize: 32,
        backgroundColor: "#ddd"
    },
    title: {
        fontSize: 24
    }
})
