import * as React from 'react'
import {Animated, StyleSheet} from 'react-native'
import {TypingAnimation} from 'react-native-typing-animation'
import {useUpdateLayoutEffect} from './hooks/useUpdateLayoutEffect'
import Color from './Color'
import config from "../../../src/config";

interface Props {
    isTyping?: boolean
}

const TypingIndicator = ({isTyping}: Props) => {
    const {yCoords, heightScale, marginScale} = React.useMemo(
        () => ({
            yCoords: new Animated.Value(200),
            heightScale: new Animated.Value(0),
            marginScale: new Animated.Value(0),
        }),
        [],
    )

    // on isTyping fire side effect
    useUpdateLayoutEffect(() => {
        if (isTyping) {
            slideIn()
        } else {
            slideOut()
        }
    }, [isTyping])

    // side effect
    const slideIn = () => {
        Animated.parallel([
            Animated.spring(yCoords, {
                toValue: 0,
                useNativeDriver: config.useNativeDriver,
            }),
            Animated.timing(heightScale, {
                toValue: 35,
                duration: 250,
                useNativeDriver: config.useNativeDriver,
            }),
            Animated.timing(marginScale, {
                toValue: 8,
                duration: 250,
                useNativeDriver: config.useNativeDriver,
            }),
        ]).start()
    }

    // side effect
    const slideOut = () => {
        Animated.parallel([
            Animated.spring(yCoords, {
                toValue: 200,
                useNativeDriver: config.useNativeDriver,
            }),
            Animated.timing(heightScale, {
                toValue: 0,
                duration: 250,
                useNativeDriver: config.useNativeDriver,
            }),
            Animated.timing(marginScale, {
                toValue: 0,
                duration: 250,
                useNativeDriver: config.useNativeDriver,
            }),
        ]).start()
    }
    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [
                        {
                            translateY: yCoords,
                        },
                    ],
                    height: heightScale,
                    marginBottom: marginScale,
                },
            ]}
        >
            {isTyping ? (
                <TypingAnimation
                    style={{marginLeft: 6, marginTop: 7.2}}
                    dotRadius={4}
                    dotMargin={5.5}
                    dotColor={'rgba(0, 0, 0, 0.38)'}
                />
            ) : null}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 8,
        width: 45,
        borderRadius: 15,
        backgroundColor: Color.leftBubbleBackground,
    },
})

export default TypingIndicator
