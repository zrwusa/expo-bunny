import {Button as ButtonElement, ButtonProps as ButtonElementProps} from "react-native-elements";
import {useTheme} from "react-native-paper";
import {
    Text as TextRN,
    View as ViewRN,
    TextInput as TextInputRN,
    Button as ButtonRN,
    Image as ImageRN,
    TouchableOpacity as TouchableOpacityRN,
    Share as ShareRN,
    TextProps,
    TouchableOpacityProps,
    ViewProps,
    TextInputProps,
    ButtonProps, ImageProps, StyleSheet
} from "react-native";
import React from "react";
import measure from "./measure";
import {themes} from "./themes";
import {EThemes} from "../../types/enums";
import {getStyleObj} from "./utils";

// The theme switch is not supported, but for future scalability,
// try to use the theme to standardize the definition and use of properties
const theme = themes[EThemes.DEFAULT];
export const ButtonTO: React.FC<TouchableOpacityProps> = ({children, style,...rest}) => {
    const {colors, borderRadius} = useTheme();
    const styleObj = getStyleObj(style);
    return (<TouchableOpacityRN style={{
        backgroundColor: colors.demoColor1,
        marginTop: measure.spacings.s,
        borderRadius: borderRadius.xs,
        ...styleObj
    }} {...rest} >{children}</TouchableOpacityRN>);
}

export const TextBtn: React.FC<TextProps> = ({children,style, ...rest}) => {
    const {colors, fonts} = useTheme();
    const styleObj = getStyleObj(style);
    return (<TextRN style={{
        color: colors.btnTextColor,
        paddingVertical: measure.spacings.s,
        paddingHorizontal: measure.spacings.l,
        fontFamily: fonts.regular.fontFamily,
        fontSize: measure.fontSizes.l,
        ...styleObj
    }} {...rest}>{children}</TextRN>);
}

export const View: React.FC<ViewProps> = ({children, ...rest}) => {
    const {} = useTheme();
    return (<ViewRN {...rest}>{children}</ViewRN>);
}

export const Text: React.FC<TextProps> = ({children, style, ...rest}) => {
    const {colors, fonts} = useTheme();
    const styleObj = getStyleObj(style);
    return (<TextRN style={{
        color: colors.text,
        fontFamily: fonts.regular.fontFamily,
        ...styleObj
    }} {...rest}>{children}</TextRN>);
}

export const Button: React.FC<ButtonProps> = ({children, color, ...rest}) => {
    const {colors} = useTheme();
    return (<ButtonRN color={color || colors.btnBgColor}  {...rest} />);
}

export const TouchableOpacity: React.FC<TouchableOpacityProps> = ({children, style, ...rest}) => {
    const {colors} = useTheme();
    const styleObj = getStyleObj(style);
    return (<TouchableOpacityRN
        style={{
            backgroundColor: colors.background,
            ...styleObj
        }} {...rest} >{children}</TouchableOpacityRN>);
}

export const Image: React.FC<ImageProps> = ({children, style, ...rest}) => {
    const {colors} = useTheme();
    const styleObj = getStyleObj(style);
    return (<ImageRN
        style={{
            backgroundColor: colors.background,
            ...styleObj
        }}  {...rest} >{children}</ImageRN>);
}


export const ButtonRNE: React.FC<ButtonElementProps> = ({children, buttonStyle, titleStyle, containerStyle, ...rest}) => {
    const {colors} = useTheme();
    const buttonStyleObj = getStyleObj(buttonStyle);
    const titleStyleObj = getStyleObj(titleStyle);
    const containerStyleObj = getStyleObj(containerStyle);

    return (<ButtonElement
        buttonStyle={{
            backgroundColor: colors.btnBgColor,
            borderRadius: theme.borderRadius.s,
            ...buttonStyleObj,
        }}
        titleStyle={{
            color: colors.btnTextColor,
            ...titleStyleObj
        }}
        containerStyle={{
            width: measure.sizes.s12,
            ...containerStyleObj
        }} {...rest}>{children}</ButtonElement>);
}

export const TextInput: React.FC<TextInputProps> = ({style, ...rest}) => {
    const {colors} = useTheme();
    const styleObj = getStyleObj(style);

    return (<TextInputRN
        style={{
            color: colors.text,
            paddingHorizontal: measure.spacings.l,
            paddingVertical: measure.spacings.s,
            ...styleObj
        }} {...rest} />);
}
