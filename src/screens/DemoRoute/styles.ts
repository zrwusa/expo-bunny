import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types/styles";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, responsive} = sizeLabor;
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
