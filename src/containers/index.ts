import {StyleSheet} from "react-native";
import {ms, pl} from "../styles/utils";

const containerStyle = StyleSheet.create({
    card: {
        margin: ms.sp.l,
        padding: ms.sp.m,
        borderColor: pl.grey500,
        borderWidth: ms.sp.xxs,
        borderRadius: ms.br.s,
    },
    screen: {
        flex: 1,
    },
    contentContainer: {
        justifyContent: 'center',
    },
    centralized: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default containerStyle;
