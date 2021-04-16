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
            backgroundColor: colors.backdrop,
        },

    });
    const PickerSelect = StyleSheet.create({
        viewContainer: {width: '100%'},
        inputContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
        iconContainer: {
            position: 'relative',
        },
        input: {
            height: wp(30),
            backgroundColor: colors.background,
            borderColor: colors.transparent,
            paddingHorizontal: ms.sp.m,
            color: colors.text,
            fontSize: ms.fs.m,
        },
        modalViewTop:{
        },
        modalViewMiddle:{
            backgroundColor:colors.background2,
            borderTopColor:colors.border
        },
        modalViewBottom:{
            backgroundColor:colors.background,

        }
    })
    return {ImageProgressive, PickerSelect}
}
