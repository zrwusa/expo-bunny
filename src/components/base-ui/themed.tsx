import {Button as ButtonElement, ButtonProps as ButtonElementProps} from "react-native-elements";
import {DefaultTheme, useTheme} from "../../styles/theme";
import {
    Text as TextRN,
    View as ViewRN,
    TextInput as TextInputRN,
    Button as ButtonRN,
    Image as ImageRN,
    TouchableOpacity as TouchableOpacityRN,
    Pressable as PressableRN,
    Share as ShareRN,
    TextProps,
    TouchableOpacityProps,
    ViewProps,
    TextInputProps,
    ButtonProps, ImageProps, StyleSheet, PressableProps
} from "react-native";
import React from "react";
import {getStyleObj, measure} from "../../styles/helpers";
import styled from "styled-components/native";
import IconVector from "react-native-vector-icons/MaterialCommunityIcons";
import {IconProps} from "react-native-vector-icons/Icon";

// The theme switch is not supported, but for future scalability,
// try to use the theme to standardize the definition and use of properties
export const ButtonTO: React.FC<TouchableOpacityProps> = ({children, style, ...rest}) => {
    const {colors, borderRadius} = useTheme();
    const styleObj = getStyleObj(style);
    return (<TouchableOpacityRN style={{
        backgroundColor: colors.demoColor1,
        marginTop: measure.spacings.s,
        borderRadius: borderRadius.xs,
        fontSize: measure.fontSizes.m,
        ...styleObj
    }} {...rest} >{children}</TouchableOpacityRN>);
}

export const TextBtn: React.FC<TextProps> = ({children, style, ...rest}) => {
    const {colors, fonts} = useTheme();
    const styleObj = getStyleObj(style);
    return (<TextRN style={{
        color: colors.btnTextColor,
        paddingVertical: measure.spacings.s,
        paddingHorizontal: measure.spacings.m,
        fontFamily: fonts.regular.fontFamily,
        fontSize: measure.fontSizes.m,
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

export const Pressable: React.FC<PressableProps> = ({children, style, ...rest}) => {
    const {colors} = useTheme();
    const styleObj = getStyleObj(style);
    return (<PressableRN
        style={{
            backgroundColor: colors.background,
            ...styleObj
        }} {...rest} >{children}</PressableRN>);
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
    const {colors, borderRadius} = useTheme();
    const buttonStyleObj = getStyleObj(buttonStyle);
    const titleStyleObj = getStyleObj(titleStyle);
    const containerStyleObj = getStyleObj(containerStyle);

    return (<ButtonElement
        buttonStyle={{
            backgroundColor: colors.btnBgColor,
            borderRadius: borderRadius.s,
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
export const Icon: React.FC<IconProps> = ({children, style, name, ...rest}) => {
    const {colors} = useTheme();
    const styleObj = getStyleObj(style);
    return (<IconVector
        name={name}
        style={{
            color: colors.background,
            ...styleObj
        }}  {...rest} >{children}</IconVector>);
}

export const Icon1 = styled(IconVector)`
  font-size: ${measure.fontSizes.m}px;
  color:${DefaultTheme.colors.primary};
  padding: ${measure.spacings.s}px;
`
