import {StyleSheet} from "react-native";
import {pl} from "../styles/utils";
import {SmartStyle} from "../types/styles";

const getContainerStyles = (smartStyle: SmartStyle) => {
    debugger
    const {ms} = smartStyle;
    return StyleSheet.create({
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
}
export default getContainerStyles;
