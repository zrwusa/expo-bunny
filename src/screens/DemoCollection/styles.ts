import {StyleSheet} from "react-native";
import {palette} from "../../styles/theme";
import {measure} from "../../styles/helpers";

const styles = StyleSheet.create({
    container: {
        backgroundColor:palette.transparent,
        padding:measure.spacings.m
    },
});
export default styles;
