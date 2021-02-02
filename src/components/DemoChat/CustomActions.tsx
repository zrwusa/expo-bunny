import React from 'react'
import {
    StyleSheet,
    Text, TextProps,
    TouchableOpacity,
    View, ViewProps,
} from 'react-native'

import {
    getLocationAsync,
    pickImageAsync,
    takePictureAsync,
} from './mediaUtils'
import {ActionsProps} from "react-native-gifted-chat/lib/Actions";

type ContextTypes = {
    actionSheet: Function,
}

const defaultProps = {
    onSend: () => {
    },
    options: {},
    renderIcon: null,
    containerStyle: {},
    wrapperStyle: {},
    iconTextStyle: {},
}

export type CustomActionsProps = {
    onSend: Function,
    options: object,
    renderIcon: Function,
    containerStyle: ViewProps['style'],
    wrapperStyle: ViewProps['style'],
    iconTextStyle: TextProps['style'],
}
export default class CustomActions extends React.Component<CustomActionsProps> {
    onActionsPress = () => {
        console.log('---CustomActions onActionsPress')
        const options = [
            'Choose From Library',
            'Take Picture',
            'Send Location',
            'Cancel',
        ]
        const cancelButtonIndex = options.length - 1
        this.context.actionSheet().showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex: number) => {
                console.log('---CustomActions onActionsPress buttonIndex', buttonIndex)
                const {onSend} = this.props
                switch (buttonIndex) {
                    case 0:
                        debugger
                        await pickImageAsync(onSend)
                        return
                    case 1:
                        await takePictureAsync(onSend)
                        return
                    case 2:
                        await getLocationAsync(onSend)
                }
            },
        )
    }

    renderIcon = () => {
        if (this.props.renderIcon) {
            return this.props.renderIcon()
        }
        return (
            <View style={[styles.wrapper, this.props.wrapperStyle]}>
                <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
            </View>
        )
    }

    render() {
        return (
            <TouchableOpacity
                style={[styles.container, this.props.containerStyle]}
                onPress={this.onActionsPress}
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
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
})


