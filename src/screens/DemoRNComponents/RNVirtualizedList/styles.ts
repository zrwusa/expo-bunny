import {StyleSheet} from "react-native";
import Consts from "../../../common/constants";

export const virtualizedListStyles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: Consts.statusBarHeight,
    },
    item: {
        backgroundColor: '#bfbfbf',
        height: 150,
        justifyContent: 'center',
        marginVertical: 2,
        marginHorizontal: 2,
        padding: 20,
    },
    title: {
        fontSize: 32,
    },
})
