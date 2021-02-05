import {Platform, StyleSheet} from "react-native";
import {useMeasure} from "../../styles/utils";
import {useResponsive} from "../../styles/responsive";

export const getStyles = () => {
    const responsiveFromUE = useResponsive();
    const measure = useMeasure()

    const {wp, hp} = responsiveFromUE.iphoneX;
    return StyleSheet.create({
        headerBackImage: {
            fontSize: measure.fontSizes.xxl,
        },
        headerStyle: {
            height: Platform.select({
                web: wp(50),
            })
        },
        drawerHeadLeftIcon: {
            paddingLeft: measure.spacings.l,
            fontSize: measure.fontSizes.l,
        },
        headerTitleStyle: {
            fontSize: measure.fontSizes.m
        }
    });
}
