import {StyleSheet} from "react-native";
import {SizeLabor, Theme, ThemeLabor} from "../../../types";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, responsive} = sizeLabor;
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
