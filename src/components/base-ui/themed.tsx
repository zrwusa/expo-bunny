import {
    Button as ButtonElement, ButtonProps as ButtonElementProps,
    Text as TextElement, TextProps as TextElementProps
} from "react-native-elements";
import {useTheme} from "../../styles/theme";
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
    ButtonProps, ImageProps, StyleSheet,
    PressableProps, GestureResponderEvent, Platform, Switch as SwitchRN, StyleProp, ViewStyle
} from "react-native";
import {useLinkProps} from "@react-navigation/native";
import React from "react";
import styled, {ReactNativeThemedStyledFunction} from "styled-components/native";
import {createIconSetFromIcoMoon, MaterialCommunityIcons} from '@expo/vector-icons';
import {IcoMoonProps, MaterialCommunityIconsProps} from "../../types/styles";
import {getStyleObj} from "../../styles/utils";
import selection from "../../assets/fonts/icomoon-cus/selection.json"
import {LinkProps} from "../../types/components";
import {useSizer} from "../../styles/sizer";
import {Switch as SwitchPaper} from "react-native-paper";

export const IconFromIcoMoon = createIconSetFromIcoMoon(selection, 'IcoMoon', 'icomoon.ttf');

// The theme switch is not supported, but for future scalability,
// try to use the theme to standardize the definition and use of properties
export const ButtonTO: React.FC<TouchableOpacityProps> = ({children, style, ...rest}) => {
    const {colors} = useTheme();
    const {ms} = useSizer();
    const styleObj = getStyleObj(style);
    return (<TouchableOpacityRN style={{
        backgroundColor: colors.primary,
        marginTop: ms.sp.s,
        borderRadius: ms.br.xs,
        fontSize: ms.fs.m,
        paddingVertical: ms.sp.m,
        alignItems: "center",
        ...styleObj
    }} {...rest} >{children}</TouchableOpacityRN>);
}

export const Link: React.FC<LinkProps> = ({to, action, style, children, ...rest}) => {
    const {onPress, ...props} = useLinkProps({to, action});
    const {colors} = useTheme();
    const styleObj = getStyleObj(style);
    const {ms} = useSizer();
    return (
        <TouchableOpacityRN style={{
            backgroundColor: colors.primary,
            marginTop: ms.sp.s,
            borderRadius: ms.br.xs,
            fontSize: ms.fs.m,
            paddingVertical: ms.sp.m,
            ...styleObj
        }} onPress={onPress} {...props} {...rest}>
            <TextBtn style={{textAlign: "center"}}>{children}</TextBtn>
        </TouchableOpacityRN>
    );
};

export const TextBtn: React.FC<TextProps> = ({children, style, ...rest}) => {
    const {colors, fonts} = useTheme();
    const {ms} = useSizer();
    const styleObj = getStyleObj(style);
    return (<TextRN style={{
        color: colors.btnText,
        paddingVertical: ms.sp.xs,
        paddingHorizontal: ms.sp.m,
        fontFamily: fonts.regular.fontFamily,
        fontSize: ms.fs.m,
        ...styleObj
    }} {...rest}>{children}</TextRN>);
}

export const View: React.FC<ViewProps> = ({children, ...rest}) => {
    const {} = useTheme();
    const {ms} = useSizer();

    return (<ViewRN {...rest}>{children}</ViewRN>);
}

export const Text: React.FC<TextProps> = ({children, style, ...rest}) => {
    const {colors, fonts} = useTheme();
    const styleObj = getStyleObj(style);
    const {ms} = useSizer();

    return (<TextRN style={{
        color: colors.text,
        fontFamily: fonts.regular.fontFamily,
        fontSize: ms.fs.m,
        ...styleObj
    }} {...rest}>{children}</TextRN>);
}

export const Button: React.FC<ButtonProps> = ({children, color, ...rest}) => {
    const {colors} = useTheme();
    const {ms} = useSizer();
    return (<ButtonRN color={color || colors.primary}
                      {...rest} />);
}

export const TouchableOpacity: React.FC<TouchableOpacityProps> = ({children, style, ...rest}) => {
    const {colors} = useTheme();
    const {ms} = useSizer();

    const styleObj = getStyleObj(style);
    return (<TouchableOpacityRN
        style={{
            backgroundColor: colors.background,
            ...styleObj
        }} {...rest} >{children}</TouchableOpacityRN>);
}

export const Pressable: React.FC<PressableProps> = ({children, style, ...rest}) => {
    const {colors} = useTheme();
    const {ms} = useSizer();

    const styleObj = getStyleObj(style);
    return (<PressableRN
        style={{
            backgroundColor: colors.background,
            ...styleObj
        }} {...rest} >{children}</PressableRN>);
}

export const Image: React.FC<ImageProps> = ({children, style, ...rest}) => {
    const {colors} = useTheme();

    const {ms} = useSizer();

    const styleObj = getStyleObj(style);
    return (<ImageRN
        style={{
            backgroundColor: colors.background,
            ...styleObj
        }}  {...rest} >{children}</ImageRN>);
}

export const TextRNE: React.FC<TextElementProps> = ({children, style, ...rest}) => {
    const {colors} = useTheme();
    const {ms} = useSizer();

    const styleObj = getStyleObj(style);
    return (<TextElement
        style={{
            ...styleObj
        }}
        {...rest}>{children}</TextElement>);
}

export const ButtonRNE: React.FC<ButtonElementProps> = ({children, buttonStyle, titleStyle, containerStyle, ...rest}) => {
    const {colors} = useTheme();
    const buttonStyleObj = getStyleObj(buttonStyle);
    const titleStyleObj = getStyleObj(titleStyle);
    const containerStyleObj = getStyleObj(containerStyle);
    const {ms} = useSizer();

    return (<ButtonElement
        buttonStyle={{
            backgroundColor: colors.primary,
            borderRadius: ms.br.s,
            ...buttonStyleObj,
        }}
        titleStyle={{
            color: colors.btnText,
            ...titleStyleObj
        }}
        containerStyle={{
            width: ms.sz.s12,
            ...containerStyleObj
        }} {...rest}>{children}</ButtonElement>);
}

export const TextInput: React.FC<TextInputProps> = ({style, ...rest}) => {
    const {colors} = useTheme();
    const styleObj = getStyleObj(style);
    const {ms} = useSizer();

    return (<TextInputRN
        style={{
            color: colors.text,
            paddingHorizontal: ms.sp.l,
            paddingVertical: ms.sp.s,
            ...styleObj
        }} {...rest} />);
}
export type SwitchPaperProps = React.ComponentPropsWithRef<typeof SwitchRN> & {
    disabled?: boolean;
    value?: boolean;
    color?: string;
    onValueChange?: Function;
    style?: StyleProp<ViewStyle>;
    theme?: ReactNativePaper.Theme;
};
export const SwitchP: React.FC<SwitchPaperProps> = ({style, ...rest}) => {
    const {colors} = useTheme();
    const styleObj = getStyleObj(style);
    const {ms, responsive} = useSizer();
    const {wp} = responsive.iphoneX;

    return (<SwitchPaper color={colors.primary}
                         style={{
                             transform: [{scaleX: wp(1)}, {scaleY: wp(1)}],
                             ...styleObj
                         }} {...rest}/>);
}

export const IconMC: React.FC<MaterialCommunityIconsProps> = ({children, style, name, ...rest}) => {
    const {colors} = useTheme();
    const {ms} = useSizer();

    const styleObj = getStyleObj(style);
    return (<MaterialCommunityIcons
        name={name}
        style={{
            color: colors.background,
            fontSize: ms.fs.xl,
            ...styleObj
        }}
    />);
}

export const IcoMoon: React.FC<IcoMoonProps> = ({children, style, name, size, color, ...rest}) => {
    const {colors} = useTheme();
    const {ms} = useSizer();

    const styleObj = getStyleObj(style);
    return (<IconFromIcoMoon
        name={name}
        size={size}
        color={color}
        style={{
            color: colors.primary,
            fontSize: ms.fs.xl,
            ...styleObj
        }}
    />);
}

// The theme switch is not supported, but for future scalability,
// try to use the theme to standardize the definition and use of properties
// export const DemoButtonRNStyled = styled.Button({
//     backgroundColor: DefaultTheme.colors.transparent,
//     margin: ms.sp.s
// })
// export const DemoButtonRNStyled =():ReactNativeThemedStyledFunction<typeof ButtonRN, DefaultTheme>=>{
//     const {colors} = useTheme()
//     return styled.Button({
//         backgroundColor: colors.background,
//         margin: ms.sp.s,
//
//     })
// }
//
// export const DemoTextCssStyledRN = styled.Text`
//   color: ${DefaultTheme.colors.btnText};
//   text-align: center;
//   font-size: ${ms.fs.m}px;
// `
//
// export const DemoButtonRNEStyled = styled(ButtonElement).attrs({
//     buttonStyle: {
//         backgroundColor: DefaultTheme.colors.background,
//         borderRadius: ms.br.xl
//     },
//     titleStyle: {
//         color: DefaultTheme.colors.text
//     },
//     containerStyle: {
//         width: ms.sz.s12,
//     },
// })``
//
// export const DemoIconCssStyled = styled(MaterialCommunityIcons)`
//   font-size: ${ms.fs.m}px;
//   color:${DefaultTheme.colors.primary};
//   padding: ${ms.sp.s}px;
// `


