import React, {Component} from 'react'
import {StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, View, ViewStyle,} from 'react-native'
import Color from './Color'
import {IMessage} from './Models'

const styles = StyleSheet.create({
    container: {
        height: 44,
        justifyContent: 'flex-end',
    },
    text: {
        color: Color.defaultBlue,
        fontWeight: '600',
        fontSize: 17,
        backgroundColor: Color.backgroundTransparent,
        marginBottom: 12,
        marginLeft: 10,
        marginRight: 10,
    },
})

export interface SendProps<TMessage extends IMessage> {
    text?: string
    label?: string
    containerStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    children?: React.ReactNode
    alwaysShowSend?: boolean
    disabled?: boolean
    sendButtonProps?: Partial<TouchableOpacityProps>

    onSend?(
        messages: Partial<TMessage> | Partial<TMessage>[],
        shouldResetInputToolbar: boolean,
    ): void
}

export default class Send<TMessage extends IMessage = IMessage> extends Component<SendProps<TMessage>> {
    static defaultProps = {
        text: '',
        onSend: () => {
        },
        label: 'Send',
        containerStyle: {},
        textStyle: {},
        children: null,
        alwaysShowSend: false,
        disabled: false,
        sendButtonProps: null,
    }

    handleOnPress = () => {
        const {text, onSend} = this.props
        if (text && onSend) {
            onSend({text: text.trim()} as Partial<TMessage>, true)
        }
    }

    render() {
        const {
            text,
            containerStyle,
            children,
            textStyle,
            label,
            alwaysShowSend,
            disabled,
            sendButtonProps,
        } = this.props
        if (alwaysShowSend || (text && text.trim().length > 0)) {
            return (
                <TouchableOpacity
                    testID='send'
                    accessible
                    accessibilityLabel='send'
                    style={[styles.container, containerStyle]}
                    onPress={this.handleOnPress}
                    // @ts-ignore
                    accessibilityTraits='button'
                    disabled={disabled}
                    {...sendButtonProps}
                >
                    <View>
                        {children || <Text style={[styles.text, textStyle]}>{label}</Text>}
                    </View>
                </TouchableOpacity>
            )
        }
        return <View/>
    }
}
