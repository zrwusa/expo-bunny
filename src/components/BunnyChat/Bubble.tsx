import React from 'react'
import {ActivityIndicator, Clipboard, StyleProp, StyleSheet, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle,} from 'react-native'

import QuickReplies, {QuickRepliesProps} from './QuickReplies'

import MessageText, {MessageTextProps} from './MessageText'
import MessageImage, {MessageImageProps} from './MessageImage'
import MessageVideo from './MessageVideo'
import MessageAudio from './MessageAudio'

import Time, {TimeProps} from './Time'
import Color from './Color'

import {isSameDay, isSameUser} from './utils'
import {IMessage, LeftRightStyle, MessageAudioProps, MessageVideoProps, User,} from './Models'
import MessageSticker, {MessageStickerProps} from "./MessageSticker";

const styles = {
    left: StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'flex-start',
        },
        wrapper: {
            borderRadius: 15,
            backgroundColor: Color.leftBubbleBackground,
            marginRight: 60,
            minHeight: 20,
            justifyContent: 'flex-end',
        },
        containerToNext: {
            borderBottomLeftRadius: 3,
        },
        containerToPrevious: {
            borderTopLeftRadius: 3,
        },
        bottom: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
    }),
    right: StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'flex-end',
        },
        wrapper: {
            borderRadius: 15,
            backgroundColor: Color.defaultBlue,
            marginLeft: 60,
            minHeight: 20,
            justifyContent: 'flex-end',
        },
        containerToNext: {
            borderBottomRightRadius: 3,
        },
        containerToPrevious: {
            borderTopRightRadius: 3,
        },
        bottom: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
        },
    }),
    content: StyleSheet.create({
        tick: {
            fontSize: 10,
            backgroundColor: Color.backgroundTransparent,
            color: Color.white,
        },
        tickView: {
            flexDirection: 'row',
            marginRight: 10,
        },
        username: {
            top: -3,
            left: 0,
            fontSize: 12,
            backgroundColor: 'transparent',
            color: '#aaa',
        },
        usernameView: {
            flexDirection: 'row',
            marginHorizontal: 10,
        },
    }),
}

const DEFAULT_OPTION_TITLES = ['Copy Text', 'Cancel']


export interface BubbleProps<TMessage extends IMessage> extends MessageImageProps<TMessage>,
    MessageStickerProps<TMessage>,
    MessageVideoProps<TMessage>,
    MessageAudioProps<TMessage>,
    MessageTextProps<TMessage>,
    QuickRepliesProps<TMessage>,
    TimeProps<TMessage> {


    // position: 'left' | 'right'
    bubbleContainerStyle?: LeftRightStyle<ViewStyle>
    bubbleWrapperStyle?: LeftRightStyle<ViewStyle>
    bottomContainerStyle?: LeftRightStyle<ViewStyle>
    containerToNextStyle?: LeftRightStyle<ViewStyle>
    containerToPreviousStyle?: LeftRightStyle<ViewStyle>
    tickStyle?: StyleProp<TextStyle>
    previousMessage?: TMessage,

    onPress?(context?: any, message?: any): void

    onLongPress?(context?: any, message?: any): void

    renderMessageImage?(props: MessageImageProps<TMessage>): React.ReactNode

    renderMessageSticker?(props: MessageStickerProps<TMessage>): React.ReactNode

    renderMessageVideo?(props: MessageVideoProps<TMessage>): React.ReactNode

    renderMessageAudio?(props: MessageAudioProps<TMessage>): React.ReactNode

    renderMessageText?(props: MessageTextProps<TMessage>): React.ReactNode

    renderCustomView?(bubbleProps: BubbleProps<TMessage>): React.ReactNode

    renderTime?(timeProps: TimeProps<TMessage>): React.ReactNode

    renderTicks?(currentMessage: TMessage): React.ReactNode

    // TODO not implement
    // renderUsername?(): React.ReactNode

    // renderQuickReplySend?(): React.ReactNode

    renderQuickReplies?(quickReplies: QuickRepliesProps<TMessage>): React.ReactNode

    user?: User
    renderUsernameOnMessage?: boolean
    isCustomViewBottom?: boolean
    usernameStyle?: TextStyle
    touchableProps?: object


    // messages: TMessage[],
    // user?: User
    // touchableProps?: object
    // renderUsernameOnMessage?: boolean
    // isCustomViewBottom?: boolean
    // inverted?: boolean
    // currentMessage?: TMessage
    // nextMessage?: TMessage
    // previousMessage?: TMessage
    // optionTitles?: string[]
    // textStyle?: LeftRightStyle<TextStyle>
    // tickStyle?: StyleProp<TextStyle>
    // containerToNextStyle?: LeftRightStyle<ViewStyle>
    // containerToPreviousStyle?: LeftRightStyle<ViewStyle>
    // usernameStyle?: TextStyle
    // quickReplyStyle?: StyleProp<ViewStyle>
    // onPress?(context?: any, message?: any): void
    // onLongPress?(context?: any, message?: any): void
    // onQuickReply?(replies: Reply[]): void
    // renderMessageImage?(props: RenderMessageImageProps<TMessage>): React.ReactNode
    // renderMessageSticker?(props: RenderMessageStickerProps<TMessage>): React.ReactNode
    // renderMessageVideo?(props: RenderMessageVideoProps<TMessage>): React.ReactNode
    // renderMessageAudio?(props: RenderMessageAudioProps<TMessage>): React.ReactNode
    // renderMessageText?(props: RenderMessageTextProps<TMessage>): React.ReactNode
    // renderCustomView?(bubbleProps: BubbleProps<TMessage>): React.ReactNode
    // renderTime?(timeProps: Time['props']): React.ReactNode
    // renderTicks?(currentMessage: TMessage): React.ReactNode
    // renderUsername?(): React.ReactNode
    // renderQuickReplySend?(): React.ReactNode
    // renderQuickReplies?(quickReplies: QuickReplies['props']): React.ReactNode
}

export default class Bubble<TMessage extends IMessage = IMessage> extends React.Component<BubbleProps<TMessage>> {
    static contextTypes = {
        actionSheet: function () {

        },
    }

    static defaultProps = {
        messages: [],
        touchableProps: {},
        onPress: null,
        onLongPress: null,
        renderMessageImage: null,
        renderMessageSticker: null,
        renderMessageVideo: null,
        renderMessageAudio: null,
        renderMessageText: null,
        renderCustomView: null,
        renderUsername: null,
        renderTicks: null,
        renderTime: null,
        renderQuickReplies: null,
        onQuickReply: null,
        onMessageLoad: null,
        onMessageLoadStart: null,
        onMessageLoadEnd: null,
        onMessageLoadError: null,

        position: 'left',
        optionTitles: DEFAULT_OPTION_TITLES,
        currentMessage: {
            text: null,
            createdAt: null,
            image: null,
        },
        nextMessage: {},
        previousMessage: {},
        bubbleContainerStyle: {},
        bubbleWrapperStyle: {},
        bottomContainerStyle: {},
        tickStyle: {},
        usernameStyle: {},
        containerToNextStyle: {},
        containerToPreviousStyle: {},
    }


    onPress = () => {
        if (this.props.onPress) {
            this.props.onPress(this.context, this.props.currentMessage)
        }
    }

    onLongPress = () => {
        const {currentMessage} = this.props
        if (this.props.onLongPress) {
            this.props.onLongPress(this.context, this.props.currentMessage)
        } else if (currentMessage && currentMessage.text) {
            const {optionTitles} = this.props
            const options =
                optionTitles && optionTitles.length > 0
                    ? optionTitles.slice(0, 2)
                    : DEFAULT_OPTION_TITLES
            const cancelButtonIndex = options.length - 1
            this.context.actionSheet().showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex,
                },
                (buttonIndex: number) => {
                    switch (buttonIndex) {
                        case 0:
                            Clipboard.setString(currentMessage.text)
                            break
                        default:
                            break
                    }
                },
            )
        }
    }

    styledBubbleToNext() {
        const {
            currentMessage,
            nextMessage,
            position,
            containerToNextStyle,
        } = this.props
        if (
            currentMessage &&
            nextMessage &&
            position &&
            isSameUser(currentMessage, nextMessage) &&
            isSameDay(currentMessage, nextMessage)
        ) {
            return [
                styles[position].containerToNext,
                containerToNextStyle && containerToNextStyle[position],
            ]
        }
        return null
    }

    styledBubbleToPrevious() {
        const {
            currentMessage,
            previousMessage,
            position,
            containerToPreviousStyle,
        } = this.props
        if (
            currentMessage &&
            previousMessage &&
            position &&
            isSameUser(currentMessage, previousMessage) &&
            isSameDay(currentMessage, previousMessage)
        ) {
            return [
                styles[position].containerToPrevious,
                containerToPreviousStyle && containerToPreviousStyle[position],
            ]
        }
        return null
    }

    renderQuickReplies() {
        const {
            currentMessage,
            nextMessage,
        } = this.props
        if (currentMessage && currentMessage.quickReplies) {
            // const {bubbleContainerStyle, bubbleWrapperStyle, ...quickReplyProps} = this.props
            const {
                onQuickReply,
                quickRepliesColor,
                sendText,
                keepReplies,
                renderQuickReplySend,
                quickReplyStyle
            } = this.props

            const quickRepliesProps = {
                currentMessage,
                nextMessage,
                onQuickReply,
                quickRepliesColor,
                sendText,
                keepReplies,
                renderQuickReplySend,
                quickReplyStyle
            }
            if (this.props.renderQuickReplies) {
                return this.props.renderQuickReplies(quickRepliesProps)
            }
            return (
                <QuickReplies {...quickRepliesProps} />
            )
        }
        return null
    }

    renderMessageText() {
        if (this.props.currentMessage && this.props.currentMessage.text) {
            const {
                position,
                optionTitles,
                currentMessage,
                textContainerStyle,
                textStyle,
                linkStyle,
                customTextStyle,
                textProps,
                parsePatterns,
                onMessageLoad,
                onMessageLoadStart,
                onMessageLoadEnd,
                onMessageReadyForDisplay,
                onMessageLoadError,
                isDebug,
            } = this.props;
            const messageTextProps = {
                position,
                optionTitles,
                currentMessage,
                textContainerStyle,
                textStyle,
                linkStyle,
                customTextStyle,
                textProps,
                parsePatterns,
                onMessageLoad,
                onMessageLoadStart,
                onMessageLoadEnd,
                onMessageReadyForDisplay,
                onMessageLoadError,
                isDebug,
            }
            if (this.props.renderMessageText) {
                return this.props.renderMessageText(messageTextProps)
            }
            return <MessageText {...messageTextProps} />
        }
        return null
    }

    renderMessageImage() {
        if (this.props.currentMessage && this.props.currentMessage.image) {
            // const {bubbleContainerStyle, bubbleWrapperStyle, ...messageImageProps} = this.props
            const {
                messages,
                currentMessage,
                imageContainerStyle,
                imageStyle,
                imageProps,
                lightBoxProps,
                onMessageLoad,
                onMessageLoadStart,
                onMessageLoadEnd,
                onMessageReadyForDisplay,
                onMessageLoadError,
                isDebug
            } = this.props
            const messageImageProps = {
                messages,
                currentMessage,
                imageContainerStyle,
                imageStyle,
                imageProps,
                lightBoxProps,
                onMessageLoad,
                onMessageLoadStart,
                onMessageLoadEnd,
                onMessageReadyForDisplay,
                onMessageLoadError,
                isDebug
            }
            if (this.props.renderMessageImage) {
                return this.props.renderMessageImage(messageImageProps)
            }
            return <MessageImage {...messageImageProps} />
        }
        return null
    }

    renderMessageSticker() {
        if (this.props.currentMessage && this.props.currentMessage.sticker) {
            // todo extract needed props
            // const {bubbleContainerStyle, bubbleWrapperStyle, ...messageStickerProps} = this.props
            const {
                currentMessage,
                stickerContainerStyle,
                stickerStyle,
                stickerProps,
                onMessageLoad,
                onMessageLoadStart,
                onMessageLoadEnd,
                onMessageReadyForDisplay,
                onMessageLoadError,
                isDebug
            } = this.props
            const messageStickerProps = {
                currentMessage,
                stickerContainerStyle,
                stickerStyle,
                stickerProps,
                onMessageLoad,
                onMessageLoadStart,
                onMessageLoadEnd,
                onMessageReadyForDisplay,
                onMessageLoadError,
                isDebug
            }
            if (this.props.renderMessageSticker) {
                return this.props.renderMessageSticker(messageStickerProps)
            }
            return <MessageSticker {...messageStickerProps} />
        }
        return null
    }

    renderMessageVideo() {
        if (this.props.currentMessage && this.props.currentMessage.video) {
            // const {bubbleContainerStyle, bubbleWrapperStyle, ...messageVideoProps} = this.props
            const {
                currentMessage,
                videoContainerStyle,
                videoStyle,
                videoProps,
                onMessageLoad,
                onMessageLoadStart,
                onMessageLoadEnd,
                onMessageReadyForDisplay,
                onMessageLoadError,
                isDebug
            } = this.props;
            const messageVideoProps = {
                currentMessage,
                videoContainerStyle,
                videoStyle,
                videoProps,
                onMessageLoad,
                onMessageLoadStart,
                onMessageLoadEnd,
                onMessageReadyForDisplay,
                onMessageLoadError,
                isDebug
            }
            if (this.props.renderMessageVideo) {
                return this.props.renderMessageVideo(messageVideoProps)
            }
            return <MessageVideo {...messageVideoProps} />
        }
        return null
    }

    renderMessageAudio() {
        if (this.props.currentMessage && this.props.currentMessage.audio) {
            // const {bubbleContainerStyle, bubbleWrapperStyle, ...messageAudioProps} = this.props
            const {
                currentMessage,
                audioContainerStyle,
                audioStyle,
                audioProps,
                onMessageLoad,
                onMessageLoadStart,
                onMessageLoadEnd,
                onMessageReadyForDisplay,
                onMessageLoadError,
                isDebug
            } = this.props;
            const messageAudioProps = {
                currentMessage,
                audioContainerStyle,
                audioStyle,
                audioProps,
                onMessageLoad,
                onMessageLoadStart,
                onMessageLoadEnd,
                onMessageReadyForDisplay,
                onMessageLoadError,
                isDebug
            }
            if (this.props.renderMessageAudio) {
                return this.props.renderMessageAudio(messageAudioProps)
            }
            return <MessageAudio {...messageAudioProps} />
        }
        return null
    }

    renderTicks() {
        const {currentMessage, renderTicks, user} = this.props
        if (renderTicks && currentMessage) {
            return renderTicks(currentMessage)
        }
        if (
            currentMessage &&
            user &&
            currentMessage.user &&
            currentMessage.user._id !== user._id
        ) {
            return null
        }
        if (
            currentMessage &&
            (currentMessage.sent || currentMessage.received || currentMessage.pending)
        ) {
            return (
                <View style={styles.content.tickView}>
                    {!!currentMessage.sent && (
                        <Text style={[styles.content.tick, this.props.tickStyle]}>✓</Text>
                    )}
                    {!!currentMessage.received && (
                        <Text style={[styles.content.tick, this.props.tickStyle]}>✓</Text>
                    )}
                    {!!currentMessage.pending && (
                        // <Text style={[styles.content.tick, this.props.tickStyle]}>🕓</Text>
                        <ActivityIndicator size="small"/>
                    )}
                </View>
            )
        }
        return null
    }

    renderTime() {
        if (this.props.currentMessage && this.props.currentMessage.createdAt) {
            // const {
            //     bubbleContainerStyle,
            //     bubbleWrapperStyle,
            //     textStyle,
            //     ...timeProps
            // } = this.props
            const {
                position,
                currentMessage,
                timeContainerStyle,
                timeFormat,
                timeTextStyle
            } = this.props
            const timeProps = {
                position,
                currentMessage,
                timeContainerStyle,
                timeFormat,
                timeTextStyle
            }
            if (this.props.renderTime) {
                return this.props.renderTime(timeProps)
            }
            return <Time {...timeProps} />
        }
        return null
    }

    renderUsername() {
        const {currentMessage, user} = this.props
        if (this.props.renderUsernameOnMessage && currentMessage) {
            if (user && currentMessage.user._id === user._id) {
                return null
            }
            return (
                <View style={styles.content.usernameView}>
                    <Text
                        style={
                            [styles.content.username, this.props.usernameStyle] as TextStyle
                        }
                    >
                        ~ {currentMessage.user.name}
                    </Text>
                </View>
            )
        }
        return null
    }

    renderCustomView() {
        if (this.props.renderCustomView) {
            return this.props.renderCustomView(this.props)
        }
        return null
    }

    renderBubbleContent() {
        return this.props.isCustomViewBottom ? (
            <View>
                {this.renderMessageImage()}
                {this.renderMessageSticker()}
                {this.renderMessageVideo()}
                {this.renderMessageAudio()}
                {this.renderMessageText()}
                {this.renderCustomView()}
            </View>
        ) : (
            <View>
                {this.renderCustomView()}
                {this.renderMessageImage()}
                {this.renderMessageSticker()}
                {this.renderMessageVideo()}
                {this.renderMessageAudio()}
                {this.renderMessageText()}
            </View>
        )
    }

    render() {
        const {
            position,
            bubbleContainerStyle,
            bubbleWrapperStyle,
            bottomContainerStyle,
        } = this.props
        return (
            <View
                style={[
                    styles[position].container,
                    bubbleContainerStyle && bubbleContainerStyle[position],
                ]}
            >
                <View
                    style={[
                        styles[position].wrapper,
                        this.styledBubbleToNext(),
                        this.styledBubbleToPrevious(),
                        bubbleWrapperStyle && bubbleWrapperStyle[position],
                    ]}
                >
                    <TouchableWithoutFeedback
                        onPress={this.onPress}
                        onLongPress={this.onLongPress}
                        // @ts-ignore
                        accessibilityTraits='text'
                        {...this.props.touchableProps}
                    >
                        <View>
                            {this.renderBubbleContent()}
                            <View
                                style={[
                                    styles[position].bottom,
                                    bottomContainerStyle && bottomContainerStyle[position],
                                ]}
                            >
                                {this.renderUsername()}
                                {this.renderTime()}
                                {this.renderTicks()}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {this.renderQuickReplies()}
            </View>
        )
    }
}
