import React, {Component} from 'react'
import {Image, ImageProps, ImageStyle, StyleProp, StyleSheet, Text, View, ViewStyle,} from 'react-native'
// TODO: support web
import {IMessage} from './Models'
import LightBox from "../../react-native-lightbox";

const styles = StyleSheet.create({
    container: {},
    image: {
        width: 150,
        height: 100,
        borderRadius: 13,
        margin: 3,
        resizeMode: 'cover',
    },
    imageActive: {
        flex: 1,
        resizeMode: 'contain',
    },
})

export interface MessageImageProps<TMessage extends IMessage> {
    messages: TMessage[],
    currentMessage?: TMessage
    containerStyle?: StyleProp<ViewStyle>
    imageStyle?: StyleProp<ImageStyle>
    imageProps?: Partial<ImageProps>
    lightBoxProps?: object,

    onMessageLoad?(currentMessage: TMessage): void

    onMessageLoadStart?(currentMessage: TMessage): void

    onMessageLoadEnd?(currentMessage: TMessage): void

    onMessageReadyForDisplay?(currentMessage: TMessage): void

    onMessageLoadError?(e: Error, currentMessage: TMessage): void

    isDebug?: boolean
}

export default class MessageImage<TMessage extends IMessage = IMessage> extends Component<MessageImageProps<TMessage>> {
    static defaultProps = {
        messages: [],
        currentMessage: {
            image: null,
        },
        containerStyle: {},
        imageStyle: {},
        imageProps: {},
        lightBoxProps: {},
        onMessageLoad: undefined,
        onMessageLoadStart: undefined,
        onMessageLoadEnd: undefined,
        onMessageReadyForDisplay: undefined,
        onMessageLoadError: undefined,
        isDebug: false
    }

    render() {
        const {
            containerStyle,
            lightBoxProps,
            imageProps,
            imageStyle,
            currentMessage,
            isDebug,
            messages,
        } = this.props
        return (
            <View style={[styles.container, containerStyle]}>
                <LightBox
                    activeProps={{
                        style: styles.imageActive,
                    }}
                    {...lightBoxProps}
                >
                    {
                        currentMessage
                            ? currentMessage.image
                            ? <Image
                                style={[styles.image, imageStyle]}
                                onLoad={() => {
                                    isDebug && console.log('---MessageImage onLoad')
                                    this.props.onMessageLoad?.(currentMessage)
                                    isDebug && console.log('---MessageImage onMessageReadyForDisplay')
                                    this.props.onMessageReadyForDisplay?.(currentMessage)
                                }}
                                onLoadStart={() => {
                                    isDebug && console.log('---MessageImage onLoadStart')
                                    this.props.onMessageLoadStart?.(currentMessage)
                                }}
                                onLoadEnd={() => {
                                    isDebug && console.log('---MessageImage onLoadEnd')
                                    this.props.onMessageLoadEnd?.(currentMessage)
                                }}
                                onError={(e) => {
                                    isDebug && console.log('---MessageImage onError')
                                    this.props.onMessageLoadError?.(e.nativeEvent.error, currentMessage)
                                }}

                                source={{uri: currentMessage.image}}
                                {...imageProps}
                            />
                            : <Text>{'currentMessage.image is undefined'}</Text>
                            : <Text>{'currentMessage is undefined'}</Text>
                    }
                </LightBox>
            </View>
        )
    }
}
