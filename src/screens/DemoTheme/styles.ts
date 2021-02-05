import {StyleSheet} from "react-native";
import {useResponsive} from "../../styles/responsive";
import {useMeasure} from "../../styles/utils";

export const getStyles = () => {
    const responsive = useResponsive()
    const ms = useMeasure();
    const {wp} = responsive.iphoneX;
    return StyleSheet.create({
        demoShadow: {
            width: wp(300),
            height: wp(50),
            borderRadius: ms.br.s,
            backgroundColor: "#fff",

            elevation: wp(22),
            justifyContent: "center",
            alignItems: "center",

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: wp(11),
            },
            shadowOpacity: 0.2,
            shadowRadius: wp(14.78)
        }
    });
}
