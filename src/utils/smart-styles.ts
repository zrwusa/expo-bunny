import {JSONSerializable, SizeLabor, ThemeLabor} from "../types";
import {StyleSheet} from "react-native";

export const createSmartStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {colors, borderRadius, roundness, fonts} = themeLabor.theme;
    const {wp} = designsBasedOn.iphoneX;
    const smartStyles = StyleSheet.create({
        text: {
            color: colors.text,
        },
        text2: {
            color: colors.text2,
        },
        text3: {
            color: colors.text3,
        },
        btnText: {
            color: colors.btnText,
        },
        btnText2: {
            color: colors.btnText2,
        },
        title: {
            fontSize: ms.fs.l,
            color: colors.text,
        },
        title2: {
            fontSize: ms.fs.l,
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

        ButtonTO: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.btnBackground,
            borderRadius: borderRadius.button,
            fontSize: ms.fs.m,
            paddingVertical: ms.sp.m,
            paddingHorizontal: ms.sp.m,
        },
        TextButton: {
            flexDirection: 'row',
            borderRadius: borderRadius.button,
            fontSize: ms.fs.m,
            paddingVertical: ms.sp.m,
            paddingHorizontal: ms.sp.m,
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        LinearGradient: {
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: ms.sp.m,
            paddingHorizontal: ms.sp.m,
            borderRadius: borderRadius.button
        },
        LinearGradientButton: {
            fontSize: ms.fs.l,
            borderRadius: roundness,
            width: '100%'
        },

        Link: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: colors.btnBackground,
            borderRadius: borderRadius.button,
            fontSize: ms.fs.m,
            paddingVertical: ms.sp.m,
            paddingHorizontal: ms.sp.m,
        },

        InputButtonText: {
            color: colors.btnText,
            fontFamily: fonts.regular.fontFamily,
            fontSize: ms.fs.m,
            textAlign: 'center',
        },
        Text: {
            color: colors.text,
            fontFamily: fonts.regular.fontFamily,
        },
        Image: {
            backgroundColor: colors.backdrop,
        },
        TextInput: {
            color: colors.text,
            paddingHorizontal: ms.sp.l,
            paddingVertical: ms.sp.m,
            fontSize: ms.fs.m,
        },
        TextInputIconContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: borderRadius.input,
            borderWidth: wp(2),
            borderColor: colors.border,
            padding: wp(6)
        },
        TextInputIconIconContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center'
        },
        TextInputIcon: {
            color: colors.text,
            paddingHorizontal: ms.sp.l,
            paddingVertical: ms.sp.m,
            fontSize: ms.fs.m,
            flex: 6
        },
        IconMC: {
            color: colors.text,
            fontSize: ms.fs.xl,
        },

        card: {
            backgroundColor: colors.surface
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
        btn: {
            backgroundColor: colors.btnBackground,
        },
        btn2: {
            backgroundColor: colors.btnBackground2,
        },
        btnDisabled: {
            backgroundColor: colors.disabled
        },


        border: {},
        border2: {},
        divider: {},

        screen: {
            flex: 1,
        },
        box: {
            borderWidth: ms.sp.xxs,
            borderColor: colors.border2,
            padding: ms.sp.s,
            marginVertical: ms.sp.s,
        },
        shadow: {
            shadowColor: colors.text,
            shadowOffset: {
                width: 0,
                height: wp(11),
            },
            shadowOpacity: 0.2,
            shadowRadius: wp(14.78),
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
            shadowRadius: wp(10),
            elevation: wp(22),
            backgroundColor: colors.background, // React native bug no background no shadow on iOS
        },


        row: {
            flexDirection: 'row',
        },
        col: {
            flex: 1,
            marginRight: ms.sp.s
        },


        around: {
            justifyContent: 'space-around'
        },
        between: {
            justifyContent: 'space-between'
        },
        evenly: {
            justifyContent: 'space-evenly'
        },
        center: {
            justifyContent: 'center',
        },
        vCenter: {
            alignItems: 'center'
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

    let smartStylesObj: StyleSheet.NamedStyles<any>;
    const traversableSmartStyles = smartStyles as unknown as JSONSerializable
    smartStylesObj = Object.keys(traversableSmartStyles).reduce((newObject, key) => ({
        ...newObject,
        [key]: StyleSheet.flatten(traversableSmartStyles[key])
    }), {})


    return {smartStyles, smartStylesObj}
}
