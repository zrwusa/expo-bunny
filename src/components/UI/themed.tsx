// import {Button as ButtonElement, ButtonProps as ButtonElementProps, Text as TextElement, TextProps as TextElementProps} from "react-native-elements";
import {useThemeLabor} from "../../providers/theme-labor";
import {
    Button as ButtonRN,
    ButtonProps,
    Image as ImageRN,
    ImageProps,
    Platform,
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
import selection from "../../assets/fonts/icomoon-cus/selection.json"
import {useSizeLabor} from "../../providers/size-labor";
import {Switch as SwitchPaper} from "react-native-paper";
import ReactNativePickerSelect, {PickerSelectProps as ReactNativePickerSelectProps} from "react-native-picker-select";
import {getStyles} from "./styles";
import {LinearGradient} from "expo-linear-gradient";

export const IconFromIcoMoon = createIconSetFromIcoMoon(selection, 'IcoMoon', 'icomoon.ttf');


// The theme switch is not supported, but for future scalability,
// try to use the theme to standardize the definition and use of properties
export const ButtonTO: React.FC<TouchableOpacityProps> = ({children, style, ...rest}) => {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {ButtonTO} = getStyles(sizeLabor, themeLabor)
    const mergedStyle = [ButtonTO.ButtonTO, style]
    return (<TouchableOpacityRN style={mergedStyle} {...rest} >{children}</TouchableOpacityRN>);
}

export const TextButton: React.FC<TouchableOpacityProps> = ({children, style, ...rest}) => {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {TextButton} = getStyles(sizeLabor, themeLabor)
    const mergedStyle = [TextButton.TextButton, style]
    return (<TouchableOpacityRN style={mergedStyle} {...rest} >{children}</TouchableOpacityRN>);
}

export const Button: React.FC<ButtonProps> = ({children, color, ...rest}) => {
    const {colors} = useThemeLabor().theme;
    return (<ButtonRN color={color || colors.btnBackground} {...rest} />);
}

export const LinearGradientButton: React.FC<TouchableOpacityProps> = ({style, children, ...rest}) => {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {LinearGradientButton} = getStyles(sizeLabor, themeLabor)

    const mergedStyle = [LinearGradientButton.container, style];
    const {theme} = themeLabor;
    const {colors} = theme;
    return <TouchableOpacity style={mergedStyle} {...rest}>
        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}}
                        style={LinearGradientButton.linearGradient}
                        colors={[colors.btnBackground, colors.btnBackground2]}>
            {children}
        </LinearGradient>
    </TouchableOpacity>
}

export const LinkButton: React.FC<LinkProps> = ({to, action, style, children, ...rest}) => {
    const {onPress, ...props} = useLinkProps({to, action});
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {LinkButton} = getStyles(sizeLabor, themeLabor)
    const mergedStyle = [LinkButton.LinkButton, style]
    return (
        <TouchableOpacityRN style={mergedStyle} onPress={onPress} {...props} {...rest}>
            {children}
        </TouchableOpacityRN>
    );
};

export const InButtonText: React.FC<TextProps> = ({children, style, ...rest}) => {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {InputButtonText} = getStyles(sizeLabor, themeLabor)
    const mergedStyle = [InputButtonText.InputButtonText, style]
    return (<TextRN style={mergedStyle} {...rest}>{children}</TextRN>);
}

export const View: React.FC<ViewProps> = ({children, style, ...rest}) => {
    const mergedStyle = [{}, style]
    return (<ViewRN style={mergedStyle} {...rest}>{children}</ViewRN>);
}

export const Text: React.FC<TextProps> = ({children, style, ...rest}) => {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {Text} = getStyles(sizeLabor, themeLabor)
    const mergedStyle: StyleProp<TextStyle> = [Text.Text, style]
    return (<TextRN style={mergedStyle} {...rest}>{children}</TextRN>);
}


export const TouchableOpacity: React.FC<TouchableOpacityProps> = ({children, style, ...rest}) => {
    const mergedStyle = [{}, style]
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
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {Image} = getStyles(sizeLabor, themeLabor)
    const mergedStyle = [Image.Image, style]
    return (<ImageRN
        style={mergedStyle}  {...rest} >{children}</ImageRN>);
}

export const TextInput: React.FC<TextInputProps> = ({style, ...rest}) => {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {theme} = themeLabor;
    const {colors} = theme;
    const {TextInput} = getStyles(sizeLabor, themeLabor)
    // todo Typescript check for outline properties bug
    const webOutline = Platform.OS === 'web' ? {outlineWidth: 0} : null
    const mergedStyle = [TextInput.TextInput, style]
    return (<TextInputRN
        placeholderTextColor={colors.placeholder}
        style={mergedStyle} {...rest} />);
}

export interface TextInputIconProps extends TextInputProps {
    renderIcon?: () => (React.ReactElement<MaterialCommunityIconsProps>),
}

export const TextInputIcon: React.FC<TextInputIconProps> = ({style, renderIcon, ...rest}) => {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {theme} = themeLabor;
    const {colors} = theme;
    const {TextInputIcon} = getStyles(sizeLabor, themeLabor)
    // todo Typescript check for outline properties bug
    const webOutline = Platform.OS === 'web' ? {outlineWidth: 0} : null
    const mergedStyle = [TextInputIcon.input, style]
    return (<View
        style={TextInputIcon.container}>
        <View style={TextInputIcon.iconContainer}>{renderIcon && renderIcon()}</View>
        <TextInputRN
            placeholderTextColor={colors.placeholder}
            style={mergedStyle} {...rest} />
    </View>);
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
    const {designsBasedOn} = useSizeLabor();
    const {wp} = designsBasedOn.iphoneX;
    const mergedStyle = [{
        transform: [{scaleX: wp(0.8, false)}, {scaleY: wp(0.8, false)}],
    }, style]
    return (<SwitchPaper color={colors.btnBackground}
                         style={mergedStyle} {...rest}/>);
}

export const IconMC: React.FC<MaterialCommunityIconsProps & { style?: StyleProp<TextStyle> }> = ({children, style, name, ...rest}) => {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {IconMC} = getStyles(sizeLabor, themeLabor)
    const mergedStyle = [IconMC.IconMC, style]
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
        color: color || colors.text,
        fontSize: size || ms.fs.l,
    }, style]
    return (<IconFromIcoMoon
        name={name}
        style={mergedStyle}
    />);
}
export const PickerSelect: React.FC<ReactNativePickerSelectProps> = ({children, style, Icon, ...rest}) => {
    const themeLabor = useThemeLabor();
    const sizeLabor = useSizeLabor();
    const styles = getStyles(sizeLabor, themeLabor);
    const {designsBasedOn} = sizeLabor
    const {wp} = designsBasedOn.iphoneX
    const IconDefault = (Platform.OS !== 'web' ? () => <IcoMoon name="chevron-down1"/> : null)
    return (<ReactNativePickerSelect
        style={{
            iconContainer: styles.PickerSelect.iconContainer,
            viewContainer: styles.PickerSelect.viewContainer,
            inputIOSContainer: styles.PickerSelect.inputContainer,
            inputAndroidContainer: styles.PickerSelect.inputContainer,
            inputWeb: styles.PickerSelect.input,
            inputIOS: styles.PickerSelect.input,
            inputAndroid: styles.PickerSelect.input,
            modalViewTop: styles.PickerSelect.modalViewTop,
            modalViewMiddle: styles.PickerSelect.modalViewMiddle,
            modalViewBottom: styles.PickerSelect.modalViewBottom,
            ...style,
        }}
        touchableWrapperProps={{
            activeOpacity: 0.2,
        }}
        useNativeAndroidPickerStyle={false}
        Icon={Icon || IconDefault}
        children={children}
        {...rest}
    />);
}
export const PickerSelectChevronRight: React.FC<ReactNativePickerSelectProps> = ({style, Icon, ...rest}) => {
    const {colors} = useThemeLabor().theme;
    const {ms, designsBasedOn} = useSizeLabor();
    const {wp} = designsBasedOn.iphoneX;
    const mergedIconStyle = []
    const IconProp = Icon || (() => <IcoMoon name="chevron-right"
                                             style={{
                                                 marginTop: ms.sp.m,
                                                 marginRight: ms.sp.m,
                                                 color: colors.text,
                                             }}
                                             size={wp(20)}
    />)

    return (<ReactNativePickerSelect
        // style={styles.pickerSelector}
        style={{
            ...style,
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


