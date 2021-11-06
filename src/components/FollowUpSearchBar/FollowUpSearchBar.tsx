import React, {useEffect, useRef, useState} from 'react';
import {Animated, Keyboard, NativeSyntheticEvent, SafeAreaView, TextInputKeyPressEventData} from 'react-native';
import {makeStyles} from './styles';
import {IcoMoon, Text, TextInput, TouchableOpacity, View} from '../UI';
import {useBunnyKit} from '../../hooks/bunny-kit';

interface SearchComponentProps {
    scrollYValue: Animated.Value,
    defaultKeywords?: string[],
    onSearch?: (searchText: string) => void,
}

export const FollowUpSearchBar = (props: SearchComponentProps) => {
    const {sizeLabor, themeLabor, wp} = useBunnyKit();
    const {
        scrollYValue,
        defaultKeywords,
        onSearch
    } = props;

    const styles = makeStyles(sizeLabor, themeLabor);
    const {colors} = themeLabor.theme;
    const {zi} = sizeLabor.ms;
    const clampedScroll = Animated.diffClamp(
        Animated.add(
            scrollYValue.interpolate({
                inputRange: [0, 10],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
            }),
            new Animated.Value(0),
        ),
        0,
        50,
    );

    const searchBarTranslate = clampedScroll.interpolate({
        inputRange: [0, 50],
        outputRange: [0, -(250)],
        extrapolate: 'clamp',
    });

    const searchBarOpacity = clampedScroll.interpolate({
        inputRange: [0, 6],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });


    const [isFocus, setIsFocus] = useState(false);
    const [searchText, setSearchText] = useState('');
    const defaultWidth = wp(320);
    const focusWidth = wp(290);


    const invokeSearch = async () => {
        // if (searchText.trim() !== '') {
        if (onSearch) {
            onSearch(searchText);
        }
        // }
    };

    const handleFocus = () => {
        setIsFocus(true);
    };
    const handleBlur = () => {
        setIsFocus(false);
    };

    const handleInputTextChange = (value: string) => {
        setSearchText(value);
    };
    const handleKeyPress = ({nativeEvent}: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (nativeEvent.key === 'Enter') {
            invokeSearch().then();
        }
    };
    const handleCancel = () => {
        Keyboard.dismiss();
        setSearchText('');
    };
    const handleEndEditing = async () => {
        invokeSearch().then();
    };
    const handleCameraIconPress = () => {

    };
    const [toWidth, setToWidth] = useState(defaultWidth);
    const widthAnim = useRef(new Animated.Value(defaultWidth)).current;
    useEffect(() => {
        if (defaultKeywords && defaultKeywords.length > 0) {
            setSearchText(defaultKeywords.join(' ').toString());
        }
    }, [JSON.stringify(defaultKeywords)]);
    useEffect(() => {
        const timingAnimConfig: Animated.TimingAnimationConfig = {
            toValue: toWidth,
            duration: 300,
            useNativeDriver: false // the width property can only use js animation
        };
        Animated.timing(
            widthAnim,
            timingAnimConfig
        ).start();
    }, [toWidth]);

    useEffect(() => {
        if (isFocus) {
            setToWidth(focusWidth);
        } else {
            setToWidth(defaultWidth);
        }
    }, [isFocus]);


    return (
        // hack absolute elements need SafeAreaView wrapped again
        <SafeAreaView style={{zIndex: zi.s}}>
            <Animated.View style={[
                styles.container,
                {
                    transform: [
                        {
                            translateY: searchBarTranslate
                        }
                    ],
                    opacity: searchBarOpacity,
                }
            ]}>
                <Animated.View style={{width: widthAnim}}>
                    <TextInput
                        placeholder="Search"
                        style={[styles.formField]}
                        placeholderTextColor={colors.placeholder}
                        value={searchText}
                        onChangeText={handleInputTextChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyPress={handleKeyPress}
                        onEndEditing={handleEndEditing}
                        returnKeyType="done"
                        // enablesReturnKeyAutomatically={true}
                    />
                </Animated.View>
                <View style={styles.barRight}>
                    {
                        isFocus
                            ? <TouchableOpacity onPress={handleCancel}><Text>Cancel</Text></TouchableOpacity>
                            : <IcoMoon name="image" size={20} color={colors.text}
                                       onPress={handleCameraIconPress}/>
                    }

                </View>
            </Animated.View>
        </SafeAreaView>
    );
};


