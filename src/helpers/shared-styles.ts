import {JSONSerializable, SizeLabor, ThemeLabor} from "../types";
import {StyleSheet} from "react-native";

export const getSharedStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {colors, borderRadius, roundness, fonts} = themeLabor.theme;
    const {wp} = designsBasedOn.iphoneX;
    const sharedStyles = StyleSheet.create({
        text: {
            color: colors.text,
        },
        text2: {
            color: colors.text2,
        },
        text3: {
            color: colors.text3,
        },
        buttonText: {
            color: colors.buttonText,
        },
        buttonText2: {
            color: colors.buttonText2,
        },
        title: {
            fontSize: ms.fs.l,
            color: colors.text,
        },
        title2: {
            fontSize: ms.fs.m,
            color: colors.text2,
        },
        h1: {
            fontSize: ms.fs.xxl,
            color: colors.text,
        },
        h2: {
            fontSize: ms.fs.xl,
            color: colors.text2,
        },
        h3: {
            fontSize: ms.fs.l,
            color: colors.text3,
        },
        h4: {
            fontSize: ms.fs.m,
            color: colors.text3,
        },
        h5: {
            fontSize: ms.fs.s,
            color: colors.text3,
        },
        h6: {
            fontSize: ms.fs.xs,
            color: colors.text3,
        },
        label: {
            fontSize: ms.fs.s,
            color: colors.text,
        },
        caption: {
            color: colors.caption,
        },
        caption2: {
            color: colors.caption2,
        },
        paragraph: {
            fontFamily: fonts.regular.fontFamily,
            // fontWeight: fonts.regular.fontWeight, //Todo fontWeight is optional,DeepLeavesWrap deals with it incorrectly
            fontSize: ms.fontSizes.m,
            lineHeight: ms.lh.m,
            color: colors.paragraph
        },
        paragraph2: {
            fontFamily: fonts.regular.fontFamily,
            // fontWeight: fonts.regular.fontWeight, //Todo fontWeight is optional,DeepLeavesWrap deals with it incorrectly
            fontSize: ms.fontSizes.m,
            lineHeight: ms.lh.m,
            color: colors.paragraph2
        },

        card: {
            backgroundColor: colors.surface,
            borderRadius: borderRadius.surface,
        },
        card2: {
            backgroundColor: colors.surface2,
        },
        paper: {
            backgroundColor: colors.paper,
        },
        paper2: {
            backgroundColor: colors.paper2,
        },
        button: {
            backgroundColor: colors.btnBackground,
            borderRadius: borderRadius.button,
            fontSize: ms.fs.m,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: ms.sp.m,
            paddingHorizontal: ms.sp.m,
        },
        button2: {
            backgroundColor: colors.btnBackground2,
            borderRadius: borderRadius.button,
            fontSize: ms.fs.m,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: ms.sp.m,
            paddingHorizontal: ms.sp.m,
        },
        buttonDisabled: {
            backgroundColor: colors.disabled
        },

        shadow: {
            shadowColor: colors.backdrop,
            shadowOffset: {
                width: 0,
                height: wp(2),
            },
            shadowOpacity: 0.6,
            shadowRadius: wp(10),
            elevation: wp(22),
            backgroundColor: colors.background, // React native bug no background no shadow on iOS
        },
        shadowAround: {
            shadowColor: colors.backdrop,
            shadowOffset: {
                width: wp(0),
                height: wp(0),
            },
            shadowOpacity: 0.6,
            shadowRadius: wp(8),
            elevation: wp(22),
            backgroundColor: colors.background, // React native bug no background no shadow on iOS
        },


        centralized: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        absoluteBottomLeft: {
            position: 'absolute',
            bottom: 0,
            left: 0,
        },


        section: {},
        header: {},
        content: {},
        article: {},
        footer: {},

    })

    let sharedStylesFlatten: StyleSheet.NamedStyles<any>;
    const traversableSmartStyles = sharedStyles as unknown as JSONSerializable
    sharedStylesFlatten = Object.keys(traversableSmartStyles).reduce((newObject, key) => ({
        ...newObject,
        [key]: StyleSheet.flatten(traversableSmartStyles[key])
    }), {})


    return {sharedStyles, sharedStylesFlatten}
}
