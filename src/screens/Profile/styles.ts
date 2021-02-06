import {StyleSheet} from "react-native";
import {useTheme} from "../../styles/theme"
import {useMeasure} from "../../styles/utils";
import {useResponsive} from "../../styles/responsive";

export const getStyles = () => {
    const {colors} = useTheme()
    const responsiveFromUE = useResponsive()
    const ms = useMeasure()

    const {wp, hp} = responsiveFromUE.iphoneX;
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
