import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle,} from 'react-native';
import {WithBunnyKit, withBunnyKit} from '../../hooks/bunny-kit';
import {ActionSheetProps, connectActionSheet} from '../../../packages/react-native-action-sheet/src';
import {SizeLabor, ThemeLabor} from '../../types';

const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const {theme: {colors}} = themeLabor;
    return StyleSheet.create({
        container: {
            width: wp(26),
            height: wp(26),
            marginLeft: wp(10),
            marginBottom: wp(10),
        },
        wrapper: {
            borderRadius: wp(13),
            borderColor: colors.border,
            borderWidth: wp(2),
            flex: 1,
        },
        iconText: {
            color: colors.text3,
            fontWeight: 'bold',
            fontSize: wp(16),
            backgroundColor: colors.transparent,
            textAlign: 'center',
        },
    });
};

export interface ActionsProps {
    actionsConfig?: { [key: string]: (props: ActionsProps & ActionSheetProps & WithBunnyKit) => void };
    actionOptionTintColor?: string;
    renderActionIcon?: () => ReactNode;
    actionWrapperStyle?: StyleProp<ViewStyle>;
    actionIconTextStyle?: StyleProp<TextStyle>;
    actionContainerStyle?: StyleProp<ViewStyle>;

    onPressActionButton?(): void;
}

class Actions extends React.Component<ActionsProps & ActionSheetProps & WithBunnyKit> {
    static defaultProps: ActionsProps = {
        actionsConfig: {},
        actionOptionTintColor: '#007AFF',
        renderActionIcon: undefined,
        actionContainerStyle: {},
        actionIconTextStyle: {},
        actionWrapperStyle: {},
    };

    onActionsPress = () => {
        // TODO support multi actions
        const {actionsConfig, showActionSheetWithOptions} = this.props;
        const optionKeys = Object.keys(actionsConfig!);
        const cancelButtonIndex = optionKeys.indexOf('Cancel');
        showActionSheetWithOptions(
            {
                options: optionKeys,
                cancelButtonIndex,
                tintColor: this.props.actionOptionTintColor,
            },
            (buttonIndex: number) => {
                const key = optionKeys[buttonIndex];
                if (key) {
                    actionsConfig![key](this.props);
                }
            },
        );
    };

    renderIcon() {
        if (this.props.renderActionIcon) {
            return this.props.renderActionIcon();
        }
        const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
        const styles = getStyles(sizeLabor, themeLabor);
        // TODO support multi actions
        return (
            <View style={[styles.wrapper, this.props.actionWrapperStyle]}>
                <Text style={[styles.iconText, this.props.actionIconTextStyle]}>+</Text>
            </View>
        );
    }

    render() {
        const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
        const styles = getStyles(sizeLabor, themeLabor);
        return (
            <TouchableOpacity
                style={[styles.container, this.props.actionContainerStyle]}
                onPress={this.props.onPressActionButton || this.onActionsPress}
            >
                {this.renderIcon()}
            </TouchableOpacity>
        );
    }
}

export default withBunnyKit(connectActionSheet(Actions));
