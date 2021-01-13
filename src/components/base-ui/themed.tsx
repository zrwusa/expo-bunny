import {Button as ButtonElement, ButtonProps as ButtonElementProps} from "react-native-elements";
import {useTheme} from "react-native-paper";
import {
    Text as TextRN,
    View as ViewRN,
    TextInput as TextInputRN,
    Button as ButtonRN,
    TextProps,
    TouchableOpacityProps,
    ViewProps,
    TextInputProps,
    ButtonProps
} from "react-native";
import {TouchableOpacity} from "react-native";
import React from "react";
import measure from "./measure";
import {themes} from "./themes";
import {EThemes} from "../../types/enums";

// The theme switch is not supported, but for future scalability,
// try to use the theme to standardize the definition and use of properties
const theme = themes[EThemes.DEFAULT];
export const ButtonTO: React.FC<TouchableOpacityProps> = ({children, ...rest}) => {
    const {colors, borderRadius} = useTheme();
    return (<TouchableOpacity style={{
        backgroundColor: colors.demoColor1,
        marginTop: measure.spacings.s,
        borderRadius: borderRadius.xs,
    }} {...rest} >{children}</TouchableOpacity>);
}

export const TextBtn: React.FC<TextProps> = ({children, ...rest}) => {
    const {colors, fonts} = useTheme();
    return (<TextRN style={{
        color: colors.btnTextColor,
        paddingVertical: measure.spacings.s,
        paddingHorizontal: measure.spacings.l,
        fontFamily: fonts.regular.fontFamily
    }} {...rest}>{children}</TextRN>);
}

export const View: React.FC<ViewProps> = ({children, ...rest}) => {
    const {colors, fonts} = useTheme();
    return (<ViewRN {...rest}>{children}</ViewRN>);
}

export const Text: React.FC<TextProps> = ({children, ...rest}) => {
    const {colors, fonts} = useTheme();
    return (<TextRN style={{
        color: colors.text,
        paddingVertical: measure.spacings.s,
        paddingHorizontal: measure.spacings.l,
        fontFamily: fonts.regular.fontFamily
    }} {...rest}>{children}</TextRN>);
}

export const Button: React.FC<ButtonProps> = ({children, ...rest}) => {
    const {colors} = useTheme();
    return (<ButtonRN color={colors.btnBgColor}  {...rest} />);
}

export const ButtonRNE: React.FC<ButtonElementProps> = ({children, ...rest}) => {
    const {colors} = useTheme();
    return (<ButtonElement buttonStyle={{
        backgroundColor: colors.demoColor1,
        borderRadius: theme.borderRadius.xl
    }}
                           titleStyle={{
                               color: colors.demoColor0
                           }}
                           containerStyle={{
                               width: measure.sizes.s12,
                           }} {...rest}>{children}</ButtonElement>);
}

export const TextInput: React.FC<TextInputProps> = ({children, ...rest}) => {
    const {colors} = useTheme();
    return (<TextInputRN style={{
        color: colors.text,
        paddingHorizontal: measure.spacings.l,
        paddingVertical: measure.spacings.s,
    }} {...rest} />);
}
