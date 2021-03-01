import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";
import {createSmartStyles} from "../../utils";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, responsive} = sizeLabor;
    const {wp, hp} = responsive.iphoneX;
    const {absoluteBottomLeft} = createSmartStyles(sizeLabor, themeLabor);
    const {colors} = themeLabor.theme;

    const ImageProgressive = StyleSheet.create({
        imageOverlay: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
        },
        container: {
            backgroundColor: '#e1e4e8',
        },
    });
    return {ImageProgressive}
}
