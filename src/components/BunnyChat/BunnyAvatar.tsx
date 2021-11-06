import React from 'react';
import {Image, ImageStyle, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View,} from 'react-native';
import {User} from './types';
import {WithBunnyKit, withBunnyKit} from '../../hooks/bunny-kit';
import {SizeLabor, ThemeLabor} from '../../types';


const makeStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const {theme: {colors}} = themeLabor;
    return StyleSheet.create({
        avatarStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            width: wp(40),
            height: wp(40),
            borderRadius: wp(20),
        },
        avatarTransparent: {
            backgroundColor: colors.transparent,
        },
        textStyle: {
            color: colors.text,
            fontSize: wp(16),
            backgroundColor: colors.transparent,
            fontWeight: '100',
        },
    });
};

export interface GiftedAvatarProps {
    user?: User;
    avatarStyle?: StyleProp<ImageStyle>;
    textStyle?: StyleProp<TextStyle>;

    onPress?(props: any): void;

    onLongPress?(props: any): void;
}

class BunnyAvatar extends React.Component<GiftedAvatarProps & WithBunnyKit> {
    static defaultProps = {
        user: undefined,
        onPress: undefined,
        onLongPress: undefined,
        avatarStyle: {},
        textStyle: {},
    };


    avatarName?: string = undefined;
    avatarColor?: string = undefined;

    setAvatarColor() {
        const userName = (this.props.user && this.props.user.name) || '';
        const name = userName.toUpperCase().split(' ');
        if (name.length === 1) {
            this.avatarName = `${name[0].charAt(0)}`;
        } else if (name.length > 1) {
            this.avatarName = `${name[0].charAt(0)}${name[1].charAt(0)}`;
        } else {
            this.avatarName = '';
        }

        let sumChars = 0;
        for (let i = 0; i < userName.length; i += 1) {
            sumChars += userName.charCodeAt(i);
        }

        // inspired by https://github.com/wbinnssmith/react-user-avatar
        // colors from https://flatuicolors.com/
        const colors = [
            '#e67e22',
            '#2ecc71',
            '#3498db',
            '#8e44ad',
            '#e74c3c',
            '#1abc9c',
            '#2c3e50',
        ];

        this.avatarColor = colors[sumChars % colors.length];
    }

    renderAvatar() {
        const {user} = this.props;
        if (user) {
            const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
            const styles = makeStyles(sizeLabor, themeLabor);
            if (typeof user.avatar === 'function') {
                return user.avatar([styles.avatarStyle, this.props.avatarStyle]);
            } else if (typeof user.avatar === 'string') {
                return (
                    <Image
                        source={{uri: user.avatar}}
                        style={[styles.avatarStyle, this.props.avatarStyle]}
                    />
                );
            } else if (typeof user.avatar === 'number') {
                return (
                    <Image
                        source={user.avatar}
                        style={[styles.avatarStyle, this.props.avatarStyle]}
                    />
                );
            }
        }
        return null;
    }

    renderInitials() {
        const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
        const styles = makeStyles(sizeLabor, themeLabor);
        return (
            <Text style={[styles.textStyle, this.props.textStyle]}>
                {this.avatarName}
            </Text>
        );
    }

    handleOnPress = () => {
        const {onPress, ...other} = this.props;
        if (this.props.onPress) {
            this.props.onPress(other);
        }
    };

    handleOnLongPress = () => {
    };

    render() {
        const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
        const styles = makeStyles(sizeLabor, themeLabor);
        if (
            !this.props.user ||
            (!this.props.user.name && !this.props.user.avatar)
        ) {
            // render placeholder

            return (
                <View
                    style={[
                        styles.avatarStyle,
                        styles.avatarTransparent,
                        this.props.avatarStyle,
                    ]}
                    // @ts-ignore
                    accessibilityTraits="image"
                />
            );
        }
        if (this.props.user.avatar) {
            return (
                <TouchableOpacity
                    disabled={!this.props.onPress}
                    onPress={this.props.onPress}
                    onLongPress={this.props.onLongPress}
                    // @ts-ignore
                    accessibilityTraits="image"
                >
                    {this.renderAvatar()}
                </TouchableOpacity>
            );
        }

        this.setAvatarColor();

        return (
            <TouchableOpacity
                disabled={!this.props.onPress}
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
                style={[
                    styles.avatarStyle,
                    {backgroundColor: this.avatarColor},
                    this.props.avatarStyle,
                ]}
                // @ts-ignore
                accessibilityTraits="image"
            >
                {this.renderInitials()}
            </TouchableOpacity>
        );
    }
}

export default withBunnyKit(BunnyAvatar);
