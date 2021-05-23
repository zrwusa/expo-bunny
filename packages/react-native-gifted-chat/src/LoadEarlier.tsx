import React from 'react'
import {ActivityIndicator, Platform, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle,} from 'react-native'
import Color from './Color'

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.defaultColor,
        borderRadius: 15,
        height: 30,
        paddingLeft: 10,
        paddingRight: 10,
    },
    text: {
        backgroundColor: Color.backgroundTransparent,
        color: Color.white,
        fontSize: 12,
    },
    activityIndicator: {
        marginTop: Platform.select({
            ios: -14,
            android: -16,
            default: -15,
        }),
    },
})

export interface LoadEarlierProps {
    isLoadingEarlier?: boolean
    loadEarlierLabel?: string
    loadEarlierContainerStyle?: StyleProp<ViewStyle>
    loadEarlierWrapperStyle?: StyleProp<ViewStyle>
    loadEarlierTextStyle?: StyleProp<TextStyle>
    activityIndicatorStyle?: StyleProp<ViewStyle>
    activityIndicatorColor?: string
    activityIndicatorSize?: number | 'small' | 'large'

    onLoadEarlier?(): void
}

export default class LoadEarlier extends React.Component<LoadEarlierProps> {
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
        activityIndicatorSize: 'small',
    }

    renderLoading() {
        if (this.props.isLoadingEarlier === false) {
            return (
                <Text style={[styles.text, this.props.loadEarlierTextStyle]}>
                    {this.props.loadEarlierLabel}
                </Text>
            )
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
        )
    }

    render() {
        return (
            <TouchableOpacity
                style={[styles.container, this.props.loadEarlierContainerStyle]}
                onPress={() => {
                    if (this.props.onLoadEarlier) {
                        this.props.onLoadEarlier()
                    }
                }}
                disabled={this.props.isLoadingEarlier === true}
                // @ts-ignore
                accessibilityTraits='button'
            >
                <View style={[styles.wrapper, this.props.loadEarlierWrapperStyle]}>
                    {this.renderLoading()}
                </View>
            </TouchableOpacity>
        )
    }
}
