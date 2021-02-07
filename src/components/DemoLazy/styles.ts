import {StyleSheet} from "react-native";
import {pl} from "../../styles/utils";
import {useSizer} from "../../styles/sizer";

const getStyles = () => {
    const {ms} = useSizer();

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
