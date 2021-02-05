import {StyleSheet} from "react-native";
import {Measure, pl, useMeasure} from "../styles/utils";
import {Responsive} from "../types/styles";
import {useResponsive} from "../styles/responsive";

const getContainerStyles = (measureParam?: Measure, responsiveParam?: Responsive) => {
    const ms = measureParam || useMeasure();
    const responsive = responsiveParam || useResponsive()
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
