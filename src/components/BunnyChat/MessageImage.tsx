import React, {Component} from 'react';
import {Image, ImageProps, ImageStyle, StyleProp, StyleSheet, Text, View, ViewStyle,} from 'react-native';
import {IMessage} from './types';
import LightBox from '../../../packages/react-native-lightbox';
import {SizeLabor, ThemeLabor} from '../../types';
import {withBunnyKit, WithBunnyKit} from '../../hooks/bunny-kit';

const makeStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    return StyleSheet.create({
        container: {},
        image: {
            width: wp(150),
            height: wp(100),
            borderRadius: wp(13),
            margin: wp(3),
            resizeMode: 'cover',
        },
        imageActive: {
            flex: 1,
            resizeMode: 'contain',
        },
    });
};

export interface MessageImageProps<TMessage extends IMessage> {
    messages?: TMessage[],
    currentMessage?: TMessage
    imageContainerStyle?: StyleProp<ViewStyle>
    imageStyle?: StyleProp<ImageStyle>
    imageProps?: Partial<ImageProps>
    lightBoxProps?: object,
    isDebug?: boolean

    onMessageLoad?(currentMessage: TMessage): void

    onMessageLoadStart?(currentMessage: TMessage): void

    onMessageLoadEnd?(currentMessage: TMessage): void

    onMessageReadyForDisplay?(currentMessage: TMessage): void

    onMessageLoadError?(e: Error, currentMessage: TMessage): void
}

class MessageImage<TMessage extends IMessage> extends Component<MessageImageProps<TMessage> & WithBunnyKit> {
    static defaultProps = {
        messages: [],
        currentMessage: undefined,
        imageContainerStyle: {},
        imageStyle: {},
        imageProps: {},
        lightBoxProps: {},
        onMessageLoad: undefined,
        onMessageLoadStart: undefined,
        onMessageLoadEnd: undefined,
        onMessageReadyForDisplay: undefined,
        onMessageLoadError: undefined,
        isDebug: false
    };

    render() {
        const {
            imageContainerStyle,
            lightBoxProps,
            imageProps,
            imageStyle,
            currentMessage,
            isDebug,
            messages,
        } = this.props;
        isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', '[level4]MessageImage props', this.props);
        const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
        const styles = makeStyles(sizeLabor, themeLabor);
        return (
            <View style={[styles.container, imageContainerStyle]}>
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
                                        isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageImage onLoad');
                                        this.props.onMessageLoad?.(currentMessage);
                                        isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageImage onMessageReadyForDisplay');
                                        this.props.onMessageReadyForDisplay?.(currentMessage);
                                    }}
                                    onLoadStart={() => {
                                        isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageImage onLoadStart');
                                        this.props.onMessageLoadStart?.(currentMessage);
                                    }}
                                    onLoadEnd={() => {
                                        isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageImage onLoadEnd');
                                        this.props.onMessageLoadEnd?.(currentMessage);
                                    }}
                                    onError={(e) => {
                                        isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageImage onError');
                                        this.props.onMessageLoadError?.(e.nativeEvent.error, currentMessage);
                                    }}

                                    source={{uri: currentMessage.image}}
                                    {...imageProps}
                                />
                                : <Text>{'currentMessage.image is undefined'}</Text>
                            : <Text>{'currentMessage is undefined'}</Text>
                    }
                </LightBox>
            </View>
        );
    }
}

export default withBunnyKit(MessageImage);
