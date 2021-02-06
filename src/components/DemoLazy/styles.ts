import {StyleSheet} from "react-native";
import {pl, useMeasure} from "../../styles/utils";
const getStyles = () => {
    const ms = useMeasure();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: pl.grey200,
            justifyContent: "center",
            alignItems: "center",
        },
        text: {
            fontSize: ms.fs.s
        }
    })
}
export default getStyles;
