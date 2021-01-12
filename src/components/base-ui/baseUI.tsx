import styled from "styled-components/native";
import {Button as ButtonElement} from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useTheme} from "react-native-paper";
import {Text as TextRN, TextProps, TouchableOpacityProps} from "react-native";
import {TouchableOpacity} from "react-native";
import React from "react";

export const DemoTOButtonThemedRN: React.FC<TouchableOpacityProps> = ({children, ...rest}) => {
    const {colors, spacings} = useTheme();
    return (<TouchableOpacity style={{
        backgroundColor: colors.demoColor1,
        marginTop: spacings.s
    }} {...rest} >
        {children}</TouchableOpacity>);
}

export const DemoTextThemedRN: React.FC<TextProps> = ({children}) => {
    const {colors, spacings,fonts} = useTheme();
    return (<TextRN style={{
        color: colors.demoColor0,
        paddingVertical: spacings.s,
        paddingHorizontal: spacings.l,
        fontFamily:fonts.thin.fontFamily
    }}>
        {children}</TextRN>);
}

export const DemoButtonStyledRN = styled.Button({
    backgroundColor: 'transparent',
    margin: 6,
})

export const DemoTitleStyledRN = styled.Text`
  color: #0f0;
  text-align: center;
  font-size: 16px;
`;

export const DemoButtonStyledRNE = styled(ButtonElement).attrs({
    buttonStyle: {
        backgroundColor: 'transparent',
    },
    titleStyle: {
        color: 'rgb(38,115,252)'
    },
    containerStyle: {
        width: '100%',
    },
})``;

export const DemoIconStyled = styled(Icon)`
  font-size: 15px;
  color:rgb(38,115,252);
  padding: 10px;
`;
