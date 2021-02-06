import {StyleSheet} from "react-native";
import {useTheme} from "../../styles/theme"
import {useSmartStyle} from "../../styles/smart-style";

export const getStyles = () => {
    const {colors} = useTheme()
    const {ms, responsive} = useSmartStyle();
    const {wp, hp} = responsive.iphoneX;
    return StyleSheet.create({
        imageProgressive: {
            width: wp(370),
            height: wp(600)
        },
        tallBlock: {
            height: 2000
        },
    });
}
