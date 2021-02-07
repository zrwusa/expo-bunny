import {StyleSheet} from "react-native";
import {Sizer} from "../../types/styles";

export const getStyles = (sizer: Sizer) => {
    const {iphoneX} = sizer.responsive;
    const {wp} = iphoneX
    return StyleSheet.create({
        demoSizer: {
            width: wp(100),
            height: wp(20),
            backgroundColor: "yellow",
        }
    });
}
