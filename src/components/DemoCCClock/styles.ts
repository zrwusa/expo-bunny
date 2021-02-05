import {Platform, StyleSheet} from "react-native";
import {Measure} from "../../styles/utils";
import {Responsive} from "../../types/styles";

export const getStyles = (ms: Measure, responsive: Responsive) => {
    const {iphoneX} = responsive;
    const {wp, hp} = iphoneX
    return StyleSheet.create({
        demoMeasureAndResponsive: {
            width: wp(200),
            height: ms.fs.xxl,
            backgroundColor: "yellow",
        }
    });
}
