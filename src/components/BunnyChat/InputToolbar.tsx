import React from 'react'
import {EmitterSubscription, Keyboard, StyleProp, StyleSheet, View, ViewStyle,} from 'react-native'

import Composer, {ComposerProps} from './Composer'
import Send, {SendProps} from './Send'
import Actions, {ActionsProps} from './Actions'
import {IMessage} from './types';
import {WithBunnyKit, withBunnyKit} from '../../hooks/bunny-kit';
import {SizeLabor, ThemeLabor} from '../../types';

const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const {theme: {colors}} = themeLabor;
    return StyleSheet.create({
        container: {
            borderTopWidth: StyleSheet.hairlineWidth, // TODO use bunnyKit measure
            borderTopColor: colors.border,
            backgroundColor: colors.background,
            bottom: 0,
            left: 0,
            right: 0,
        },
        primary: {
            flexDirection: 'row',
            alignItems: 'flex-end',
        },
        accessory: {
            height: wp(44),
        },
    })
}


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

    onPressActionButton?(): void
}

export interface InputToolbarState {
    position: string
}

class InputToolbar<TMessage extends IMessage> extends React.Component<InputToolbarProps<TMessage> & WithBunnyKit,
    InputToolbarState> {
    static defaultProps = {
        renderAccessory: undefined,
        renderActions: undefined,
        renderSend: undefined,
        renderComposer: undefined,
        inputToolbarContainerStyle: {},
        primaryStyle: {},
        accessoryStyle: {},
        onPressActionButton: () => {
        },
    }

    // TODO constructor
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
        const {
            actionsConfig,
            actionOptionTintColor,
            renderActionIcon,
            actionContainerStyle,
            actionIconTextStyle,
            actionWrapperStyle,
        } = this.props;
        const actionsProps = {
            actionsConfig,
            actionOptionTintColor,
            renderActionIcon,
            actionContainerStyle,
            actionIconTextStyle,
            actionWrapperStyle,
        }
        if (this.props.renderActions) {
            return this.props.renderActions(actionsProps)
            // } else {
        } else if (actionsConfig) {
            // TODO why need onPressActionButton to render Actions
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
        return <Send<TMessage> {...sendProps} />
        // return <Send {...sendProps} />
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
            const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
            const styles = getStyles(sizeLabor, themeLabor);
            return (
                <View style={[styles.accessory, this.props.accessoryStyle]}>
                    {this.props.renderAccessory(this.props)}
                </View>
            )
        }
        return null
    }

    render() {
        const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
        const styles = getStyles(sizeLabor, themeLabor);
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

export default withBunnyKit(InputToolbar)
