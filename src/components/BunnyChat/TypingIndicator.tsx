import * as React from 'react'
import {Animated, StyleSheet} from 'react-native'
import {TypingAnimation} from 'react-native-typing-animation'
import {useUpdateLayoutEffect} from './hooks/useUpdateLayoutEffect'
import config from "../../config";
import {SizeLabor, ThemeLabor} from "../../types";
import {useBunnyKit} from "../../hooks/bunny-kit";

const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const {theme: {colors}} = themeLabor;
    return StyleSheet.create({
        container: {
            marginLeft: wp(8),
            width: wp(45),
            borderRadius: wp(15),
            backgroundColor: colors.surface2,
        },
    })
}

export interface TypingIndicatorProps {
    isTyping?: boolean
}

const TypingIndicator = ({isTyping}: TypingIndicatorProps) => {
    const {sizeLabor, themeLabor, wp} = useBunnyKit()
    const styles = getStyles(sizeLabor, themeLabor);
    const {yCoords, heightScale, marginScale} = React.useMemo(
        () => ({
            yCoords: new Animated.Value(wp(200)),
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
                toValue: wp(35),
                duration: 250,
                useNativeDriver: config.useNativeDriver,
            }),
            Animated.timing(marginScale, {
                toValue: wp(8),
                duration: 250,
                useNativeDriver: config.useNativeDriver,
            }),
        ]).start()
    }

    // side effect
    const slideOut = () => {
        Animated.parallel([
            Animated.spring(yCoords, {
                toValue: wp(200),
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
                    style={{marginLeft: wp(6), marginTop: wp(7.2, false)}}
                    dotRadius={wp(4)}
                    dotMargin={wp(5.5, false)}
                    dotColor={'rgba(0, 0, 0, 0.38)'}
                />
            ) : null}
        </Animated.View>
    )
}


export default TypingIndicator
