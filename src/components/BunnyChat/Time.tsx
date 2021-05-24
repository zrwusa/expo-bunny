import React, {Component} from 'react'
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native'
import dayjs from 'dayjs'

import Color from './Color'
import {TIME_FORMAT} from './Constant'
import {IMessage, LeftRightStyle} from './Models'

const containerStyle = {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
}

const textStyle = {
    fontSize: 10,
    backgroundColor: 'transparent',
    textAlign: 'right',
}

const styles = {
    left: StyleSheet.create({
        container: {
            ...containerStyle,
        },
        text: {
            color: Color.timeTextColor,
            ...textStyle,
        },
    }),
    right: StyleSheet.create({
        container: {
            ...containerStyle,
        },
        text: {
            color: Color.white,
            ...textStyle,
        },
    }),
}

export interface TimeProps<TMessage extends IMessage> {
    position: 'left' | 'right'
    currentMessage?: TMessage
    timeContainerStyle?: LeftRightStyle<ViewStyle>
    timeTextStyle?: LeftRightStyle<TextStyle>
    timeFormat?: string
}

export default class Time<TMessage extends IMessage = IMessage> extends Component<TimeProps<TMessage>> {
    static contextTypes = {
        getLocale: function () {

        },
    }

    static defaultProps = {
        position: 'left',
        currentMessage: {
            createdAt: null,
        },
        timeContainerStyle: {},
        timeFormat: TIME_FORMAT,
        timeTextStyle: {},
    }

    render() {
        const {
            position,
            timeContainerStyle,
            currentMessage,
            timeFormat,
            timeTextStyle,
        } = this.props

        if (!!currentMessage) {
            return (
                <View
                    style={[
                        styles[position].container,
                        timeContainerStyle && timeContainerStyle[position],
                    ]}
                >
                    <Text
                        style={
                            [
                                styles[position].text,
                                timeTextStyle && timeTextStyle[position],
                            ] as TextStyle
                        }
                    >
                        {dayjs(currentMessage.createdAt)
                            .locale(this.context.getLocale())
                            .format(timeFormat)}
                    </Text>
                </View>
            )
        }
        return null
    }
}
