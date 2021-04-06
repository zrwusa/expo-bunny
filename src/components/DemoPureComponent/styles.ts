import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {iphoneX} = sizeLabor.designsBasedOn;
    const {wp} = iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        demoSizeLabor: {
            width: wp(100),
            height: wp(20),
            backgroundColor: colors.secondary,
        }
    });
}
