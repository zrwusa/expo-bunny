import React, {Component} from 'react';
import {StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle,} from 'react-native';
import {IMessage, Reply} from './types';
import {warning} from './utils';
import {SizeLabor, ThemeLabor} from '../../types';
import {withBunnyKit, WithBunnyKit} from '../../hooks/bunny-kit';

const makeStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const {theme: {colors}} = themeLabor;
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            maxWidth: wp(300),
        },
        quickReply: {
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: wp(1),
            maxWidth: wp(200),
            paddingVertical: wp(7),
            paddingHorizontal: wp(12),
            minHeight: wp(50),
            borderRadius: wp(13),
            margin: wp(3),
        },
        quickReplyText: {
            overflow: 'visible',
        },
        sendLink: {
            borderWidth: 0,
        },
        sendLinkText: {
            color: colors.accent,
            fontWeight: '600',
            fontSize: wp(17),
        },
    });
};

export interface QuickRepliesProps<TMessage extends IMessage> {
    nextMessage?: TMessage;
    currentMessage?: TMessage;
    quickRepliesColor?: string;
    sendText?: string;
    keepReplies?: boolean;
    quickReplyStyle?: StyleProp<ViewStyle>;

    onQuickReply?(reply: Reply[]): void;

    renderQuickReplySend?(): React.ReactNode;
}

export interface QuickRepliesState {
    replies: Reply[];
}

const sameReply = (currentReply: Reply) => (reply: Reply) =>
    currentReply.value === reply.value;

const diffReply = (currentReply: Reply) => (reply: Reply) =>
    currentReply.value !== reply.value;

class QuickReplies<TMessage extends IMessage> extends Component<QuickRepliesProps<TMessage> & WithBunnyKit,
    QuickRepliesState> {
    static defaultProps = {
        currentMessage: undefined,
        nextMessage: undefined,
        onQuickReply: () => {
        },
        quickRepliesColor: '#3498db',
        sendText: 'Send',
        keepReplies: false,
        renderQuickReplySend: undefined,
        quickReplyStyle: undefined,
    };

    state = {
        replies: [],
    };

    handlePress = (reply: Reply) => () => {
        const {currentMessage} = this.props;
        const {replies} = this.state;
        if (currentMessage) {
            const {type} = currentMessage.quickReplies!;
            switch (type) {
                case 'radio': {
                    this.handleSend([reply])();
                    return;
                }

                case 'checkbox': {
                    if (replies.find(sameReply(reply))) {
                        this.setState({
                            replies: this.state.replies.filter(diffReply(reply)),
                        });
                    } else {
                        this.setState({replies: [...this.state.replies, reply]});
                    }
                    return;
                }

                default: {
                    warning(`onQuickReply unknown type: ${type}`);
                    return;
                }
            }
        }
    };

    handleSend = (replies: Reply[]) => () => {
        const {currentMessage} = this.props;
        if (this.props.onQuickReply) {
            this.props.onQuickReply(
                replies.map((reply: Reply) => ({
                    ...reply,
                    messageId: currentMessage!._id,
                })),
            );
        }
    };

    shouldComponentDisplay = () => {
        const {currentMessage, nextMessage} = this.props;
        const hasReplies = !!currentMessage && !!currentMessage!.quickReplies;
        const hasNext = !!nextMessage && !!nextMessage!._id;
        const keepIt = currentMessage!.quickReplies!.keepIt;

        if (hasReplies && !hasNext) {
            return true;
        }
        if (hasReplies && hasNext && keepIt) {
            return true;
        }
        return false;
    };

    renderQuickReplySend = () => {
        const {replies} = this.state;
        const {sendText, renderQuickReplySend: customSend} = this.props;
        const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
        const styles = makeStyles(sizeLabor, themeLabor);
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
        );
    };

    render() {
        const {currentMessage, quickRepliesColor, quickReplyStyle} = this.props;
        const {replies} = this.state;

        if (!this.shouldComponentDisplay()) {
            return null;
        }

        const {type} = currentMessage!.quickReplies!;
        const {bunnyKit: {sizeLabor, themeLabor, colors}} = this.props;
        const styles = makeStyles(sizeLabor, themeLabor);
        return (
            <View style={styles.container}>
                {currentMessage!.quickReplies!.values.map(
                    (reply: Reply, index: number) => {
                        const selected =
                            type === 'checkbox' && replies.find(sameReply(reply));
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
                                        {color: selected ? colors.text : quickRepliesColor},
                                    ]}
                                >
                                    {reply.title}
                                </Text>
                            </TouchableOpacity>
                        );
                    },
                )}
                {replies.length > 0 && this.renderQuickReplySend()}
            </View>
        );
    }
}

export default withBunnyKit(QuickReplies);
