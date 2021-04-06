import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
        },
        text: {
            fontSize: ms.fs.s
        }
    })
}

