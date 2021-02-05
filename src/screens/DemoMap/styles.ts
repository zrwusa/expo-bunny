import {Dimensions, StyleSheet} from "react-native";
import responsiveFromUE from "../../styles/utils";
import {ms} from "../../styles/utils";

const {wp, hp} = responsiveFromUE.iphoneX;
const {width, height} = Dimensions.get("window");

export const CARD_HEIGHT = height / 4;
export const CARD_WIDTH = CARD_HEIGHT - 50;

const styles = StyleSheet.create({
    mapView: {
        flex: 1,
    },
    scrollView: {
        position: "absolute",
        bottom: wp(30),
        left: 0,
        right: 0,
        paddingVertical: ms.sp.xs,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: ms.sp.s,
        elevation: wp(2),
        backgroundColor: "#FFF",
        marginHorizontal: ms.sp.m,
        shadowColor: "#000",
        shadowRadius: ms.br.xs,
        shadowOpacity: 0.3,
        shadowOffset: {width: ms.sp.xs, height: -ms.sp.xs},
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: ms.fs.xs,
        marginTop: ms.sp.s,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: ms.fs.xs,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: wp(20),
        height: wp(20),
        borderRadius: ms.br.s,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    ring: {
        width: wp(28),
        height: wp(28),
        borderRadius: ms.br.m,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: ms.sp.xxs,
        borderColor: "rgba(130,4,150, 0.5)",
    },
});
export default styles;
