import React from 'react'
import {EmitterSubscription, Keyboard, StyleProp, StyleSheet, View, ViewStyle,} from 'react-native'

import Composer, {ComposerProps} from './Composer'
import Send, {SendProps} from './Send'
import Actions, {ActionsProps} from './Actions'
import Color from './Color'
import {IMessage} from "./Models";

const styles = StyleSheet.create({
    container: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: Color.defaultColor,
        backgroundColor: Color.white,
        bottom: 0,
        left: 0,
        right: 0,
    },
    primary: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    accessory: {
        height: 44,
    },
})


export interface InputToolbarProps<TMessage extends IMessage> extends ActionsProps,
    SendProps<TMessage>,
    ComposerProps {
    inputToolbarContainerStyle?: StyleProp<ViewStyle>,

    renderActions?(props: ActionsProps): React.ReactNode,

    renderSend?(props: SendProps<TMessage>): React.ReactNode,

    renderComposer?(props: ComposerProps): React.ReactNode,

    renderAccessory?(props: InputToolbarProps<TMessage>): React.ReactNode,

    accessoryStyle?: StyleProp<ViewStyle>,
    primaryStyle?: StyleProp<ViewStyle>,

    // options?: { [key: string]: any }
    // optionTintColor?: string
    // inputToolbarContainerStyle?: StyleProp<ViewStyle>
    // primaryStyle?: StyleProp<ViewStyle>
    // accessoryStyle?: StyleProp<ViewStyle>
    //
    // renderAccessory?(props: InputToolbarProps<TMessage>): React.ReactNode
    //
    // renderActions?(props: ActionsProps): React.ReactNode
    //
    // renderSend?(props: SendProps<TMessage>): React.ReactNode
    //
    // renderComposer?(props: ComposerProps): React.ReactNode

    onPressActionButton?(): void
}

export default class InputToolbar<TMessage extends IMessage> extends React.Component<InputToolbarProps<TMessage>,
    { position: string }> {
    static defaultProps = {
        renderAccessory: null,
        renderActions: null,
        renderSend: null,
        renderComposer: null,
        inputToolbarContainerStyle: {},
        primaryStyle: {},
        accessoryStyle: {},
        onPressActionButton: () => {
        },
    }


    state = {
        position: 'absolute',
    }

    keyboardWillShowListener?: EmitterSubscription = undefined
    keyboardWillHideListener?: EmitterSubscription = undefined

    componentDidMount() {
        this.keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            this.keyboardWillShow,
        )
        this.keyboardWillHideListener = Keyboard.addListener(
            'keyboardWillHide',
            this.keyboardWillHide,
        )
    }

    componentWillUnmount() {
        if (this.keyboardWillShowListener) {
            this.keyboardWillShowListener.remove()
        }
        if (this.keyboardWillHideListener) {
            this.keyboardWillHideListener.remove()
        }
    }

    keyboardWillShow = () => {
        if (this.state.position !== 'relative') {
            this.setState({
                position: 'relative',
            })
        }
    }

    keyboardWillHide = () => {
        if (this.state.position !== 'absolute') {
            this.setState({
                position: 'absolute',
            })
        }
    }

    renderActions() {
        // const {inputToolbarContainerStyle, ...props} = this.props
        const {
            showActionSheetWithOptions,
            actionOptionTintColor,
            renderActionIcon,
            actionContainerStyle,
            actionIconTextStyle,
            actionWrapperStyle,
        } = this.props;
        const actionsProps = {
            showActionSheetWithOptions,
            actionOptionTintColor,
            renderActionIcon,
            actionContainerStyle,
            actionIconTextStyle,
            actionWrapperStyle,
        }
        if (this.props.renderActions) {
            return this.props.renderActions(actionsProps)
        } else if (this.props.onPressActionButton) {
            return <Actions {...actionsProps} />
        }
        return null
    }

    renderSend() {
        const {
            text,
            onSend,
            sendLabel,
            sendContainerStyle,
            sendTextStyle,
            children,
            alwaysShowSend,
            disabled,
            sendButtonProps
        } = this.props;
        const sendProps = {
            text,
            onSend,
            sendLabel,
            sendContainerStyle,
            sendTextStyle,
            children,
            alwaysShowSend,
            disabled,
            sendButtonProps
        }
        if (this.props.renderSend) {
            return this.props.renderSend(sendProps)
        }
        return <Send {...sendProps} />
    }

    renderComposer() {
        const {
            composerHeight,
            text,
            placeholderTextColor,
            placeholder,
            textInputProps,
            multiline,
            disableComposer,
            textInputStyle,
            textInputAutoFocus,
            keyboardAppearance,
            onTextChanged,
            onInputSizeChanged
        } = this.props;
        const composerProps = {
            composerHeight,
            text,
            placeholderTextColor,
            placeholder,
            textInputProps,
            multiline,
            disableComposer,
            textInputStyle,
            textInputAutoFocus,
            keyboardAppearance,
            onTextChanged,
            onInputSizeChanged
        }
        if (this.props.renderComposer) {
            return this.props.renderComposer(composerProps)
        }

        return <Composer {...composerProps} />
    }

    renderAccessory() {
        if (this.props.renderAccessory) {
            return (
                <View style={[styles.accessory, this.props.accessoryStyle]}>
                    {this.props.renderAccessory(this.props)}
                </View>
            )
        }
        return null
    }

    render() {
        return (
            <View
                style={
                    [
                        styles.container,
                        {position: this.state.position},
                        this.props.inputToolbarContainerStyle,
                    ] as ViewStyle
                }
            >
                <View style={[styles.primary, this.props.primaryStyle]}>
                    {this.renderActions()}
                    {this.renderComposer()}
                    {this.renderSend()}
                </View>
                {this.renderAccessory()}
            </View>
        )
    }
}
