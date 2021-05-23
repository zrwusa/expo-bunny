import React, {PureComponent} from 'react'
import {StyleProp, StyleSheet, Text, TextProps, TextStyle, View, ViewStyle,} from 'react-native'
import dayjs from 'dayjs'

import Color from './Color'

import {isSameDay} from './utils'
import {DATE_FORMAT} from './Constant'
import {IMessage} from './Models'

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

export default class Day<TMessage extends IMessage = IMessage> extends PureComponent<DayProps<TMessage>> {
    static contextTypes = {
        getLocale: function () {

        },
    }

    static defaultProps = {
        currentMessage: {
            createdAt: null,
        },
        previousMessage: {},
        nextMessage: {},
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
        } = this.props
        if (currentMessage && !isSameDay(currentMessage, previousMessage!)) {
            const {createdAt} = currentMessage;

            return (
                <View style={[styles.container, dayContainerStyle]}>
                    <View style={dayWrapperStyle}>
                        <Text style={[styles.text, dayTextStyle]} {...dayTextProps}>
                            {dayjs(createdAt)
                                .locale(this.context.getLocale())
                                .format(dateFormat)}
                        </Text>
                    </View>
                </View>
            )
        }
        return null
    }
}
