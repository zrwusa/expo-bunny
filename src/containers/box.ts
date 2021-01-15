import {StyleSheet} from "react-native";
import measure from "../components/base-ui/measure";
import palette from "../components/base-ui/palette";

const containerStyle = StyleSheet.create({
    box:{
        padding:measure.spacings.m,
        borderColor:palette.grey500,
        borderWidth:measure.spacings.xxs,
        margin:measure.spacings.l,
        borderRadius:measure.borderRadius.s,
    }
});
export default containerStyle;
