import React, {Component} from 'react'
import {StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle,} from 'react-native'
import Color from './Color'
import {IMessage} from './Models'

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 5,
        marginBottom: 10,
    },
    text: {
        backgroundColor: Color.backgroundTransparent,
        color: Color.defaultColor,
        fontSize: 12,
        fontWeight: '300',
    },
})

export interface SystemMessageProps<TMessage extends IMessage> {
    currentMessage?: TMessage
    containerStyle?: StyleProp<ViewStyle>
    wrapperStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
}

export default class SystemMessage<TMessage extends IMessage = IMessage> extends Component<SystemMessageProps<TMessage>> {
    static defaultProps = {
        currentMessage: {
            system: false,
        },
        containerStyle: {},
        wrapperStyle: {},
        textStyle: {},
    }

    render() {
        const {
            currentMessage,
            containerStyle,
            wrapperStyle,
            textStyle,
        } = this.props
        if (currentMessage) {
            return (
                <View style={[styles.container, containerStyle]}>
                    <View style={wrapperStyle}>
                        <Text style={[styles.text, textStyle]}>{currentMessage.text}</Text>
                    </View>
                </View>
            )
        }
        return null
    }
}
