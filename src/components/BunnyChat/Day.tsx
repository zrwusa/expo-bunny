import React, {PureComponent} from 'react';
import {StyleProp, StyleSheet, Text, TextProps, TextStyle, View, ViewStyle,} from 'react-native';
import dayjs from 'dayjs';

import {isSameDay} from './utils';
import {DATE_FORMAT} from './Constant';
import {IMessage} from './types';
import {WithBunnyKit, withBunnyKit} from '../../hooks';
import {SizeLabor, ThemeLabor} from '../../types';

const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const {theme: {colors}} = themeLabor;
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: wp(5),
            marginBottom: wp(10),
        },
        text: {
            backgroundColor: colors.transparent,
            color: colors.text3,
            fontSize: wp(12),
            fontWeight: '600',
        },
    });

};

export interface DayProps<TMessage extends IMessage> {
    currentMessage?: TMessage;
    nextMessage?: TMessage;
    previousMessage?: TMessage;
    dayContainerStyle?: StyleProp<ViewStyle>;
    dayWrapperStyle?: StyleProp<ViewStyle>;
    dayTextStyle?: StyleProp<TextStyle>;
    dayTextProps?: TextProps;
    dateFormat?: string;
}

class Day<TMessage extends IMessage> extends PureComponent<DayProps<TMessage> & WithBunnyKit> {

    static defaultProps = {
        currentMessage: undefined,
        previousMessage: undefined,
        nextMessage: undefined,
        dayContainerStyle: {},
        dayWrapperStyle: {},
        dayTextStyle: {},
        dayTextProps: {},
        dateFormat: DATE_FORMAT,
    };


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
        } = this.props;
        const {language} = bunnyKit;
        if (currentMessage && !isSameDay(currentMessage, previousMessage!)) {
            const {createdAt} = currentMessage;
            const {sizeLabor, themeLabor} = bunnyKit;
            const styles = getStyles(sizeLabor, themeLabor);
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
            );
        }
        return null;
    }
}

export default withBunnyKit(Day);
