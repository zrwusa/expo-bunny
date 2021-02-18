import {StyleSheet} from "react-native";
import {Sizer, Theme} from "../../../types/styles";

export const getStyles = (sizer: Sizer, theme: Theme) => {
    const {ms, responsive} = sizer;
    const {wp, hp} = responsive.iphoneX;
    return StyleSheet.create({
        container: {
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
    });
}
