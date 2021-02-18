import {StyleSheet} from "react-native";
import {Sizer, Theme} from "../../../types/styles";

export const getStyles = (sizer: Sizer, theme: Theme) => {
    const {ms, responsive} = sizer;
    const {wp, hp} = responsive.iphoneX;
    return StyleSheet.create({
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
    });
}
