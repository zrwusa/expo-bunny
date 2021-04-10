import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;

    const ImageProgressive = StyleSheet.create({
        imageOverlay: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
        },
        container: {
            backgroundColor: colors.backdropSecondary,
        },

    });
    const PickerSelect = StyleSheet.create({
        input: {
            minWidth: wp(80),
            height: wp(30),
            backgroundColor: colors.background,
            borderWidth: wp(1),
            borderColor: colors.border,
            borderRadius: ms.br.xs,
            paddingHorizontal: ms.sp.m,
            color: colors.text,
            textAlign: 'right',
            alignItems: 'center',
            fontSize: ms.fs.m,
            // paddingRight: ms.sp.xl// to ensure the text is never behind the icon
        },
    })
    return {ImageProgressive, PickerSelect}
}
