import React, {Component} from 'react'
import {StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle,} from 'react-native'
import Color from './Color'
import {IMessage} from './types'
import {SizeLabor, ThemeLabor} from "../../types";
import {withBunnyKit, WithBunnyKit} from "../../hooks/bunny-kit";

const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            marginTop: wp(5),
            marginBottom: wp(10),
        },
        text: {
            backgroundColor: Color.backgroundTransparent,
            color: Color.defaultColor,
            fontSize: wp(12),
            fontWeight: '300',
        },
    })
}

export interface SystemMessageProps<TMessage extends IMessage> {
    currentMessage?: TMessage
    systemMessageContainerStyle?: StyleProp<ViewStyle>
    systemMessageWrapperStyle?: StyleProp<ViewStyle>
    systemTextStyle?: StyleProp<TextStyle>
}

class SystemMessage<TMessage extends IMessage> extends Component<SystemMessageProps<TMessage> & WithBunnyKit> {
    static defaultProps = {
        currentMessage: undefined,
        systemMessageContainerStyle: {},
        systemMessageWrapperStyle: {},
        systemTextStyle: {},
    }

    render() {
        const {
            currentMessage,
            systemMessageContainerStyle,
            systemMessageWrapperStyle,
            systemTextStyle,
        } = this.props
        if (currentMessage) {
            const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
            const styles = getStyles(sizeLabor, themeLabor);
            return (
                <View style={[styles.container, systemMessageContainerStyle]}>
                    <View style={systemMessageWrapperStyle}>
                        <Text style={[styles.text, systemTextStyle]}>{currentMessage.text}</Text>
                    </View>
                </View>
            )
        }
        return null
    }
}

export default withBunnyKit(SystemMessage)
