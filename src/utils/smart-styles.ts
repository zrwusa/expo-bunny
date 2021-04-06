import {JSONSerializable, SizeLabor, ThemeLabor} from "../types";
import {StyleSheet} from "react-native";

export const createSmartStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {colors, fonts} = themeLabor.theme;
    const {wp} = designsBasedOn.iphoneX;
    const smartStyles = StyleSheet.create({
        h1: {
            fontSize: ms.fs.xxl,
            color: colors.title,
        },
        h2: {
            fontSize: ms.fs.xl,
            color: colors.titleSecondary,
        },
        h3: {
            fontSize: ms.fs.l,
            color: colors.titleSecondary,
        },
        h4: {
            fontSize: ms.fs.m,
            color: colors.titleSecondary,
        },
        h5: {
            fontSize: ms.fs.s,
            color: colors.titleSecondary,
        },
        h6: {
            fontSize: ms.fs.xs,
            color: colors.titleSecondary,
        },
        title: {
            fontSize: ms.fs.l,
            color: colors.title,
        },
        titleSecondary: {
            fontSize: ms.fs.l,
            color: colors.titleSecondary,
        },
        paragraph: {
            fontFamily: fonts.regular.fontFamily,
            // fontWeight: fonts.regular.fontWeight, //Todo fontWeight is optional,DeepLeavesWrap deals with it incorrectly
            fontSize: ms.fontSizes.m,
            lineHeight: ms.lh.m,
            color: colors.paragraph
        },
        paragraphSecondary: {
            fontFamily: fonts.regular.fontFamily,
            // fontWeight: fonts.regular.fontWeight, //Todo fontWeight is optional,DeepLeavesWrap deals with it incorrectly
            fontSize: ms.fontSizes.m,
            lineHeight: ms.lh.m,
            color: colors.paragraphSecondary
        },
        btn: {
            backgroundColor: colors.primary,
        },
        btnSecondary: {
            backgroundColor: colors.secondary,
        },
        btnDisabled: {
            backgroundColor: colors.disabled
        },
        text: {
            color: colors.text,
        },
        textSecondary: {
            color: colors.textSecondary,
        },
        caption: {
            color: colors.caption,
        },
        captionSecondary: {
            color: colors.captionSecondary,
        },
        surface: {
            backgroundColor: colors.surface,
        },
        surfaceSecondary: {
            backgroundColor: colors.surfaceSecondary,
        },
        box: {
            borderWidth: ms.sp.xxs,
            borderColor: colors.borderSecondary,
            padding: ms.sp.s,
            marginVertical: ms.sp.s,
        },
        row: {
            flexDirection: 'row',
        },
        col: {
            flex: 1,
            marginRight: ms.sp.s
        },
        col1: {
            flex: 1,
            marginRight: ms.sp.s
        },
        col2: {
            flex: 2,
            marginRight: ms.sp.s
        },
        col3: {
            flex: 3,
            marginRight: ms.sp.s
        },
        col4: {
            flex: 4,
            marginRight: ms.sp.s
        },
        colLast: {
            marginRight: 0
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
        shadow: {
            shadowColor: colors.text,
            shadowOffset: {
                width: 0,
                height: wp(11),
            },
            shadowOpacity: 0.2,
            shadowRadius: wp(14.78),
            elevation: wp(22),
        },
        screen: {
            flex: 1,
        },
        vCenter: {
            alignItems: 'center'
        },
        centralized: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        section: {},
        header: {},
        content: {},
        article: {},
        footer: {},
        absoluteBottomLeft: {
            position: 'absolute',
            bottom: 0,
            left: 0,
        },
    })

    let smartStylesObj: StyleSheet.NamedStyles<any>;
    const traversableSmartStyles = smartStyles as unknown as JSONSerializable
    smartStylesObj = Object.keys(traversableSmartStyles).reduce((newObject, key) => ({
        ...newObject,
        [key]: StyleSheet.flatten(traversableSmartStyles[key])
    }), {})


    return {smartStyles, smartStylesObj}
}
