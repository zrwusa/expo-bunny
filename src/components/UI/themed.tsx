// import {Button as ButtonElement, ButtonProps as ButtonElementProps, Text as TextElement, TextProps as TextElementProps} from "react-native-elements";
import {useThemeLabor} from "../../providers/theme-labor";
import {
    Button as ButtonRN,
    ButtonProps,
    Image as ImageRN,
    ImageProps,
    Pressable as PressableRN,
    PressableProps,
    StyleProp,
    Switch as SwitchRN,
    Text as TextRN,
    TextInput as TextInputRN,
    TextInputProps,
    TextProps,
    TextStyle,
    TouchableOpacity as TouchableOpacityRN,
    TouchableOpacityProps,
    View as ViewRN,
    ViewProps,
    ViewStyle
} from "react-native";
import {useLinkProps} from "@react-navigation/native";
import React from "react";
import {createIconSetFromIcoMoon, MaterialCommunityIcons} from '@expo/vector-icons';
import {IcoMoonProps, LinkProps, MaterialCommunityIconsProps} from "../../types";
import {createSmartStyles, uuidV4} from "../../utils";
import selection from "../../assets/fonts/icomoon-cus/selection.json"
import {useSizeLabor} from "../../providers/size-labor";
import {Switch as SwitchPaper} from "react-native-paper";
import ReactNativePickerSelect, {PickerSelectProps as ReactNativePickerSelectProps} from "react-native-picker-select";

export const IconFromIcoMoon = createIconSetFromIcoMoon(selection, 'IcoMoon', 'icomoon.ttf');

const getBtnChildren = (children: React.ReactNode) => {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {smartStyles} = createSmartStyles(sizeLabor, themeLabor);
    const {row, between, vCenter} = smartStyles;
    let childrenNeedRender;
    if (children) {
        if (children instanceof Array && children.length > 0) {
            const safeChildren = children.map(child => {
                if (typeof child === 'string') {
                    return <TextBtn key={uuidV4()}>{child}</TextBtn>
                } else {
                    return child
                }
            })
            childrenNeedRender = <View style={[row, between, vCenter]}>{safeChildren}</View>
        } else {
            if (typeof children === 'string') {
                childrenNeedRender = <TextBtn>{children}</TextBtn>
            } else {
                childrenNeedRender = children
            }
        }
    }
    return childrenNeedRender
}

// The theme switch is not supported, but for future scalability,
// try to use the theme to standardize the definition and use of properties
export const ButtonTO: React.FC<TouchableOpacityProps> = ({children, style, ...rest}) => {
    const {colors} = useThemeLabor().theme;
    const {ms} = useSizeLabor();
    const childrenNeedRender = getBtnChildren(children)
    const mergedStyle = [{
        backgroundColor: colors.primary,
        marginTop: ms.sp.s,
        borderRadius: ms.br.xs,
        fontSize: ms.fs.m,
        paddingVertical: ms.sp.m,
        paddingHorizontal: ms.sp.m,
    }, style]
    return (<TouchableOpacityRN style={mergedStyle} {...rest} >{childrenNeedRender}</TouchableOpacityRN>);
}

export const Link: React.FC<LinkProps> = ({to, action, style, children, ...rest}) => {
    const {onPress, ...props} = useLinkProps({to, action});
    const {colors} = useThemeLabor().theme;
    const sizeLabor = useSizeLabor();
    const {ms} = sizeLabor;
    const childrenNeedRender = getBtnChildren(children)
    const mergedStyle = [{
        backgroundColor: colors.primary,
        marginTop: ms.sp.s,
        borderRadius: ms.br.xs,
        fontSize: ms.fs.m,
        paddingVertical: ms.sp.m,
        paddingHorizontal: ms.sp.m,
    }, style]
    return (
        <TouchableOpacityRN style={mergedStyle} onPress={onPress} {...props} {...rest}>
            {childrenNeedRender}
        </TouchableOpacityRN>
    );
};

export const TextBtn: React.FC<TextProps> = ({children, style, ...rest}) => {
    const {colors, fonts} = useThemeLabor().theme;
    const {ms} = useSizeLabor();
    const mergedStyle = [{
        color: colors.btnText,
        fontFamily: fonts.regular.fontFamily,
        fontSize: ms.fs.m,
        textAlign: 'center',
    } as TextStyle, style]
    return (<TextRN style={mergedStyle} {...rest}>{children}</TextRN>);
}

export const View: React.FC<ViewProps> = ({children, style, ...rest}) => {
    const mergedStyle = [{}, style]
    return (<ViewRN style={mergedStyle} {...rest}>{children}</ViewRN>);
}

export const Text: React.FC<TextProps> = ({children, style, ...rest}) => {
    const {colors, fonts} = useThemeLabor().theme;
    const {ms} = useSizeLabor();
    const mergedStyle = [{
        color: colors.text,
        fontFamily: fonts.regular.fontFamily,
        fontSize: ms.fs.m,
    }, style]
    return (<TextRN style={mergedStyle} {...rest}>{children}</TextRN>);
}

export const Button: React.FC<ButtonProps> = ({children, color, ...rest}) => {
    const {colors} = useThemeLabor().theme;
    return (<ButtonRN color={color || colors.primary} {...rest} />);
}

export const TouchableOpacity: React.FC<TouchableOpacityProps> = ({children, style, ...rest}) => {
    const {colors} = useThemeLabor().theme;
    const mergedStyle = [{
        backgroundColor: colors.background,
    }, style]
    return (<TouchableOpacityRN
        style={mergedStyle} {...rest} >{children}</TouchableOpacityRN>);
}

export const Pressable: React.FC<PressableProps> = ({children, style, ...rest}) => {
    const {colors} = useThemeLabor().theme;
    // const mergedStyle = [{
    //     backgroundColor: colors.background,
    // }, style]
    return (<PressableRN style={style} {...rest} >{children}</PressableRN>);
}

export const Image: React.FC<ImageProps> = ({children, style, ...rest}) => {
    const {colors} = useThemeLabor().theme;
    const mergedStyle = [{
        backgroundColor: colors.background,
    }, style]
    return (<ImageRN
        style={mergedStyle}  {...rest} >{children}</ImageRN>);
}

// export const TextRNE: React.FC<TextElementProps> = ({children, style, ...rest}) => {
//     const mergedStyle = [{}, style]
//     return (<TextElement
//         style={mergedStyle}
//         {...rest}>{children}</TextElement>);
// }

// export const ButtonRNE: React.FC<ButtonElementProps> = ({children, buttonStyle, titleStyle, containerStyle, ...rest}) => {
//     const {colors} = useThemeLabor().theme;
//     const {ms} = useSizeLabor();
//     const mergedButtonStyle = [{
//         backgroundColor: colors.primary,
//         marginTop: ms.sp.s,
//         borderRadius: ms.br.xs,
//         paddingVertical: ms.sp.m,
//     }, buttonStyle]
//     const mergedTitleStyle = [{
//         color: colors.btnText,
//         fontSize: ms.fs.m,
//     }, titleStyle]
//
//     const mergedContainerStyle = [{
//         width: ms.sz.s12,
//     }, containerStyle]
//     return (<ButtonElement
//         buttonStyle={mergedButtonStyle}
//         titleStyle={mergedTitleStyle}
//         containerStyle={mergedContainerStyle} {...rest}>{children}</ButtonElement>);
// }

export const TextInput: React.FC<TextInputProps> = ({style, ...rest}) => {
    const {colors} = useThemeLabor().theme;
    const {ms} = useSizeLabor();
    const mergedStyle = [{
        color: colors.text,
        marginTop: ms.sp.s,
        paddingHorizontal: ms.sp.l,
        paddingVertical: ms.sp.m,
        fontSize: ms.fs.m,
    }, style]
    return (<TextInputRN
        style={mergedStyle} {...rest} />);
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
    const {colors} = useThemeLabor().theme;
    const {responsive} = useSizeLabor();
    const {wp} = responsive.iphoneX;
    const mergedStyle = [{
        transform: [{scaleX: wp(1)}, {scaleY: wp(1)}],
    }, style]
    return (<SwitchPaper color={colors.primary}
                         style={mergedStyle} {...rest}/>);
}

export const IconMC: React.FC<MaterialCommunityIconsProps & { style?: StyleProp<TextStyle> }> = ({children, style, name, ...rest}) => {
    const {colors} = useThemeLabor().theme;
    const {ms} = useSizeLabor();

    const mergedStyle = [{
        color: colors.primary,
        fontSize: ms.fs.xl,
    }, style]
    return (<MaterialCommunityIcons
        name={name}
        style={mergedStyle}
    />);
}

export const IcoMoon: React.FC<IcoMoonProps & { style?: StyleProp<TextStyle> }> = (
    {
        children,
        style,
        name, size, color, ...rest
    }) => {
    const {colors} = useThemeLabor().theme;
    const {ms} = useSizeLabor();
    const mergedStyle = [{
        color: color || colors.primary,
        fontSize: size || ms.fs.xl,
    }, style]
    return (<IconFromIcoMoon
        name={name}
        style={mergedStyle}
    />);
}

export const RNPickerSelect: React.FC<ReactNativePickerSelectProps> = ({children, style, Icon, ...rest}) => {
    const {colors} = useThemeLabor().theme;
    const {ms, responsive} = useSizeLabor();
    const {wp} = responsive.iphoneX;
    const mergedIconStyle = []
    const IconProp = Icon || (() => <IcoMoon name="chevron-right"
                                             style={{
                                                 marginTop: ms.sp.m,
                                                 marginRight: ms.sp.m,
                                                 color: colors.border,
                                             }}
                                             size={wp(20)}
    />)

    return (<ReactNativePickerSelect
        // style={styles.pickerSelector}
        style={{
            inputIOS: {
                fontSize: ms.fs.l,
                paddingVertical: ms.sp.m,
                paddingHorizontal: ms.sp.m,
                color: colors.text,
                paddingRight: ms.sp.xl// to ensure the text is never behind the icon
            },
            inputAndroid: {
                fontSize: ms.fs.l,
                paddingVertical: ms.sp.m,
                paddingHorizontal: ms.sp.m,
                color: colors.text,
                paddingRight: ms.sp.xl// to ensure the text is never behind the icon
            },
        }}
        touchableWrapperProps={{
            activeOpacity: 0.2,
        }}

        {...rest}
        Icon={IconProp}
    />);
}


// The theme switch is not supported, but for future scalability,
// try to use the theme to standardize the definition and use of properties
// export const DemoButtonRNStyled = styled.Button({
//     backgroundColor: DefaultTheme.colors.transparent,
//     margin: ms.sp.s
// })
// export const DemoButtonRNStyled =():ReactNativeThemedStyledFunction<typeof ButtonRN, DefaultTheme>=>{
//     const {colors} = useTheme().theme
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


