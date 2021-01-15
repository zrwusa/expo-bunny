import {StyleSheet} from "react-native";
import {measure} from "../styles/helpers";
import {palette} from "../styles/theme";

const containerStyle = StyleSheet.create({
    box:{
        padding:measure.spacings.m,
        borderColor:palette.grey500,
        borderWidth:measure.spacings.xxs,
        margin:measure.spacings.l,
        borderRadius:measure.borderRadius.s,
        width:measure.sizes.s11
    }
});
export default containerStyle;
