import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../../types";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
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
