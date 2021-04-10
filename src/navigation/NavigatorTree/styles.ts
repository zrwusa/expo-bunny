import {Platform, StyleSheet} from "react-native";
import {useSizeLabor} from "../../providers/size-labor";

export const createStyles = () => {
    const {measure, designsBasedOn} = useSizeLabor();
    const {wp} = designsBasedOn.iphoneX;
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
            marginRight: wp(10)
        }
    });
}
