import {StyleProp, ViewStyle} from 'react-native'

export type {ActionsProps} from './Actions'
export type {AvatarProps} from './Avatar'
export type {
    BubbleProps,
    RenderMessageImageProps,
    RenderMessageVideoProps,
    RenderMessageAudioProps,
    RenderMessageTextProps,
} from './Bubble'
export type {ComposerProps} from './Composer'
export type {DayProps} from './Day'
export type {GiftedAvatarProps} from './GiftedAvatar'
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

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

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

export type IChatMessage = IMessage

export interface MessageVideoProps<TMessage extends IMessage> {
    currentMessage?: TMessage
    containerStyle?: StyleProp<ViewStyle>
    videoStyle?: StyleProp<ViewStyle>
    videoProps?: object
    // TODO: should be LightBox properties
    lightBoxProps?: object
}

export interface MessageAudioProps<TMessage extends IMessage> {
    currentMessage?: TMessage
    containerStyle?: StyleProp<ViewStyle>
    audioStyle?: StyleProp<ViewStyle>
    audioProps?: object
}
