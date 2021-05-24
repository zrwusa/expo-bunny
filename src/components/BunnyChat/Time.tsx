import React, {Component} from 'react'
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native'
import dayjs from 'dayjs'

import Color from './Color'
import {TIME_FORMAT} from './Constant'
import {IMessage, LeftRightStyle, PositionLeftOrRight} from './Models'
import {WithBunnyKit, withBunnyKit} from "../../hooks/bunny-kit";

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
    position: PositionLeftOrRight
    currentMessage?: TMessage
    timeContainerStyle?: LeftRightStyle<ViewStyle>
    timeTextStyle?: LeftRightStyle<TextStyle>
    timeFormat?: string
}

class Time<TMessage extends IMessage = IMessage> extends Component<TimeProps<TMessage> & WithBunnyKit> {

    static defaultProps = {
        position: 'left' as PositionLeftOrRight,
        currentMessage: undefined,
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
            bunnyKit
        } = this.props

        const {language} = bunnyKit;

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
                            .locale(language)
                            .format(timeFormat)}
                    </Text>
                </View>
            )
        }
        return null
    }
}

export default withBunnyKit(Time)
