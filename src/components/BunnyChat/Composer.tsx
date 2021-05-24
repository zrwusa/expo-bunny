import React from 'react'
import {Platform, StyleSheet, TextInput, TextInputProps} from 'react-native'
import {DEFAULT_PLACEHOLDER, MIN_COMPOSER_HEIGHT} from './Constant'
import Color from './Color'

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        lineHeight: 16,
        ...Platform.select({
            web: {
                paddingTop: 6,
                paddingLeft: 4,
            },
        }),
        marginTop: Platform.select({
            ios: 6,
            android: 0,
            web: 6,
        }),
        marginBottom: Platform.select({
            ios: 5,
            android: 3,
            web: 4,
        }),
    },
})

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

export default class Composer extends React.Component<ComposerProps> {
    static defaultProps = {
        composerHeight: MIN_COMPOSER_HEIGHT,
        text: '',
        placeholderTextColor: Color.defaultColor,
        placeholder: DEFAULT_PLACEHOLDER,
        textInputProps: null,
        multiline: true,
        disableComposer: false,
        textInputStyle: {},
        textInputAutoFocus: false,
        keyboardAppearance: 'default',
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
        this.props.onTextChanged!(text)
    }

    render() {
        return (
            <TextInput
                testID={this.props.placeholder}
                accessible
                accessibilityLabel={this.props.placeholder}
                placeholder={this.props.placeholder}
                placeholderTextColor={this.props.placeholderTextColor}
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
