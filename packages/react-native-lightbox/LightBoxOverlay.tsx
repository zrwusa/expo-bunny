import React, {Component} from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    PanResponder,
    PanResponderInstance,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import config from "../../src/config";

const DRAG_DISMISS_THRESHOLD = 150;
const STATUS_BAR_OFFSET = (Platform.OS === 'android' ? -25 : 0);
const isIOS = Platform.OS === 'ios';

const getCurrentWindowDimension = () => {
    return Dimensions.get('window')
}

const getStyles = () => {
    return StyleSheet.create({
        background: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: getCurrentWindowDimension().width,
            height: getCurrentWindowDimension().height,
        },
        open: {
            position: 'absolute',
            flex: 1,
            justifyContent: 'center',
            // Android pan handlers crash without this declaration:
            backgroundColor: 'transparent',
        },
        header: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: getCurrentWindowDimension().width,
            backgroundColor: 'transparent',
        },
        closeButton: {
            fontSize: 35,
            color: 'white',
            lineHeight: 40,
            width: 40,
            textAlign: 'center',
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowRadius: 1.5,
            shadowColor: 'black',
            shadowOpacity: 0.8,
        },
    });
}

export interface LightBoxOverlayProps {
    origin: {
        x: number,
        y: number,
        width: number,
        height: number,
    },
    springConfig?: {
        tension: number,
        friction: number,
    },
    backgroundColor?: string,
    isOpen?: boolean,
    renderHeader?: Function,
    onOpen?: () => void,
    onClose?: () => void,
    willClose?: () => void,
    swipeToDismiss?: boolean,
    didOpen?: () => void,
    navigator?: object
}

interface LightBoxOverlayStates {
    isAnimating: boolean,
    isPanning: boolean,
    target: {
        x: number,
        y: number,
        opacity: number,
    },
    pan: Animated.Value,
    openVal: Animated.Value,
}

export class LightBoxOverlay extends Component<LightBoxOverlayProps, LightBoxOverlayStates> {

    static defaultProps = {
        springConfig: {tension: 30, friction: 7},
        backgroundColor: 'black',
    };

    private _panResponder: PanResponderInstance

    constructor(props: LightBoxOverlayProps) {
        super(props);
        this.state = {
            isAnimating: false,
            isPanning: false,
            target: {
                x: 0,
                y: 0,
                opacity: 1,
            },
            pan: new Animated.Value(0),
            openVal: new Animated.Value(0),
        };
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => !this.state.isAnimating,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => !this.state.isAnimating,
            onMoveShouldSetPanResponder: (evt, gestureState) => !this.state.isAnimating,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => !this.state.isAnimating,

            onPanResponderGrant: (evt, gestureState) => {
                this.state.pan.setValue(0);
                this.setState({isPanning: true});
            },
            onPanResponderMove: Animated.event([
                null,
                {dy: this.state.pan}
            ], {useNativeDriver: config.useNativeDriver}),
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                if (Math.abs(gestureState.dy) > DRAG_DISMISS_THRESHOLD) {
                    this.setState({
                        isPanning: false,
                        target: {
                            y: gestureState.dy,
                            x: gestureState.dx,
                            opacity: 1 - Math.abs(gestureState.dy / getCurrentWindowDimension().height)
                        }
                    });
                    this.close();
                } else {
                    Animated.spring(
                        this.state.pan,
                        {toValue: 0, ...this.props.springConfig, useNativeDriver: config.useNativeDriver}
                    ).start(() => {
                        this.setState({isPanning: false});
                    });
                }
            },
        });
    }

    componentDidMount() {
        if (this.props.isOpen) {
            this.open();
        }
    }

    open = () => {
        if (isIOS) {
            StatusBar.setHidden(true, 'fade');
        }
        this.state.pan.setValue(0);
        this.setState({
            isAnimating: true,
            target: {
                x: 0,
                y: 0,
                opacity: 1,
            }
        });

        Animated.spring(
            this.state.openVal,
            {toValue: 1, ...this.props.springConfig, useNativeDriver: false}
        ).start(() => {
            this.setState({isAnimating: false});
            this.props.didOpen && this.props.didOpen();
        });
    }

    close = () => {
        this.props.willClose && this.props.willClose();
        if (isIOS) {
            StatusBar.setHidden(false, 'fade');
        }
        this.setState({
            isAnimating: true,
        },);
        Animated.spring(
            this.state.openVal,
            {toValue: 0, ...this.props.springConfig, useNativeDriver: false}
        ).start(() => {
            this.setState({
                isAnimating: false,
            });
            this.props.onClose && this.props.onClose();
        });
    }

    componentDidUpdate(prevProps: LightBoxOverlayProps) {
        if (this.props.isOpen !== prevProps.isOpen && this.props.isOpen) {
            this.open();
        }
    }

    render() {
        const {
            isOpen,
            renderHeader,
            swipeToDismiss,
            origin,
            backgroundColor,
        } = this.props;

        const {
            isPanning,
            isAnimating,
            openVal,
            target,
        } = this.state;

        const lightBoxOpacityStyle = {
            opacity: openVal.interpolate({inputRange: [0, 1], outputRange: [0, target.opacity]})
        };

        let handlers;
        if (swipeToDismiss) {
            handlers = this._panResponder.panHandlers;
        }

        let dragStyle;
        if (isPanning) {
            dragStyle = {
                top: this.state.pan,
            };
            lightBoxOpacityStyle.opacity = this.state.pan.interpolate({
                inputRange: [-getCurrentWindowDimension().height, 0, getCurrentWindowDimension().height],
                outputRange: [0, 1, 0]
            });
        }

        const styles = getStyles()

        const openStyle = [styles.open, {
            left: openVal.interpolate({inputRange: [0, 1], outputRange: [origin.x, target.x]}),
            top: openVal.interpolate({inputRange: [0, 1], outputRange: [origin.y + STATUS_BAR_OFFSET, target.y + STATUS_BAR_OFFSET]}),
            width: openVal.interpolate({inputRange: [0, 1], outputRange: [origin.width, getCurrentWindowDimension().width]}),
            height: openVal.interpolate({inputRange: [0, 1], outputRange: [origin.height, getCurrentWindowDimension().height]}),
        }];

        const background = (<Animated.View style={[styles.background, {backgroundColor: backgroundColor}, lightBoxOpacityStyle]}/>);
        const header = (<Animated.View style={[styles.header, lightBoxOpacityStyle]}>{(renderHeader ?
                renderHeader(this.close) :
                (
                    <TouchableOpacity onPress={this.close}>
                        <Text style={styles.closeButton}>×</Text>
                    </TouchableOpacity>
                )
        )}</Animated.View>);
        const content = (
            <Animated.View style={[openStyle, dragStyle]} {...handlers}>
                {this.props.children}
            </Animated.View>
        );

        if (this.props.navigator) {
            return (
                <View>
                    {background}
                    {content}
                    {header}
                </View>
            );
        }

        return (
            <Modal visible={isOpen} transparent={true} onRequestClose={() => this.close()}>
                {background}
                {content}
                {header}
            </Modal>
        );
    }
}
