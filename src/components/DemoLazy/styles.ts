import {StyleSheet} from "react-native";
import {pl} from "../../styles/utils";
import {useSmartStyle} from "../../styles/smart-style";

const getStyles = () => {
    const {ms} = useSmartStyle();

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
