import styled from "styled-components/native";
import {Button as ButtonElement, ButtonProps as ButtonElementProps} from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Text as TextRN, TextProps, TouchableOpacityProps} from "react-native";
import {TouchableOpacity} from "react-native";
import React from "react";
import {getStyleObj, measure} from "../../styles/helpers";
import {DefaultTheme, useTheme} from "../../styles/theme"

// Support theme switch
export const DemoTOButtonThemedRN: React.FC<TouchableOpacityProps> = ({children, style, ...rest}) => {
    const {colors, borderRadius} = useTheme();
    const styleObj = getStyleObj(style)
    return (<TouchableOpacity style={{
        backgroundColor: colors.demoColor1,
        marginTop: measure.spacings.s,
        borderRadius: borderRadius.xs,
        ...styleObj,
    }} {...rest} >{children}</TouchableOpacity>);
}

// Support theme switch
export const DemoTextThemedRN: React.FC<TextProps> = ({children, style, ...rest}) => {
    const {colors, fonts} = useTheme();
    const styleObj = getStyleObj(style)
    return (<TextRN style={{
        color: colors.demoColor0,
        paddingVertical: measure.spacings.s,
        paddingHorizontal: measure.spacings.l,
        fontFamily: fonts.regular.fontFamily,
        ...styleObj,
    }} {...rest}>{children}</TextRN>);
}

// The theme switch is not supported, but for future scalability,
// try to use the theme to standardize the definition and use of properties
export const DemoButtonStyledRN = styled.Button({
    backgroundColor: DefaultTheme.colors.transparent,
    margin: measure.spacings.s
})

export const DemoTextCssStyledRN = styled.Text`
  color: ${DefaultTheme.colors.demoColor1};
  text-align: center;
  font-size: ${measure.fontSizes.m}px;
`

export const DemoButtonStyledRNE = styled(ButtonElement).attrs({
    buttonStyle: {
        backgroundColor: DefaultTheme.colors.demoColor1,
        borderRadius: DefaultTheme.borderRadius.xl
    },
    titleStyle: {
        color: DefaultTheme.colors.demoColor0
    },
    containerStyle: {
        width: measure.sizes.s12,
    },
})``

export const DemoIconCssStyled = styled(Icon)`
  font-size: ${measure.fontSizes.m}px;
  color:${DefaultTheme.colors.primary};
  padding: ${measure.spacings.s}px;
`


