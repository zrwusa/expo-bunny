import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Image, ImageProps, ImageStyle, StyleProp, StyleSheet, View, ViewStyle,} from 'react-native'
// TODO: support web
import LightBox from '../../../src/components/react-native-lightbox'
import {IMessage} from './Models'
import {StylePropType} from './utils'

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
    currentMessage?: TMessage
    containerStyle?: StyleProp<ViewStyle>
    imageStyle?: StyleProp<ImageStyle>
    imageProps?: Partial<ImageProps>
    lightBoxProps?: object
}

export default class MessageImage<TMessage extends IMessage = IMessage> extends Component<MessageImageProps<TMessage>> {
    static defaultProps = {
        currentMessage: {
            image: null,
        },
        containerStyle: {},
        imageStyle: {},
        imageProps: {},
        lightBoxProps: {},
    }

    static propTypes = {
        currentMessage: PropTypes.object,
        containerStyle: StylePropType,
        imageStyle: StylePropType,
        imageProps: PropTypes.object,
        lightBoxProps: PropTypes.object,
    }

    render() {
        const {
            containerStyle,
            lightBoxProps,
            imageProps,
            imageStyle,
            currentMessage,
        } = this.props
        if (!!currentMessage) {
            return (
                <View style={[styles.container, containerStyle]}>
                    <LightBox
                        activeProps={{
                            style: styles.imageActive,
                        }}
                        {...lightBoxProps}
                    >
                        <Image
                            {...imageProps}
                            style={[styles.image, imageStyle]}
                            source={{uri: currentMessage.image}}
                        />
                    </LightBox>
                </View>
            )
        }
        return null
    }
}
