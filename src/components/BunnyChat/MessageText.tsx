import React from 'react'
import {Linking, StyleProp, StyleSheet, Text, TextProps, TextStyle, View, ViewStyle} from 'react-native'
import ParsedText from 'react-native-parsed-text'
import Communications from 'react-native-communications'
import {IMessage, LeftRightStyle, PositionLeftOrRight} from './types'
import {WithBunnyKit, withBunnyKit} from '../../hooks/bunny-kit';
import {ActionSheetProps, connectActionSheet} from '../../../packages/react-native-action-sheet/src';
import {SizeLabor, ThemeLabor} from '../../types';

const WWW_URL_PATTERN = /^www\./i


const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const {theme: {colors}} = themeLabor;
    // TODO not responsive
    const textStyle = {
        fontSize: wp(16),
        lineHeight: wp(20),
        marginTop: wp(5),
        marginBottom: wp(5),
        marginLeft: wp(10),
        marginRight: wp(10),
    }

    return {
        left: StyleSheet.create({
            container: {},
            text: {
                color: colors.textA,
                ...textStyle,
            },
            link: {
                color: colors.textA,
                textDecorationLine: 'underline',
            },
        }),
        right: StyleSheet.create({
            container: {},
            text: {
                color: colors.textB,
                ...textStyle,
            },
            link: {
                color: colors.textB,
                textDecorationLine: 'underline',
            },
        }),
    }
}

const DEFAULT_OPTION_TITLES = ['Call', 'Text', 'Cancel']

export interface MessageTextProps<TMessage extends IMessage> {
    position: PositionLeftOrRight
    phoneNumberOptionTitles?: string[]
    currentMessage?: TMessage
    textContainerStyle?: LeftRightStyle<ViewStyle>
    textStyle?: LeftRightStyle<TextStyle>
    linkStyle?: LeftRightStyle<TextStyle>
    textProps?: TextProps
    customTextStyle?: StyleProp<TextStyle>
    isDebug?: boolean

    parsePatterns?(linkStyle: TextStyle): any

    onMessageLoad?(currentMessage: TMessage): void

    onMessageLoadStart?(currentMessage: TMessage): void

    onMessageLoadEnd?(currentMessage: TMessage): void

    onMessageReadyForDisplay?(currentMessage: TMessage): void

    onMessageLoadError?(e: Error, currentMessage: TMessage): void
}

class MessageText<TMessage extends IMessage> extends React.Component<MessageTextProps<TMessage> & WithBunnyKit & ActionSheetProps> {

    static defaultProps = {
        position: 'left' as PositionLeftOrRight,
        phoneNumberOptionTitles: DEFAULT_OPTION_TITLES,
        currentMessage: undefined,
        textContainerStyle: {},
        textStyle: {},
        linkStyle: {},
        customTextStyle: {},
        textProps: {},
        parsePatterns: () => [],
        onMessageLoad: undefined,
        onMessageLoadStart: undefined,
        onMessageLoadEnd: undefined,
        onMessageReadyForDisplay: undefined,
        onMessageLoadError: undefined,
        isDebug: false,
    }

    // TODO is this necessary
    // shouldComponentUpdate(nextProps: MessageTextProps<TMessage>) {
    //     return (
    //         !!this.props.currentMessage &&
    //         !!nextProps.currentMessage &&
    //         this.props.currentMessage.text !== nextProps.currentMessage.text
    //     )
    // }

    onUrlPress = (url: string) => {
        // When someone sends a message that includes a website address beginning with "www." (omitting the scheme),
        // react-native-parsed-text recognizes it as a valid url, but Linking fails to open due to the missing scheme.
        if (WWW_URL_PATTERN.test(url)) {
            this.onUrlPress(`http://${url}`)
        } else {
            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    console.error('No handler for URL:', url)
                } else {
                    Linking.openURL(url)
                }
            })
        }
    }

    onPhonePress = (phone: string) => {
        const {phoneNumberOptionTitles} = this.props
        // TODO confusing
        const options =
            phoneNumberOptionTitles && phoneNumberOptionTitles.length > 0
                ? phoneNumberOptionTitles.slice(0, 3)
                : DEFAULT_OPTION_TITLES
        const cancelButtonIndex = options.length - 1
        this.props.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            (buttonIndex: number) => {
                switch (buttonIndex) {
                    case 0:
                        Communications.phonecall(phone, true)
                        break
                    case 1:
                        Communications.text(phone)
                        break
                    default:
                        break
                }
            },
        )
    }

    onEmailPress = (email: string) =>
        Communications.email([email], null, null, null, null)

    render() {
        const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
        const styles = getStyles(sizeLabor, themeLabor);
        const linkStyle = [
            styles[this.props.position].link,
            this.props.linkStyle && this.props.linkStyle[this.props.position],
        ]
        const {currentMessage, isDebug} = this.props
        isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', '[level4]MessageText props', this.props)
        return (
            <View
                style={[
                    styles[this.props.position].container,
                    this.props.textContainerStyle &&
                    this.props.textContainerStyle[this.props.position],
                ]}
            >{
                currentMessage ?
                    currentMessage.text
                        ? <ParsedText
                            style={[
                                styles[this.props.position].text,
                                this.props.textStyle && this.props.textStyle[this.props.position],
                                this.props.customTextStyle,
                            ]}
                            parse={[
                                ...this.props.parsePatterns!(linkStyle as TextStyle),
                                {type: 'url', style: linkStyle, onPress: this.onUrlPress},
                                {type: 'phone', style: linkStyle, onPress: this.onPhonePress},
                                {type: 'email', style: linkStyle, onPress: this.onEmailPress},
                            ]}
                            childrenProps={{...this.props.textProps}}

                            onLayout={() => {
                                isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageText onLayout')
                                this.props.onMessageLoad?.(currentMessage)
                                this.props.onMessageLoadStart?.(currentMessage)
                                this.props.onMessageLoadEnd?.(currentMessage)
                                isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageText onMessageReadyForDisplay')
                                this.props.onMessageReadyForDisplay?.(currentMessage)
                            }}
                        >
                            {this.props.currentMessage!.text}
                        </ParsedText>
                        : <Text>{'currentMessage.text is undefined'}</Text>
                    : <Text>{'currentMessage is undefined'}</Text>
            }

            </View>
        )
    }
}

export default withBunnyKit(connectActionSheet(MessageText))
