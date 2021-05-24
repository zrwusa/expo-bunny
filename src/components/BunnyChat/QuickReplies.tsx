import React, {Component} from 'react'
import {StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle,} from 'react-native'
import {IMessage, Reply} from './Models'
import Color from './Color'
import {warning} from './utils'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: 300,
    },
    quickReply: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        maxWidth: 200,
        paddingVertical: 7,
        paddingHorizontal: 12,
        minHeight: 50,
        borderRadius: 13,
        margin: 3,
    },
    quickReplyText: {
        overflow: 'visible',
    },
    sendLink: {
        borderWidth: 0,
    },
    sendLinkText: {
        color: Color.defaultBlue,
        fontWeight: '600',
        fontSize: 17,
    },
})

export interface QuickRepliesProps<TMessage extends IMessage> {
    nextMessage?: TMessage
    currentMessage?: TMessage
    quickRepliesColor?: string
    sendText?: string
    keepReplies?: boolean
    quickReplyStyle?: StyleProp<ViewStyle>

    onQuickReply?(reply: Reply[]): void

    renderQuickReplySend?(): React.ReactNode
}

export interface QuickRepliesState {
    replies: Reply[]
}

const sameReply = (currentReply: Reply) => (reply: Reply) =>
    currentReply.value === reply.value

const diffReply = (currentReply: Reply) => (reply: Reply) =>
    currentReply.value !== reply.value

export default class QuickReplies<TMessage extends IMessage> extends Component<QuickRepliesProps<TMessage>,
    QuickRepliesState> {
    static defaultProps = {
        currentMessage: {
            quickReplies: [],
        },
        nextMessage: undefined,
        onQuickReply: () => {
        },
        quickRepliesColor: Color.peterRiver,
        sendText: 'Send',
        keepReplies: false,
        renderQuickReplySend: undefined,
        quickReplyStyle: undefined,
    }

    state = {
        replies: [],
    }

    handlePress = (reply: Reply) => () => {
        const {currentMessage} = this.props
        const {replies} = this.state
        if (currentMessage) {
            const {type} = currentMessage.quickReplies!
            switch (type) {
                case 'radio': {
                    this.handleSend([reply])()
                    return
                }

                case 'checkbox': {
                    if (replies.find(sameReply(reply))) {
                        this.setState({
                            replies: this.state.replies.filter(diffReply(reply)),
                        })
                    } else {
                        this.setState({replies: [...this.state.replies, reply]})
                    }
                    return
                }

                default: {
                    warning(`onQuickReply unknown type: ${type}`)
                    return
                }
            }
        }
    }

    handleSend = (replies: Reply[]) => () => {
        const {currentMessage} = this.props
        if (this.props.onQuickReply) {
            this.props.onQuickReply(
                replies.map((reply: Reply) => ({
                    ...reply,
                    messageId: currentMessage!._id,
                })),
            )
        }
    }

    shouldComponentDisplay = () => {
        const {currentMessage, nextMessage} = this.props
        const hasReplies = !!currentMessage && !!currentMessage!.quickReplies
        const hasNext = !!nextMessage && !!nextMessage!._id
        const keepIt = currentMessage!.quickReplies!.keepIt

        if (hasReplies && !hasNext) {
            return true
        }
        if (hasReplies && hasNext && keepIt) {
            return true
        }
        return false
    }

    renderQuickReplySend = () => {
        const {replies} = this.state
        const {sendText, renderQuickReplySend: customSend} = this.props

        return (
            <TouchableOpacity
                style={[styles.quickReply, styles.sendLink]}
                onPress={this.handleSend(replies)}
            >
                {customSend ? (
                    customSend()
                ) : (
                    <Text style={styles.sendLinkText}>{sendText}</Text>
                )}
            </TouchableOpacity>
        )
    }

    render() {
        const {currentMessage, quickRepliesColor, quickReplyStyle} = this.props
        const {replies} = this.state

        if (!this.shouldComponentDisplay()) {
            return null
        }

        const {type} = currentMessage!.quickReplies!

        return (
            <View style={styles.container}>
                {currentMessage!.quickReplies!.values.map(
                    (reply: Reply, index: number) => {
                        const selected =
                            type === 'checkbox' && replies.find(sameReply(reply))
                        return (
                            <TouchableOpacity
                                onPress={this.handlePress(reply)}
                                style={[
                                    styles.quickReply,
                                    quickReplyStyle,
                                    {borderColor: quickRepliesColor},
                                    selected && {backgroundColor: quickRepliesColor},
                                ]}
                                key={`${reply.value}-${index}`}
                            >
                                <Text
                                    numberOfLines={10}
                                    ellipsizeMode={'tail'}
                                    style={[
                                        styles.quickReplyText,
                                        {color: selected ? Color.white : quickRepliesColor},
                                    ]}
                                >
                                    {reply.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    },
                )}
                {replies.length > 0 && this.renderQuickReplySend()}
            </View>
        )
    }
}