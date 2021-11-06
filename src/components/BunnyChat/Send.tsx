import React, {Component} from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewStyle,
} from 'react-native';
import {IMessage} from './types';
import {SizeLabor, ThemeLabor} from '../../types';
import {WithBunnyKit, withBunnyKit} from '../../hooks/bunny-kit';

const makeStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const {theme: {colors}} = themeLabor;
    return StyleSheet.create({
        container: {
            height: wp(44),
            justifyContent: 'flex-end',
        },
        text: {
            color: colors.accent,
            fontWeight: '600',
            fontSize: wp(17),
            backgroundColor: colors.transparent,
            marginBottom: wp(12),
            marginLeft: wp(10),
            marginRight: wp(10),
        },
    });
};

export interface SendProps<TMessage extends IMessage> {
    text?: string;
    sendLabel?: string;
    sendContainerStyle?: StyleProp<ViewStyle>;
    sendTextStyle?: StyleProp<TextStyle>;
    children?: React.ReactNode;
    alwaysShowSend?: boolean;
    disabled?: boolean;
    sendButtonProps?: Partial<TouchableOpacityProps>;

    onSend?(
        messages: TMessage | TMessage[],
        shouldResetInputToolbar: boolean,
    ): void;
}

class Send<TMessage extends IMessage> extends Component<SendProps<TMessage> & WithBunnyKit> {
    static defaultProps = {
        text: '',
        onSend: () => {
        },
        sendLabel: 'Send',
        sendContainerStyle: {},
        sendTextStyle: {},
        children: null,
        alwaysShowSend: false,
        disabled: false,
        sendButtonProps: undefined,
    };

    handleOnPress = () => {
        const {text, onSend} = this.props;
        if (text && onSend) {
            onSend({text: text.trim()} as TMessage, true);
        }
    };

    render() {
        const {
            text,
            sendContainerStyle,
            children,
            sendTextStyle,
            sendLabel,
            alwaysShowSend,
            disabled,
            sendButtonProps,
        } = this.props;
        if (alwaysShowSend || (text && text.trim().length > 0)) {
            const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
            const styles = makeStyles(sizeLabor, themeLabor);
            return (
                <TouchableOpacity
                    testID="send"
                    accessible
                    accessibilityLabel="send"
                    style={[styles.container, sendContainerStyle]}
                    onPress={this.handleOnPress}
                    // @ts-ignore
                    accessibilityTraits="button"
                    disabled={disabled}
                    {...sendButtonProps}
                >
                    <View>
                        {children || <Text style={[styles.text, sendTextStyle]}>{sendLabel}</Text>}
                    </View>
                </TouchableOpacity>
            );
        }
        return <View/>;
    }
}

export default withBunnyKit(Send);
