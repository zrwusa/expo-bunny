import {StyleSheet} from "react-native";
import {Sizer, Theme} from "../../types/styles";

export const getStyles = (sizer: Sizer, theme: Theme) => {
    const {ms, responsive} = sizer;
    const {wp, hp} = responsive.iphoneX;
    return StyleSheet.create({
        logo: {
            width: 305,
            height: 159,
            marginBottom: 20,
        },
        instructions: {
            color: '#888',
            fontSize: 18,
            marginHorizontal: 15,
            marginBottom: 10,
        },
        button: {
            padding: 20,
            borderRadius: 5,
        },
        buttonText: {
            fontSize: 20,
            color: '#fff',
        },
        thumbnail: {
            width: 300,
            height: 300,
            resizeMode: 'contain',
        },
    });
}
