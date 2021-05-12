import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native'
// TODO: support web
import {IMessage} from './Models'
import {StylePropType} from './utils'
import {AudioPlayer, AudioPlayerProps} from "../../../src/components/AudioPlayer";

const styles = StyleSheet.create({
    container: {},
    audio: {}
})

export interface MessageAudioProps<TMessage extends IMessage> {
    currentMessage?: TMessage
    containerStyle?: StyleProp<ViewStyle>
    audioStyle?: StyleProp<ViewStyle>
    audioProps?: AudioPlayerProps

    onMessageLoad?(currentMessage: TMessage): void

    onMessageLoadStart?(currentMessage: TMessage): void

    onMessageLoadEnd?(currentMessage: TMessage): void

    onMessageLoadError?(e: Error, currentMessage: TMessage): void

    onMessageReadyForDisplay?(currentMessage: TMessage): void

    isDebug?: boolean
}

export default class MessageAudio<TMessage extends IMessage = IMessage> extends Component<MessageAudioProps<TMessage>> {
    static defaultProps = {
        currentMessage: {
            audio: null,
        },
        containerStyle: {},
        audioStyle: {},
        audioProps: {},
        onMessageLoad: undefined,
        onMessageLoadStart: undefined,
        onMessageLoadEnd: undefined,
        onMessageReadyForDisplay: undefined,
        onMessageLoadError: undefined,
        isDebug: false,
    }

    static propTypes = {
        currentMessage: PropTypes.object,
        containerStyle: StylePropType,
        audioStyle: StylePropType,
        audioProps: PropTypes.object,
        onMessageLoad: PropTypes.func,
        onMessageLoadStart: PropTypes.func,
        onMessageLoadEnd: PropTypes.func,
        onMessageReadyForDisplay: PropTypes.func,
        onMessageLoadError: PropTypes.func,
        isDebug: PropTypes.bool
    }

    render() {
        const {
            containerStyle,
            audioProps,
            audioStyle,
            currentMessage,
            isDebug,
        } = this.props
        return (
            <View style={[styles.container, containerStyle]}>
                {
                    currentMessage
                        ? currentMessage.audio
                        ? <AudioPlayer
                            style={[styles.audio, audioStyle]}
                            source={{uri: currentMessage.audio}}
                            onLoad={() => {
                                isDebug && console.log('---MessageAudio onLoad')
                                this.props.onMessageLoad?.(currentMessage)
                                isDebug && console.log('---MessageAudio onMessageReadyForDisplay')
                                this.props.onMessageReadyForDisplay?.(currentMessage)
                            }}
                            onLoadStart={() => {
                                isDebug && console.log('---MessageAudio onLoadStart')
                                this.props.onMessageLoadStart?.(currentMessage)
                            }}
                            onLoadEnd={() => {
                                isDebug && console.log('---MessageAudio onLoadEnd')
                                this.props.onMessageLoadEnd?.(currentMessage)
                            }}
                            onError={(e) => {
                                isDebug && console.log('---MessageAudio onError')
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
