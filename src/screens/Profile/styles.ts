import {StyleSheet} from "react-native";
import {useTheme} from "../../styles/theme"
import {useSizer} from "../../styles/sizer";

export const getStyles = () => {
    const {colors} = useTheme()
    const {ms, responsive} = useSizer();
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
