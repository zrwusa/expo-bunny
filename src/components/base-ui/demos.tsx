import styled from "styled-components/native";
import {Button as ButtonElement, ButtonProps as ButtonElementProps} from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useTheme} from "react-native-paper";
import {Text as TextRN, TextProps, TouchableOpacityProps} from "react-native";
import {TouchableOpacity} from "react-native";
import React from "react";
import {themes} from "./themes";
import {EThemes} from "../../types/enums";
import measure from "./measure";

// Support theme switch
export const DemoTOButtonThemedRN: React.FC<TouchableOpacityProps> = ({children, ...rest}) => {
    const {colors, borderRadius} = useTheme();
    return (<TouchableOpacity style={{
        backgroundColor: colors.demoColor1,
        marginTop: measure.spacings.s,
        borderRadius: borderRadius.xs,
    }} {...rest} >{children}</TouchableOpacity>);
}

// Support theme switch
export const DemoTextThemedRN: React.FC<TextProps> = ({children, ...rest}) => {
    const {colors, fonts} = useTheme();
    return (<TextRN style={{
        color: colors.demoColor0,
        paddingVertical: measure.spacings.s,
        paddingHorizontal: measure.spacings.l,
        fontFamily: fonts.regular.fontFamily
    }} {...rest}>{children}</TextRN>);
}

// The theme switch is not supported, but for future scalability,
// try to use the theme to standardize the definition and use of properties
const theme = themes[EThemes.DEFAULT];
export const DemoButtonStyledRN = styled.Button({
    backgroundColor: theme.colors.transparent,
    margin: measure.spacings.s
})

export const DemoTextCssStyledRN = styled.Text`
  color: ${theme.colors.demoColor1};
  text-align: center;
  font-size: ${measure.fontSizes.m}px;
`

export const DemoButtonStyledRNE = styled(ButtonElement).attrs({
    buttonStyle: {
        backgroundColor: theme.colors.demoColor1,
        borderRadius: theme.borderRadius.xl
    },
    titleStyle: {
        color: theme.colors.demoColor0
    },
    containerStyle: {
        width: measure.sizes.s12,
    },
})``

export const DemoIconCssStyled = styled(Icon)`
  font-size: ${measure.fontSizes.m}px;
  color:${theme.colors.demoColor0};
  padding: ${measure.spacings.s}px;
`


