import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../../types/styles";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
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

