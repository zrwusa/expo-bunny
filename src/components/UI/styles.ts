import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";
import {getSharedStyles} from "../../utils";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors, borderRadius, roundness, fonts} = themeLabor.theme;
    const {sharedStyles, sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor)
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
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
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
        modalViewTop: {},
        modalViewMiddle: {
            backgroundColor: colors.background2,
            borderTopColor: colors.border
        },
        modalViewBottom: {
            backgroundColor: colors.background,

        }
    })


    const ButtonTO = StyleSheet.create({
        ButtonTO: {
            ...sharedStylesFlatten.button,
        }
    })

    const LinkButton = StyleSheet.create({
        LinkButton: {
            ...sharedStylesFlatten.button,
        },
    })

    const TextButton = StyleSheet.create({
        TextButton: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: ms.fs.m,
            paddingVertical: ms.sp.m,
            paddingHorizontal: ms.sp.m,
        },
    })

    const LinearGradientButton = StyleSheet.create({
        container: {
            fontSize: ms.fs.l,
            borderRadius: borderRadius.button,
            width: '100%'
        },
        linearGradient: {
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: ms.sp.m,
            paddingHorizontal: ms.sp.m,
            borderRadius: borderRadius.button
        },
    })


    const InputButtonText = StyleSheet.create({
        InputButtonText: {
            color: colors.btnText,
            fontFamily: fonts.regular.fontFamily,
            fontSize: ms.fs.m,
            textAlign: 'center',
        },
    })

    const Text = StyleSheet.create({
        Text: {
            ...sharedStylesFlatten.text,
        },
    })

    const Image = StyleSheet.create({
        Image: {
            backgroundColor: colors.backdrop,
        },
    })

    const TextInput = StyleSheet.create({
        TextInput: {
            color: colors.text,
            paddingHorizontal: ms.sp.l,
            paddingVertical: ms.sp.m,
            fontSize: ms.fs.m,
        },
    })

    const TextInputIcon = StyleSheet.create({
        input: {
            color: colors.text,
            paddingHorizontal: ms.sp.l,
            paddingVertical: ms.sp.m,
            fontSize: ms.fs.m,
            flex: 6
        },
        iconContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center'
        },
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: borderRadius.input,
            borderWidth: wp(2),
            borderColor: colors.border,
            padding: wp(6)
        },
    })

    const IconMC = StyleSheet.create({
        IconMC: {
            color: colors.text,
            fontSize: ms.fs.xl,
        },
    })

    return {
        ImageProgressive, PickerSelect, ButtonTO, TextButton,
        LinearGradientButton, LinkButton, InputButtonText, Text,
        Image, TextInput, TextInputIcon, IconMC
    }
}
