import {StyleSheet} from "react-native";
import {Sizer, Theme} from "../../types/styles";

export const getStyles = (sizer: Sizer, theme: Theme) => {
    const {ms, responsive} = sizer;
    const {wp, hp} = responsive.iphoneX;
    return StyleSheet.create({
        wrap: {
            alignItems: 'flex-start',
        },
        text: {
            color: '#FF0000',
            marginTop: 10
        },
    });
}
