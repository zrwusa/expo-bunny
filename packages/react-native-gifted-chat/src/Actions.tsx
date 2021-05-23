import React, {ReactNode} from 'react'
import {StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle,} from 'react-native'
import Color from './Color'

export interface ActionsProps {
    showActionSheetWithOptions?: { [key: string]: any }
    actionOptionTintColor?: string
    renderActionIcon?: () => ReactNode
    actionWrapperStyle?: StyleProp<ViewStyle>
    actionIconTextStyle?: StyleProp<TextStyle>
    actionContainerStyle?: StyleProp<ViewStyle>

    onPressActionButton?(): void
}

export default class Actions extends React.Component<ActionsProps> {
    static defaultProps: ActionsProps = {
        showActionSheetWithOptions: {},
        actionOptionTintColor: Color.optionTintColor,
        renderActionIcon: undefined,
        actionContainerStyle: {},
        actionIconTextStyle: {},
        actionWrapperStyle: {},
    }

    static contextTypes = {
        actionSheet: function () {

        },
    }

    onActionsPress = () => {
        const {showActionSheetWithOptions} = this.props
        const optionKeys = Object.keys(showActionSheetWithOptions!)
        const cancelButtonIndex = optionKeys.indexOf('Cancel')
        this.context.actionSheet().showActionSheetWithOptions(
            {
                options: optionKeys,
                cancelButtonIndex,
                tintColor: this.props.actionOptionTintColor,
            },
            (buttonIndex: number) => {
                const key = optionKeys[buttonIndex]
                if (key) {
                    showActionSheetWithOptions![key](this.props)
                }
            },
        )
    }

    renderIcon() {
        if (this.props.renderActionIcon) {
            return this.props.renderActionIcon()
        }
        return (
            <View style={[styles.wrapper, this.props.actionWrapperStyle]}>
                <Text style={[styles.iconText, this.props.actionIconTextStyle]}>+</Text>
            </View>
        )
    }

    render() {
        return (
            <TouchableOpacity
                style={[styles.container, this.props.actionContainerStyle]}
                onPress={this.props.onPressActionButton || this.onActionsPress}
            >
                {this.renderIcon()}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: Color.defaultColor,
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: Color.defaultColor,
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: Color.backgroundTransparent,
        textAlign: 'center',
    },
})
