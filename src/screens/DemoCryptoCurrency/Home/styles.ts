import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../../types";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, responsive} = sizeLabor;
    const {wp, hp} = responsive.iphoneX;
    const {colors} = themeLabor.theme;

    return StyleSheet.create({
        btcChart: {
            marginTop:wp(6),
            paddingBottom:wp(6)
        }
    });
}
