import {StyleSheet} from "react-native";
import {useMeasure} from "../../styles/utils";
import {pl} from "../../styles/utils";

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
            color: pl.cyan600,
            fontSize: ms.fs.s
        }
    })
}
export default getStyles;
