import {Platform, StyleSheet} from "react-native";
import {useSizeLabor} from "../../providers/sizeLabor";

export const getStyles = () => {
    const {measure, responsive} = useSizeLabor();
    const {wp} = responsive.iphoneX;
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
        },
        settingBox: {
            flexDirection: 'row'
        }
    });
}
