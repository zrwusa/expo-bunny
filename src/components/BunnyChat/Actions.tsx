import React, {ReactNode} from 'react'
import {StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle,} from 'react-native'
import Color from './Color'
import {WithBunnyKit, withBunnyKit} from "../../hooks/bunny-kit";
import {ActionSheetProps, connectActionSheet} from "../../../packages/react-native-action-sheet/src";

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

export interface ActionsProps {
    actionsConfig?: { [key: string]: (props: ActionsProps & ActionSheetProps & WithBunnyKit) => void }
    actionOptionTintColor?: string
    renderActionIcon?: () => ReactNode
    actionWrapperStyle?: StyleProp<ViewStyle>
    actionIconTextStyle?: StyleProp<TextStyle>
    actionContainerStyle?: StyleProp<ViewStyle>

    onPressActionButton?(): void
}

class Actions extends React.Component<ActionsProps & ActionSheetProps & WithBunnyKit> {
    static defaultProps: ActionsProps = {
        actionsConfig: {},
        actionOptionTintColor: Color.optionTintColor,
        renderActionIcon: undefined,
        actionContainerStyle: {},
        actionIconTextStyle: {},
        actionWrapperStyle: {},
    }

    onActionsPress = () => {
        // TODO support multi actions
        const {actionsConfig, showActionSheetWithOptions} = this.props
        const optionKeys = Object.keys(actionsConfig!)
        const cancelButtonIndex = optionKeys.indexOf('Cancel')
        showActionSheetWithOptions(
            {
                options: optionKeys,
                cancelButtonIndex,
                tintColor: this.props.actionOptionTintColor,
            },
            (buttonIndex: number) => {
                const key = optionKeys[buttonIndex]
                if (key) {
                    actionsConfig![key](this.props)
                }
            },
        )
    }

    renderIcon() {
        if (this.props.renderActionIcon) {
            return this.props.renderActionIcon()
        }
        // TODO support multi actions
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

export default withBunnyKit(connectActionSheet(Actions))
