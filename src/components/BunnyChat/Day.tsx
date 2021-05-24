import React, {PureComponent} from 'react'
import {StyleProp, StyleSheet, Text, TextProps, TextStyle, View, ViewStyle,} from 'react-native'
import dayjs from 'dayjs'

import Color from './Color'

import {isSameDay} from './utils'
import {DATE_FORMAT} from './Constant'
import {IMessage} from './Models'
import {WithBunnyKit, withBunnyKit} from "../../hooks/bunny-kit";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    text: {
        backgroundColor: Color.backgroundTransparent,
        color: Color.defaultColor,
        fontSize: 12,
        fontWeight: '600',
    },
})

export interface DayProps<TMessage extends IMessage> {
    currentMessage?: TMessage
    nextMessage?: TMessage
    previousMessage?: TMessage
    dayContainerStyle?: StyleProp<ViewStyle>
    dayWrapperStyle?: StyleProp<ViewStyle>
    dayTextStyle?: StyleProp<TextStyle>
    dayTextProps?: TextProps
    dateFormat?: string
}

class Day<TMessage extends IMessage = IMessage> extends PureComponent<DayProps<TMessage> & WithBunnyKit> {

    static defaultProps = {
        currentMessage: undefined,
        previousMessage: undefined,
        nextMessage: undefined,
        dayContainerStyle: {},
        dayWrapperStyle: {},
        dayTextStyle: {},
        dayTextProps: {},
        dateFormat: DATE_FORMAT,
    }


    render() {
        const {
            dateFormat,
            currentMessage,
            previousMessage,
            dayContainerStyle,
            dayWrapperStyle,
            dayTextStyle,
            dayTextProps,
            bunnyKit,
        } = this.props
        const {language} = bunnyKit;
        if (currentMessage && !isSameDay(currentMessage, previousMessage!)) {
            const {createdAt} = currentMessage;

            return (
                <View style={[styles.container, dayContainerStyle]}>
                    <View style={dayWrapperStyle}>
                        <Text style={[styles.text, dayTextStyle]} {...dayTextProps}>
                            {dayjs(createdAt)
                                .locale(language)
                                .format(dateFormat)}
                        </Text>
                    </View>
                </View>
            )
        }
        return null
    }
}

export default withBunnyKit(Day)
