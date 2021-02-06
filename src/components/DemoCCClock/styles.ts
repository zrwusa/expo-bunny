import {StyleSheet} from "react-native";
import {Measure, Responsive} from "../../types/styles";

export const getStyles = (responsive: Responsive, ms?: Measure) => {
    const {iphoneX} = responsive;
    const {wp} = iphoneX
    return StyleSheet.create({});
}
