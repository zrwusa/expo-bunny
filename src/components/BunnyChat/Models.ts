import {StyleProp} from 'react-native'

export type {ActionsProps} from './Actions'
export type {ChatAvatarProps} from './ChatAvatar'
export type {
    BubbleProps,
} from './Bubble'
export type {ComposerProps} from './Composer'
export type {DayProps} from './Day'
export type {GiftedAvatarProps} from './BunnyAvatar'
export type {InputToolbarProps} from './InputToolbar'
export type {LoadEarlierProps} from './LoadEarlier'
export type {MessageProps} from './Message'
export type {MessageContainerProps} from './MessageContainer'
export type {MessageImageProps} from './MessageImage'
export type {MessageTextProps} from './MessageText'
export type {QuickRepliesProps} from './QuickReplies'
export type {SendProps} from './Send'
export type {SystemMessageProps} from './SystemMessage'
export type {TimeProps} from './Time'

export interface LeftRightStyle<T> {
    left?: StyleProp<T>
    right?: StyleProp<T>
}

type renderFunction = (x: any) => JSX.Element

export interface User {
    _id: string | number
    name?: string
    avatar?: string | number | renderFunction
}

export interface Reply {
    title: string
    value: string
    messageId?: any
}

export interface QuickReplies {
    type: 'radio' | 'checkbox'
    values: Reply[]
    keepIt?: boolean
}

export interface IMessage {
    _id: string | number
    text: string
    createdAt: Date | number
    user: User
    image?: string
    sticker?: string
    video?: string
    audio?: string
    system?: boolean
    sent?: boolean
    received?: boolean
    pending?: boolean
    quickReplies?: QuickReplies
}

export type PositionLeftOrRight = 'left' | 'right'
