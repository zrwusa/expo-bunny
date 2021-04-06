import React, {ComponentType, createRef, ReactNode} from "react";
import {StyleProp, StyleSheet, Text, TextStyle, View} from "react-native";
import {width} from "styled-system";

interface ReadMoreProps {
    numberOfLines: number,
    onReady?: () => void,
    renderTruncatedFooter?: (param: undefined | (() => void)) => ReactNode,
    renderRevealedFooter?: (param: undefined | (() => void)) => ReactNode,
    textStyle?: StyleProp<TextStyle>
}

export class ReadMore extends React.Component<ReadMoreProps> {
    private _isMounted = false;
    private _text: Text | null = null
    state = {
        measured: false,
        shouldShowReadMore: false,
        showAllText: false
    };

    async componentDidMount() {
        //todo Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
        this._isMounted = true;
        await nextFrameAsync();

        if (!this._isMounted) {
            return;
        }

        if (this._text) {
            // Get the height of the text with no restriction on number of lines
            const fullHeight = await measureHeightAsync(this._text);
            this.setState({measured: true});
            await nextFrameAsync();

            if (!this._isMounted) {
                return;
            }

            // Get the height of the text now that number of lines has been set
            const limitedHeight = await measureHeightAsync(this._text);

            if (fullHeight > limitedHeight) {
                this.setState({shouldShowReadMore: true}, () => {
                    this.props.onReady && this.props.onReady();
                });
            } else {
                this.props.onReady && this.props.onReady();
            }
        }

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let {measured, showAllText} = this.state;

        let {numberOfLines} = this.props;

        return (
            <View>
                <Text
                    numberOfLines={measured && !showAllText ? numberOfLines : 0}
                    style={[this.props.textStyle]}
                    ref={text => {
                        this._text = text;
                    }}
                >
                    {this.props.children}
                </Text>

                <View style={{alignItems: 'flex-end'}}>{this._maybeRenderReadMore()}</View>
            </View>
        );
    }

    _handlePressReadMore = () => {
        this.setState({showAllText: true});
    };

    _handlePressReadLess = () => {
        this.setState({showAllText: false});
    };

    _maybeRenderReadMore() {
        let {shouldShowReadMore, showAllText} = this.state;

        if (shouldShowReadMore && !showAllText) {
            if (this.props.renderTruncatedFooter) {
                return this.props.renderTruncatedFooter(this._handlePressReadMore);
            }

            return (
                <Text style={styles.button} onPress={this._handlePressReadMore}>
                    more
                </Text>
            );
        } else if (shouldShowReadMore && showAllText) {
            if (this.props.renderRevealedFooter) {
                return this.props.renderRevealedFooter(this._handlePressReadLess);
            }

            return (
                <Text style={styles.button} onPress={this._handlePressReadLess}>
                    hide
                </Text>
            );
        }
    }
}

function measureHeightAsync(component: Text) {
    return new Promise<number>(resolve => {
        component.measure((x, y, w, h) => {
            resolve(h);
        });
    });
}

function nextFrameAsync() {
    return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

const styles = StyleSheet.create({
    button: {
        color: "#888",
        marginTop: 5
    }
});
