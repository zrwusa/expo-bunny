import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types/styles";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, responsive} = sizeLabor;
    const {wp, hp} = responsive.iphoneX;
    const {colors} = themeLabor.theme;
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
