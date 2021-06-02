import React, {useEffect, useState} from 'react';
import {Animated, I18nManager, LayoutChangeEvent, StyleSheet, Text, TextInput, View} from 'react-native';
import {PanGestureHandler, PanGestureHandlerGestureEvent, State} from 'react-native-gesture-handler';
import {useBunnyKit} from "../../../src/hooks/bunny-kit";

const osRtl = I18nManager.isRTL;

const SMALL_SIZE = 24;
const MEDIUM_SIZE = 34;
const LARGE_SIZE = 44;
type Size = 'small' | 'medium' | 'large';

interface SliderProps {
    min: number,
    max: number,
    valueOnChange: (value: number) => void,
    step?: number,
    styleSize?: 'small' | 'medium' | 'large' | number,
    knobColor?: string,
    inRangeBarColor?: string,
    outOfRangeBarColor?: string,
    valueLabelsTextColor?: string,
    valueLabelsBackgroundColor?: string,
    rangeLabelsTextColor?: string,
    showRangeLabels?: boolean,
    showValueLabels?: boolean,
    initialValue?: number,
    valueLabelsPosition?: 'up' | 'down',
    showBubbles?: boolean,
    showValueLabelsOnlyWhenDrag?: boolean,
    valueLabelsUnit?: string,
    invert?: boolean,
    valueOnIndicated?: (value: number) => void,
}

export const Slider = (props: SliderProps) => {
    const {colors} = useBunnyKit();
    const {
        min, max, valueOnChange,
        step = 1,
        styleSize = 'medium',
        knobColor = colors.primary,
        inRangeBarColor = colors.primary,
        outOfRangeBarColor = colors.divider,
        valueLabelsTextColor = colors.text2,
        valueLabelsBackgroundColor = '#3a4766',
        rangeLabelsTextColor = 'rgb(60,60,60)',
        showRangeLabels = true,
        showValueLabels = true,
        initialValue,
        valueLabelsPosition = 'down',
        showBubbles = false,
        showValueLabelsOnlyWhenDrag = false,
        valueLabelsUnit = '',
        invert = false,
        valueOnIndicated,
    } = props;
    // settings
    const [stepInPixels, setStepInPixels] = useState(0);
    const [knobSize, setKnobSize] = useState(0);
    const [fontSize] = useState(15);

    // rtl settings
    const [flexDirection, setFlexDirection] = useState<"row" | "row-reverse" | "column" | "column-reverse" | undefined>('row');
    const [svgOffset, setSvgOffset] = useState<object>({left: (knobSize - 40) / 2});

    const [valueOffset, setValueOffset] = useState(0);
    const [sliderWidth, setSliderWidth] = useState(0);

    // animation values
    const [translateX] = useState(new Animated.Value(0));
    const [valueLabelScale] = useState(new Animated.Value(showValueLabelsOnlyWhenDrag ? 0.01 : 1));
    const [inRangeScaleX] = useState(new Animated.Value(0.01));

    // refs
    const valueTextRef = React.createRef<TextInput>();
    const opacity = React.useRef<Animated.Value>(new Animated.Value(0)).current;

    // initializing settings
    useEffect(() => {
        setFlexDirection(osRtl ? 'row-reverse' : 'row');
        setSvgOffset(osRtl ? {right: (knobSize - 40) / 2} : {left: (knobSize - 40) / 2});
    }, [knobSize]);
    useEffect(() => {
        if (sliderWidth > 0) {
            const stepSize = setStepSize(max, min, step);
            valueTextRef.current?.setNativeProps({text: min.toString() + valueLabelsUnit});
            if (typeof initialValue === 'number' && initialValue >= min && initialValue <= max) {
                const offset = ((initialValue - min) / step) * stepSize - (knobSize / 2);
                setValueStatic(offset, knobSize, stepSize);
                setValueText(offset);
            }
            Animated.timing(opacity, {
                toValue: 1,
                duration: 64,
                useNativeDriver: true
            }).start();
        }
    }, [min, max, step, initialValue, sliderWidth]);
    useEffect(() => {
        const size = typeof styleSize === 'number' ? styleSize : styleSize === 'small' ? SMALL_SIZE : styleSize === 'medium' ? MEDIUM_SIZE : LARGE_SIZE;
        setKnobSize(size);
        translateX.setValue(-size / 4);
    }, [styleSize]);

    const setValueStatic = (newOffset: number, knobSize: number, stepInPixels: number) => {
        newOffset = Math.round((newOffset + (knobSize / 2)) / stepInPixels) * stepInPixels - (knobSize / 2);
        settingValue(newOffset);
        setValueOffset(newOffset);
        valueOnChange(Math.round(((newOffset + (knobSize / 2)) * (max - min) / sliderWidth) / step) * step + min);
    }
    const settingValue = (newOffset: number) => {
        translateX.setValue(newOffset);
        inRangeScaleX.setValue((newOffset + (knobSize / 2)) / sliderWidth + 0.01);
    }
    const setValueText = (totalOffset: number) => {
        const numericValue: number = Math.floor(((totalOffset + (knobSize / 2)) * (max - min) / sliderWidth) / step) * step + min;
        valueTextRef.current?.setNativeProps({text: numericValue.toString() + valueLabelsUnit});
    }
    const setStepSize = (max: number, min: number, step: number) => {
        const numberOfSteps = ((max - min) / step);
        const stepSize = sliderWidth / numberOfSteps;
        setStepInPixels(stepSize);
        return stepSize;
    }

    // value gesture events ------------------------------------------------------------------------
    const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
        let totalOffset = event.nativeEvent.translationX + valueOffset;
        if (totalOffset >= -knobSize / 2 && totalOffset <= sliderWidth - knobSize / 2) {
            translateX.setValue(totalOffset);
            if (valueTextRef != null) {
                const value = (Math.round(((totalOffset + (knobSize / 2)) * (max - min) / sliderWidth) / step) * step + min)
                valueTextRef.current?.setNativeProps({text: value.toString() + valueLabelsUnit});
                valueOnIndicated?.(value)
            }
            inRangeScaleX.setValue((totalOffset + (knobSize / 2)) / sliderWidth + 0.01);
        }
    }
    const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
        if (event.nativeEvent.state === State.BEGAN) {
            if (showValueLabelsOnlyWhenDrag) scaleTo(valueLabelScale, 1);
        }
        if (event.nativeEvent.state === State.END) {
            let newOffset = event.nativeEvent.translationX + valueOffset;
            newOffset = Math.round((newOffset + (knobSize / 2)) / stepInPixels) * stepInPixels - (knobSize / 2);
            if (newOffset < -knobSize / 2) {
                newOffset = -knobSize / 2;
            } else if (newOffset >= sliderWidth - knobSize / 2) {
                newOffset = sliderWidth - knobSize / 2;
            }
            setValueStatic(newOffset, knobSize, stepInPixels);
            if (showValueLabelsOnlyWhenDrag) scaleTo(valueLabelScale, 0.01);
        }
    }
    // ------------------------------------------------------------------------------------------------

    // gesture events help functions ------------------------------------------------------------------
    const scaleTo = (param: Animated.Value, toValue: number) => Animated.timing(param,
        {
            toValue,
            duration: 150,
            useNativeDriver: true
        }
    ).start();
    // ------------------------------------------------------------------------------------------------

    // setting bar width ------------------------------------------------------------------------------
    const onLayout = (event: LayoutChangeEvent) => {
        setSliderWidth(event.nativeEvent.layout.width);
    }
    // ------------------------------------------------------------------------------------------------
    const bubbleSizeMap: { [key in Size]: { width: number, height: number } } = {
        'small': {width: 20, height: 28},
        'medium': {width: 40, height: 56},
        'large': {width: 50, height: 70},
    }
    const bubbleSize = typeof styleSize === "number" ? {width: styleSize, height: styleSize} : bubbleSizeMap[styleSize];
    const bubbleBottomValue = typeof styleSize === "number" ? styleSize : bubbleSizeMap[styleSize].height;
    const bubbleBottom = valueLabelsPosition === 'up' ? 0 : -bubbleBottomValue
    const styles = getStyles(knobSize)

    const renderValueLabels = () => {
        return showValueLabels &&
            <View style={{width: '100%', height: 1, flexDirection}}>
                <Animated.View
                    style={{position: 'absolute', bottom: 0, left: 0, transform: [{translateX}, {scale: valueLabelScale}]}}
                >
                    {
                        showBubbles
                            ?
                            // <Svg width={40} height={56} style={{...svgOffset, justifyContent: 'center', alignItems: 'center'}}>
                            //     <Path
                            //         d="M20.368027196163986,55.24077513402203 C20.368027196163986,55.00364778429386 37.12897994729114,42.11537830086061 39.19501224411266,22.754628132990383 C41.26104454093417,3.393877965120147 24.647119286738516,0.571820003300814 20.368027196163986,0.7019902620266703 C16.088935105589453,0.8321519518460209 -0.40167016290734386,3.5393865664909434 0.7742997013327574,21.806127302984205 C1.950269565572857,40.07286803947746 20.368027196163986,55.4779024837502 20.368027196163986,55.24077513402203 z"
                            //         strokeWidth={1}
                            //         fill={valueLabelsBackgroundColor}
                            //         stroke={valueLabelsBackgroundColor}
                            //     />
                            // </Svg>
                            <View style={[svgOffset, {
                                ...bubbleSize,
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                bottom: bubbleBottom,
                                backgroundColor: 'red'
                            }]}/>
                            : null
                    }

                    <TextInput style={{
                        position: 'absolute',
                        width: 40,
                        textAlign: 'center', ...svgOffset,
                        color: valueLabelsTextColor,
                        bottom: valueLabelsPosition === 'up' ? 18 : -18,
                    }} ref={valueTextRef}/>
                </Animated.View>
            </View>
    }
    const paddingSizeMap: { [key in Size]: number } = {
        'small': 21,
        'medium': 14,
        'large': 7
    }
    return (
        <Animated.View style={[styles.container, {opacity, paddingHorizontal: typeof styleSize === "number" ? styleSize / 2 : paddingSizeMap[styleSize]}]}>
            {
                valueLabelsPosition === 'up'
                    ? renderValueLabels()
                    : null
            }
            <View style={{width: '100%', height: knobSize, marginVertical: 4, position: 'relative', flexDirection, alignItems: 'center'}}>
                <View style={[styles.bar, {
                    backgroundColor: invert ? inRangeBarColor : outOfRangeBarColor,
                }]} onLayout={onLayout}/>
                <Animated.View style={{
                    width: sliderWidth,
                    height: knobSize / 3,
                    backgroundColor: invert ? outOfRangeBarColor : inRangeBarColor,
                    transform: [{translateX: -sliderWidth / 2}, {scaleX: inRangeScaleX}, {translateX: sliderWidth / 2}]
                }}/>
                <Animated.View style={[styles.outOfRangeBar, {
                    backgroundColor: invert ? outOfRangeBarColor : inRangeBarColor
                }]}/>
                <PanGestureHandler {...{onGestureEvent, onHandlerStateChange}}>
                    <Animated.View style={[styles.knob1, {
                        // height: knobSize,
                        // width: knobSize,
                        // borderRadius: knobSize,
                        backgroundColor: knobColor,
                        transform: [{translateX}]
                    }]}><Text style={styles.knobInnerDivider}>| | |</Text></Animated.View>
                </PanGestureHandler>
            </View>
            {
                valueLabelsPosition === 'down'
                    ? renderValueLabels()
                    : null
            }
            {
                showRangeLabels &&
                <View style={{width: '100%', flexDirection, justifyContent: 'space-between'}}>
                    <Text style={{color: rangeLabelsTextColor, fontWeight: "bold", fontSize, marginLeft: -7}}>{min}</Text>
                    <Text style={{color: rangeLabelsTextColor, fontWeight: "bold", fontSize}}>{max}</Text>
                </View>
            }
        </Animated.View>
    );
}
const getStyles = (knobSize: number) => {
    return StyleSheet.create({
        container: {
            // height: 100,
            width: '100%'
        },
        knob: {
            position: 'absolute',
            elevation: 4
        },
        knob1: {
            height: knobSize,
            width: 2 * knobSize,
            left: -(0.5 * knobSize),
            borderRadius: 0.5 * knobSize,
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 4
        },
        knobInnerDivider: {
            marginHorizontal: 3 * knobSize / 40,
            fontSize: 18 * knobSize / 40,
            lineHeight: 18 * knobSize / 40,
            color: 'white'
        },
        bar: {
            position: 'absolute',
            borderBottomRightRadius: 100,
            borderTopRightRadius: 100,
            left: knobSize / 4,
            marginLeft: -knobSize / 4,
            right: knobSize / 4,
            height: knobSize / 3
        },
        outOfRangeBar: {
            position: 'absolute',
            left: -knobSize / 4,
            width: knobSize / 2.5,
            height: knobSize / 3,
            borderRadius: knobSize / 3,
        }
    });
}

