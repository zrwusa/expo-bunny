import React from 'react'
import {Platform, StyleSheet, TextInput, TextInputProps} from 'react-native'
import {DEFAULT_PLACEHOLDER, MIN_COMPOSER_HEIGHT} from './Constant'
import {WithBunnyKit, withBunnyKit} from "../../hooks/bunny-kit";
import {SizeLabor, ThemeLabor} from "../../types";

const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const {theme: {colors}} = themeLabor;
    return StyleSheet.create({
        textInput: {
            flex: 1,
            marginLeft: wp(10),
            fontSize: wp(16),
            lineHeight: wp(16),
            color: colors.text,
            ...Platform.select({
                web: {
                    paddingTop: wp(6),
                    paddingLeft: wp(4),
                },
            }),
            marginTop: Platform.select({
                ios: wp(6),
                android: 0,
                web: wp(6),
            }),
            marginBottom: Platform.select({
                ios: wp(5),
                android: wp(3),
                web: wp(4),
            }),
        },
    })
}

export interface ComposerProps {
    composerHeight?: number
    text?: string
    placeholder?: string
    placeholderTextColor?: string
    textInputProps?: Partial<TextInputProps>
    textInputStyle?: TextInputProps['style']
    textInputAutoFocus?: boolean
    keyboardAppearance?: TextInputProps['keyboardAppearance']
    multiline?: boolean
    disableComposer?: boolean

    onTextChanged?(text: string): void

    onInputSizeChanged?(layout: { width: number; height: number }): void
}

class Composer extends React.Component<ComposerProps & WithBunnyKit> {
    static defaultProps = {
        composerHeight: MIN_COMPOSER_HEIGHT,
        text: '',
        // TODO defaultProps can't use bunnyKit props
        placeholderTextColor: '#b2b2b2',
        placeholder: DEFAULT_PLACEHOLDER,
        textInputProps: undefined,
        multiline: true,
        disableComposer: false,
        textInputStyle: {},
        textInputAutoFocus: false,
        keyboardAppearance: 'default' as TextInputProps['keyboardAppearance'],
        onTextChanged: () => {
        },
        onInputSizeChanged: () => {
        },
    }


    layout?: { width: number; height: number } = undefined

    onLayout = (e: any) => {
        const {layout} = e.nativeEvent

        // Support earlier versions of React Native on Android.
        if (!layout) {
            return
        }

        if (
            !this.layout ||
            (this.layout &&
                (this.layout.width !== layout.width ||
                    this.layout.height !== layout.height))
        ) {
            this.layout = layout
            this.props.onInputSizeChanged!(this.layout!)
        }
    }

    onChangeText = (text: string) => {
        // TODO when this happens the MessageText rerenders,not sure is this necessary
        this.props.onTextChanged!(text)
    }

    render() {
        const {bunnyKit: {sizeLabor, themeLabor, colors}} = this.props;
        const styles = getStyles(sizeLabor, themeLabor);
        const {placeholderTextColor = colors.placeholder} = this.props
        return (
            <TextInput
                testID={this.props.placeholder}
                accessible
                accessibilityLabel={this.props.placeholder}
                placeholder={this.props.placeholder}
                placeholderTextColor={placeholderTextColor}
                multiline={this.props.multiline}
                editable={!this.props.disableComposer}
                onLayout={this.onLayout}
                onChangeText={this.onChangeText}
                style={[
                    styles.textInput,
                    this.props.textInputStyle,
                    {
                        height: this.props.composerHeight,
                        ...Platform.select({
                            web: {
                                outlineWidth: 0,
                                outlineColor: 'transparent',
                                outlineOffset: 0,
                            },
                        }),
                    },
                ]}
                autoFocus={this.props.textInputAutoFocus}
                value={this.props.text}
                enablesReturnKeyAutomatically
                underlineColorAndroid='transparent'
                keyboardAppearance={this.props.keyboardAppearance}
                {...this.props.textInputProps}
            />
        )
    }
}

export default withBunnyKit(Composer)
