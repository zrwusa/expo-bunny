import {StyleSheet} from "react-native";
import {ms, responsiveFromUE} from "../../styles/utils";

const {wp, hp} = responsiveFromUE.iphoneX;
const styles = StyleSheet.create({
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
export default styles;
