import {StyleSheet} from "react-native";
import {Sizer, Theme} from "../../../types/styles";

export const getStyles = (sizer: Sizer, theme: Theme) => {
    const {ms, responsive} = sizer;
    const {wp, hp} = responsive.iphoneX;
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

