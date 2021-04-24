import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";
import {getSharedStyles} from "../../utils";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor)
    const {shadowAround} = sharedStylesFlatten;
    return StyleSheet.create({
        container: {
            paddingHorizontal: wp(20),
        },
        contentPhone: {
            marginTop: wp(10),
            marginBottom: ms.sp.m
        },
        recaptchaVerifierModal: {
            justifyContent: 'center'
        },
        error: {
            ...sharedStylesFlatten.error,
            marginTop: wp(10),
        },
        success: {
            ...sharedStylesFlatten.success,
            marginTop: wp(10),
        },
        loader: {
            marginTop: wp(10),
        },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: '#FFFFFFC0',
            justifyContent: 'center',
            alignItems: 'center',
        },
        overlayText: {
            fontWeight: 'bold',
        },
    });
}
