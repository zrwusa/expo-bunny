import React from 'react'
import {Linking, StyleProp, StyleSheet, Text, TextProps, TextStyle, View, ViewStyle} from 'react-native'
// @ts-ignore
import ParsedText from 'react-native-parsed-text'
import Communications from 'react-native-communications'
import {IMessage, LeftRightStyle} from './Models'

const WWW_URL_PATTERN = /^www\./i

const textStyle = {
    fontSize: 16,
    lineHeight: 20,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
}

const styles = {
    left: StyleSheet.create({
        container: {},
        text: {
            color: 'black',
            ...textStyle,
        },
        link: {
            color: 'black',
            textDecorationLine: 'underline',
        },
    }),
    right: StyleSheet.create({
        container: {},
        text: {
            color: 'white',
            ...textStyle,
        },
        link: {
            color: 'white',
            textDecorationLine: 'underline',
        },
    }),
}

const DEFAULT_OPTION_TITLES = ['Call', 'Text', 'Cancel']

export interface MessageTextProps<TMessage extends IMessage> {
    position: 'left' | 'right'
    optionTitles?: string[]
    currentMessage?: TMessage
    containerStyle?: LeftRightStyle<ViewStyle>
    textStyle?: LeftRightStyle<TextStyle>
    linkStyle?: LeftRightStyle<TextStyle>
    textProps?: TextProps
    customTextStyle?: StyleProp<TextStyle>

    parsePatterns?(linkStyle: TextStyle): any

    onMessageLoad?(currentMessage: TMessage): void

    onMessageLoadStart?(currentMessage: TMessage): void

    onMessageLoadEnd?(currentMessage: TMessage): void

    onMessageReadyForDisplay?(currentMessage: TMessage): void

    onMessageLoadError?(e: Error, currentMessage: TMessage): void

    isDebug?: boolean
}

export default class MessageText<TMessage extends IMessage = IMessage> extends React.Component<MessageTextProps<TMessage>> {
    static contextTypes = {
        actionSheet: function () {

        },
    }

    static defaultProps = {
        position: 'left',
        optionTitles: DEFAULT_OPTION_TITLES,
        currentMessage: {
            text: '',
        },
        containerStyle: {},
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

    shouldComponentUpdate(nextProps: MessageTextProps<TMessage>) {
        return (
            !!this.props.currentMessage &&
            !!nextProps.currentMessage &&
            this.props.currentMessage.text !== nextProps.currentMessage.text
        )
    }

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
        debugger
        const {optionTitles} = this.props
        const options =
            optionTitles && optionTitles.length > 0
                ? optionTitles.slice(0, 3)
                : DEFAULT_OPTION_TITLES
        const cancelButtonIndex = options.length - 1
        console.log(this.context)
        this.context.actionSheet().showActionSheetWithOptions(
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
        const linkStyle = [
            styles[this.props.position].link,
            this.props.linkStyle && this.props.linkStyle[this.props.position],
        ]
        const {currentMessage, isDebug} = this.props
        return (
            <View
                style={[
                    styles[this.props.position].container,
                    this.props.containerStyle &&
                    this.props.containerStyle[this.props.position],
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
                                isDebug && console.log('---MessageText onLayout')
                                this.props.onMessageLoad?.(currentMessage)
                                this.props.onMessageLoadStart?.(currentMessage)
                                this.props.onMessageLoadEnd?.(currentMessage)
                                isDebug && console.log('---MessageText onMessageReadyForDisplay')
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
