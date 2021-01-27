import {StyleSheet} from "react-native";
import {measure} from "../styles/helpers";
import {palette} from "../styles/theme";

const containerStyle = StyleSheet.create({
    card: {
        margin: measure.spacings.l,
        padding: measure.spacings.m,
        borderColor: palette.grey500,
        borderWidth: measure.spacings.xxs,
        borderRadius: measure.borderRadius.s,
    },
    screen: {
        flex: 1,
    },
    contentContainer: {
        justifyContent: 'center',
    },
    centralized: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default containerStyle;
