import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../../types/styles";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    return StyleSheet.create({
        inner: {
            padding: 24,
            flex: 1,
            justifyContent: "space-around"
        },
        header: {
            fontSize: 36,
            marginBottom: 48
        },
        textInput: {
            height: 40,
            borderColor: "#000000",
            borderBottomWidth: 1,
            marginBottom: 36
        },
        btnContainer: {
            backgroundColor: "white",
        }
    });
}

