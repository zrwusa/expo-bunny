import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native'
// TODO: support web
import {IMessage} from './Models'
import {StylePropType} from './utils'
import {Video, VideoProps} from "../../expo-av/src";

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
    containerStyle?: StyleProp<ViewStyle>
    videoStyle?: StyleProp<ViewStyle>
    videoProps?: VideoProps

    onMessageLoad?(currentMessage: TMessage): void

    onMessageLoadStart?(currentMessage: TMessage): void

    onMessageLoadEnd?(currentMessage: TMessage): void

    onMessageReadyForDisplay?(currentMessage: TMessage): void

    onMessageLoadError?(e: Error, currentMessage: TMessage): void

    isDebug?: boolean
}

export default class MessageVideo<TMessage extends IMessage = IMessage> extends Component<MessageVideoProps<TMessage>> {
    static defaultProps = {
        currentMessage: {
            video: null,
        },
        containerStyle: {},
        videoStyle: {},
        videoProps: {},
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
        videoStyle: StylePropType,
        videoProps: PropTypes.object,
        onMessageLoad: PropTypes.func,
        onMessageLoadStart: PropTypes.func,
        onMessageLoadEnd: PropTypes.func,
        onReadyForDisplay: PropTypes.func,
        onMessageLoadError: PropTypes.func,
        isDebug: PropTypes.bool
    }

    render() {
        const {
            containerStyle,
            videoProps,
            videoStyle,
            currentMessage,
            isDebug,
        } = this.props
        return (
            <View style={[styles.container, containerStyle]}>
                {
                    currentMessage ?
                        currentMessage.video
                            ? <Video
                                style={[styles.video, videoStyle]}
                                useNativeControls
                                resizeMode="contain"
                                source={{uri: currentMessage.video}}
                                onLoad={() => {
                                    isDebug && console.log('---MessageVideo onLoad')
                                    this.props.onMessageLoad?.(currentMessage)
                                }}
                                onLoadStart={() => {
                                    isDebug && console.log('---MessageVideo onLoadStart')
                                    this.props.onMessageLoadStart?.(currentMessage)
                                }}
                                onReadyForDisplay={() => {
                                    isDebug && console.log('---MessageVideo onReadyForDisplay')
                                    this.props.onMessageLoadEnd?.(currentMessage)
                                    isDebug && console.log('---MessageVideo onMessageReadyForDisplay')
                                    this.props.onMessageReadyForDisplay?.(currentMessage)
                                }}
                                onError={(e) => {
                                    isDebug && console.log('---MessageVideo onError', e)
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
