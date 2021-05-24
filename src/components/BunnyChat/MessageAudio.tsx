import React, {Component} from 'react'
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native'
// TODO: support web
import {IMessage} from './Models'
import {AudioPlayer, AudioPlayerProps} from "../AudioPlayer";

const styles = StyleSheet.create({
    container: {
        height: 46
    },
    audio: {}
})

export interface MessageAudioProps<TMessage extends IMessage> {
    currentMessage?: TMessage
    audioContainerStyle?: StyleProp<ViewStyle>
    audioStyle?: StyleProp<ViewStyle>
    audioProps?: Omit<AudioPlayerProps, 'source'>
    isDebug?: boolean

    onMessageLoad?(currentMessage: TMessage): void

    onMessageLoadStart?(currentMessage: TMessage): void

    onMessageLoadEnd?(currentMessage: TMessage): void

    onMessageLoadError?(e: Error, currentMessage: TMessage): void

    onMessageReadyForDisplay?(currentMessage: TMessage): void
}

export default class MessageAudio<TMessage extends IMessage = IMessage> extends Component<MessageAudioProps<TMessage>> {
    static defaultProps = {
        currentMessage: undefined,
        audioContainerStyle: {},
        audioStyle: {},
        audioProps: {},
        onMessageLoad: undefined,
        onMessageLoadStart: undefined,
        onMessageLoadEnd: undefined,
        onMessageReadyForDisplay: undefined,
        onMessageLoadError: undefined,
        isDebug: false,
    }

    render() {
        const {
            audioContainerStyle,
            audioProps,
            audioStyle,
            currentMessage,
            isDebug,
        } = this.props
        isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', '[level4]MessageAudio props', this.props)
        return (
            <View style={[styles.container, audioContainerStyle]}>
                {
                    currentMessage
                        ? currentMessage.audio
                        ? <AudioPlayer
                            style={[styles.audio, audioStyle]}
                            source={{uri: currentMessage.audio}}
                            onLoad={() => {
                                isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageAudio onLoad')
                                this.props.onMessageLoad?.(currentMessage)
                                isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageAudio onMessageReadyForDisplay')
                                this.props.onMessageReadyForDisplay?.(currentMessage)
                            }}
                            onLoadStart={() => {
                                isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageAudio onLoadStart')
                                this.props.onMessageLoadStart?.(currentMessage)
                            }}
                            onLoadEnd={() => {
                                isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageAudio onLoadEnd')
                                this.props.onMessageLoadEnd?.(currentMessage)
                            }}
                            onError={(e) => {
                                isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageAudio onError')
                                this.props.onMessageLoadError?.(e, currentMessage)
                            }}
                            {...audioProps}
                        />
                        : <Text>{'currentMessage.audio is undefined'}</Text>
                        : <Text>{'currentMessage is undefined'}</Text>
                }

            </View>
        )
    }
}
