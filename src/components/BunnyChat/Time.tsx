import React, {Component} from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import dayjs from 'dayjs';
import {TIME_FORMAT} from './Constant';
import {IMessage, LeftRightStyle, PositionLeftOrRight} from './types';
import {WithBunnyKit, withBunnyKit} from '../../hooks/bunny-kit';
import {SizeLabor, ThemeLabor} from '../../types';


const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const {theme: {colors}} = themeLabor;
    const containerStyle = {
        marginLeft: wp(10),
        marginRight: wp(10),
        marginBottom: wp(5),
    };

    const textStyle = {
        fontSize: wp(10),
        backgroundColor: 'transparent',
        textAlign: 'right',
    };
    return {
        left: StyleSheet.create({
            container: {
                ...containerStyle,
            },
            text: {
                color: colors.text3,
                ...textStyle,
            },
        }),
        right: StyleSheet.create({
            container: {
                ...containerStyle,
            },
            text: {
                color: colors.textB,
                ...textStyle,
            },
        }),
    };
};

export interface TimeProps<TMessage extends IMessage> {
    position: PositionLeftOrRight;
    currentMessage?: TMessage;
    timeContainerStyle?: LeftRightStyle<ViewStyle>;
    timeTextStyle?: LeftRightStyle<TextStyle>;
    timeFormat?: string;
}

class Time<TMessage extends IMessage> extends Component<TimeProps<TMessage> & WithBunnyKit> {

    static defaultProps = {
        position: 'left' as PositionLeftOrRight,
        currentMessage: undefined,
        timeContainerStyle: {},
        timeFormat: TIME_FORMAT,
        timeTextStyle: {},
    };

    render() {
        const {
            position,
            timeContainerStyle,
            currentMessage,
            timeFormat,
            timeTextStyle,
            bunnyKit
        } = this.props;

        const {language} = bunnyKit;

        if (!!currentMessage) {
            const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
            const styles = getStyles(sizeLabor, themeLabor);
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
            );
        }
        return null;
    }
}

export default withBunnyKit(Time);
