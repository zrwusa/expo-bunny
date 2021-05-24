import React, {Component} from 'react'
import {Image, ImageProps, ImageStyle, StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native'
// TODO: support web
import {IMessage} from './Models'

const styles = StyleSheet.create({
    container: {},
    sticker: {
        width: 120,
        height: 120,
        borderRadius: 13,
        margin: 3,
        resizeMode: 'cover',
    }
})

export interface MessageStickerProps<TMessage extends IMessage> {
    currentMessage?: TMessage
    stickerContainerStyle?: StyleProp<ViewStyle>
    stickerStyle?: StyleProp<ImageStyle>
    stickerProps?: Partial<ImageProps>
    isDebug?: boolean

    onMessageLoad?(currentMessage: TMessage): void

    onMessageLoadStart?(currentMessage: TMessage): void

    onMessageLoadEnd?(currentMessage: TMessage): void

    onMessageReadyForDisplay?(currentMessage: TMessage): void

    onMessageLoadError?(e: Error, currentMessage: TMessage): void
}

export default class MessageSticker<TMessage extends IMessage = IMessage> extends Component<MessageStickerProps<TMessage>> {
    static defaultProps = {
        currentMessage: {
            sticker: null,
        },
        stickerContainerStyle: {},
        stickerStyle: {},
        stickerProps: {},
        onMessageLoad: undefined,
        onMessageLoadStart: undefined,
        onMessageLoadEnd: undefined,
        onMessageReadyForDisplay: undefined,
        onMessageLoadError: undefined,
        isDebug: false,
    }

    render() {
        const {
            stickerContainerStyle,
            stickerProps,
            stickerStyle,
            currentMessage,
            isDebug,
        } = this.props
        isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', '[level4]MessageSticker props', this.props)
        return (
            <View style={[styles.container, stickerContainerStyle]}>
                {currentMessage
                    ? currentMessage.sticker
                        ? <Image
                            style={[styles.sticker, stickerStyle]}
                            onLoad={() => {
                                isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageSticker onLoad')
                                this.props.onMessageLoad?.(currentMessage)
                                isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageSticker onMessageReadyForDisplay')
                                this.props.onMessageReadyForDisplay?.(currentMessage)
                            }}
                            onLoadStart={() => {
                                isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageSticker onLoadStart')
                                this.props.onMessageLoadStart?.(currentMessage)
                            }}
                            onLoadEnd={() => {
                                isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageSticker onLoadEnd')
                                this.props.onMessageLoadEnd?.(currentMessage)
                            }}
                            onError={(e) => {
                                isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageSticker onError')
                                this.props.onMessageLoadError?.(e.nativeEvent.error, currentMessage)
                            }}
                            source={{uri: currentMessage.sticker}}
                            {...stickerProps}
                        />
                        : <Text>{'currentMessage.sticker is undefined'}</Text>
                    : <Text>{'currentMessage is undefined'}</Text>
                }

            </View>
        )
    }
}
