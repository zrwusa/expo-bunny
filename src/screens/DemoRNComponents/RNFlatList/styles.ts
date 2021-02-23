import {StyleSheet} from "react-native";
import {SizeLabor, Theme, ThemeLabor} from "../../../types/styles";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, responsive} = sizeLabor;
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

