import React from 'react';
import {
    ActivityIndicator,
    Platform,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import {WithBunnyKit, withBunnyKit} from '../../hooks/bunny-kit';
import {ActivityIndicatorSize} from './types';
import {SizeLabor, ThemeLabor} from '../../types';

const makeStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const {theme: {colors}} = themeLabor;
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            marginTop: wp(5),
            marginBottom: wp(10),
        },
        wrapper: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.background,
            borderRadius: wp(15),
            height: wp(30),
            paddingLeft: wp(10),
            paddingRight: wp(10),
        },
        text: {
            backgroundColor: colors.transparent,
            color: colors.text3,
            fontSize: wp(12),
        },
        activityIndicator: {
            marginTop: Platform.select({
                ios: wp(-14),
                android: wp(-16),
                default: wp(-15),
            }),
        },
    });
};

export interface LoadEarlierProps {
    isLoadingEarlier?: boolean;
    loadEarlierLabel?: string;
    loadEarlierContainerStyle?: StyleProp<ViewStyle>;
    loadEarlierWrapperStyle?: StyleProp<ViewStyle>;
    loadEarlierTextStyle?: StyleProp<TextStyle>;
    activityIndicatorStyle?: StyleProp<ViewStyle>;
    activityIndicatorColor?: string;
    activityIndicatorSize?: ActivityIndicatorSize;

    onLoadEarlier?(): void;
}

class LoadEarlier extends React.Component<LoadEarlierProps & WithBunnyKit> {
    static defaultProps = {
        onLoadEarlier: () => {
        },
        isLoadingEarlier: false,
        loadEarlierLabel: 'Load earlier messages',
        loadEarlierContainerStyle: {},
        loadEarlierWrapperStyle: {},
        loadEarlierTextStyle: {},
        activityIndicatorStyle: {},
        activityIndicatorColor: 'white',
        activityIndicatorSize: 'small' as ActivityIndicatorSize,
    };

    renderLoading() {
        const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
        const styles = makeStyles(sizeLabor, themeLabor);
        if (this.props.isLoadingEarlier === false) {
            return (
                <Text style={[styles.text, this.props.loadEarlierTextStyle]}>
                    {this.props.loadEarlierLabel}
                </Text>
            );
        }
        return (
            <View>
                <Text style={[styles.text, this.props.loadEarlierTextStyle, {opacity: 0}]}>
                    {this.props.loadEarlierLabel}
                </Text>
                <ActivityIndicator
                    color={this.props.activityIndicatorColor!}
                    size={this.props.activityIndicatorSize!}
                    style={[styles.activityIndicator, this.props.activityIndicatorStyle]}
                />
            </View>
        );
    }

    render() {
        const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
        const styles = makeStyles(sizeLabor, themeLabor);
        return (
            <TouchableOpacity
                style={[styles.container, this.props.loadEarlierContainerStyle]}
                onPress={() => {
                    if (this.props.onLoadEarlier) {
                        this.props.onLoadEarlier();
                    }
                }}
                disabled={this.props.isLoadingEarlier === true}
                // @ts-ignore
                accessibilityTraits="button"
            >
                <View style={[styles.wrapper, this.props.loadEarlierWrapperStyle]}>
                    {this.renderLoading()}
                </View>
            </TouchableOpacity>
        );
    }
}

export default withBunnyKit(LoadEarlier);
