import {StyleSheet, Platform} from "react-native";
import {useMeasure} from "../../../styles/utils";
import {useResponsive} from "../../../styles/responsive";


export const getStyle = () => {
    const ms = useMeasure();
    const responsive = useResponsive();
    const {wp, hp} = responsive.iphoneX;
    return StyleSheet.create({
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
}
