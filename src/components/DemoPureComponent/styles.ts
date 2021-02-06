import {StyleSheet} from "react-native";
import {SmartStyle} from "../../types/styles";

export const getStyles = (smartStyle: SmartStyle) => {
    const {iphoneX} = smartStyle.responsive;
    const {wp} = iphoneX
    return StyleSheet.create({
        demoResponsive: {
            width: wp(100),
            height: wp(20),
            backgroundColor: "yellow",
        }
    });
}
