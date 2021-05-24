import React, {Component} from 'react'
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native'
// TODO: support web
import {IMessage} from './Models'
import {Video, VideoProps} from "../../../packages/expo-av/src";

const styles = StyleSheet.create({
    container: {},
    video: {
        width: 240,
        height: 160,
        borderRadius: 13,
        margin: 3,
        resizeMode: 'cover',
    }
})

export interface MessageVideoProps<TMessage extends IMessage> {
    currentMessage?: TMessage
    videoContainerStyle?: StyleProp<ViewStyle>
    videoStyle?: StyleProp<ViewStyle>
    videoProps?: VideoProps
    isDebug?: boolean

    onMessageLoad?(currentMessage: TMessage): void

    onMessageLoadStart?(currentMessage: TMessage): void

    onMessageLoadEnd?(currentMessage: TMessage): void

    onMessageReadyForDisplay?(currentMessage: TMessage): void

    onMessageLoadError?(e: Error, currentMessage: TMessage): void
}

export default class MessageVideo<TMessage extends IMessage = IMessage> extends Component<MessageVideoProps<TMessage>> {
    static defaultProps = {
        currentMessage: {
            video: null,
        },
        videoContainerStyle: {},
        videoStyle: {},
        videoProps: {},
        onMessageLoad: undefined,
        onMessageLoadStart: undefined,
        onMessageLoadEnd: undefined,
        onMessageReadyForDisplay: undefined,
        onMessageLoadError: undefined,

        isDebug: false,
    }

    render() {
        const {
            videoContainerStyle,
            videoProps,
            videoStyle,
            currentMessage,
            isDebug,
        } = this.props
        isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', '[level4]MessageVideo props', this.props)
        return (
            <View style={[styles.container, videoContainerStyle]}>
                {
                    currentMessage ?
                        currentMessage.video
                            ? <Video
                                style={[styles.video, videoStyle]}
                                useNativeControls
                                resizeMode="contain"
                                source={{uri: currentMessage.video}}
                                onLoad={() => {
                                    isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageVideo onLoad')
                                    this.props.onMessageLoad?.(currentMessage)
                                }}
                                onLoadStart={() => {
                                    isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageVideo onLoadStart')
                                    this.props.onMessageLoadStart?.(currentMessage)
                                }}
                                onReadyForDisplay={() => {
                                    isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageVideo onReadyForDisplay')
                                    this.props.onMessageLoadEnd?.(currentMessage)
                                    isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageVideo onMessageReadyForDisplay')
                                    this.props.onMessageReadyForDisplay?.(currentMessage)
                                }}
                                onError={(e) => {
                                    isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageVideo onError', e)
                                    this.props.onMessageLoadError?.(new Error(e), currentMessage)
                                }}
                                {...videoProps}
                            />
                            : <Text>{'currentMessage.video is undefined'}</Text>
                        : <Text>{'currentMessage is undefined'}</Text>
                }

            </View>
        )
    }
}
