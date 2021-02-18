import {StyleSheet} from "react-native";
import {Sizer, Theme} from "../../../types/styles";

export const getStyles = (sizer: Sizer, theme: Theme) => {
    const {ms, responsive} = sizer;
    const {wp, hp} = responsive.iphoneX;
    return StyleSheet.create({
        item: {
            backgroundColor: "#bfbfbf",
            padding: 20,
            marginVertical: 1,
            marginHorizontal: 2,
        },
        title: {
            fontSize: 32,
        },
    });
}

