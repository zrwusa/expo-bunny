import {StyleSheet, Platform} from "react-native";
import {responsiveIphoneX} from "../../../styles/utils/responsive";
import {ms} from "../../../styles/utils";

const {wp, hp} = responsiveIphoneX;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(16),
        paddingVertical: wp(12),
    },
    switch: Platform.select(
        {
            ios: {
                width: wp(36),
                height: wp(32),
                marginRight: ms.sp.m
            },
            default: {
                width: wp(20),
                height: wp(20),
                marginRight: ms.sp.s
            }
        }
    )


});
export default styles;
