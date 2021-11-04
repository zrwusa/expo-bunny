import React, {useRef} from 'react';
import {Animated, PanResponder, StyleSheet} from 'react-native';
import config from '../../config';

export const DraggableView = () => {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            {
                dx: pan.x, // x,y are Animated.Value
                dy: pan.y,
            },
        ], {useNativeDriver: config.useNativeDriver}),
        onPanResponderRelease: () => {
            Animated.spring(
                pan, // Auto-multiplexed
                {toValue: {x: 0, y: 0}, useNativeDriver: config.useNativeDriver} // Back to zero
            ).start();
        },
    });

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[pan.getLayout(), styles.box]}
        />
    );
};

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#61dafb',
        width: 80,
        height: 80,
        borderRadius: 4,
    },
});
