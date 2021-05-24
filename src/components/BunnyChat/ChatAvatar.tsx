import React, {ReactNode} from 'react'
import {ImageStyle, StyleSheet, TextStyle, View, ViewStyle,} from 'react-native'
import BunnyAvatar from './BunnyAvatar'
import {isSameDay, isSameUser} from './utils'
import {IMessage, LeftRightStyle, User} from './Models'

const styles = {
    left: StyleSheet.create({
        container: {
            marginRight: 8,
        },
        onTop: {
            alignSelf: 'flex-start',
        },
        onBottom: {},
        image: {
            height: 36,
            width: 36,
            borderRadius: 18,
        },
    }),
    right: StyleSheet.create({
        container: {
            marginLeft: 8,
        },
        onTop: {
            alignSelf: 'flex-start',
        },
        onBottom: {},
        image: {
            height: 36,
            width: 36,
            borderRadius: 18,
        },
    }),
}

export interface ChatAvatarProps<TMessage extends IMessage> {
    currentMessage?: TMessage
    previousMessage?: TMessage
    nextMessage?: TMessage
    position: 'left' | 'right'
    renderAvatarOnTop?: boolean
    showAvatarForEveryMessage?: boolean
    avatarImageStyle?: LeftRightStyle<ImageStyle>
    avatarContainerStyle?: LeftRightStyle<ViewStyle>
    avatarTextStyle?: TextStyle

    renderAvatar?(props: Omit<ChatAvatarProps<TMessage>, 'renderAvatar'>): ReactNode

    onPressAvatar?(user: User): void

    onLongPressAvatar?(user: User): void
}

export default class ChatAvatar<TMessage extends IMessage = IMessage> extends React.Component<ChatAvatarProps<TMessage>> {
    static defaultProps = {
        renderAvatarOnTop: false,
        showAvatarForEveryMessage: false,
        position: 'left',
        currentMessage: {
            user: null,
        },
        previousMessage: {},
        nextMessage: {},
        avatarContainerStyle: {},
        avatarImageStyle: {},
        onPressAvatar: () => {
        },
        onLongPressAvatar: () => {
        },
    }


    renderAvatar() {
        if (this.props.renderAvatar) {
            const {renderAvatar, ...avatarProps} = this.props
            return this.props.renderAvatar(avatarProps)
        }
        if (this.props.currentMessage) {
            return (
                <BunnyAvatar
                    avatarStyle={
                        [
                            styles[this.props.position].image,
                            this.props.avatarImageStyle &&
                            this.props.avatarImageStyle[this.props.position],
                        ] as ImageStyle
                    }
                    textStyle={this.props.avatarTextStyle ? this.props.avatarTextStyle : {}}
                    user={this.props.currentMessage.user}
                    onPress={() =>
                        this.props.onPressAvatar &&
                        this.props.onPressAvatar(this.props.currentMessage!.user)
                    }
                    onLongPress={() =>
                        this.props.onLongPressAvatar &&
                        this.props.onLongPressAvatar(this.props.currentMessage!.user)
                    }
                />
            )
        }
        return null
    }

    render() {
        const {
            renderAvatarOnTop,
            showAvatarForEveryMessage,
            avatarContainerStyle,
            position,
            currentMessage,
            renderAvatar,
            previousMessage,
            nextMessage,
            avatarImageStyle,
        } = this.props
        const messageToCompare = renderAvatarOnTop ? previousMessage : nextMessage
        const computedStyle = renderAvatarOnTop ? 'onTop' : 'onBottom'

        if (renderAvatar === null) {
            return null
        }

        if (
            !showAvatarForEveryMessage &&
            currentMessage &&
            messageToCompare &&
            isSameUser(currentMessage, messageToCompare) &&
            isSameDay(currentMessage, messageToCompare)
        ) {
            return (
                <View
                    style={[
                        styles[position].container,
                        avatarContainerStyle && avatarContainerStyle[position],
                    ]}
                >
                    <BunnyAvatar
                        avatarStyle={
                            [
                                styles[position].image,
                                avatarImageStyle && avatarImageStyle[position],
                            ] as ImageStyle
                        }
                    />
                </View>
            )
        }

        return (
            <View
                style={[
                    styles[position].container,
                    styles[position][computedStyle],
                    avatarContainerStyle && avatarContainerStyle[position],
                ]}
            >
                {this.renderAvatar()}
            </View>
        )
    }
}
