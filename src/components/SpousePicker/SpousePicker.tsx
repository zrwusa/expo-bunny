import {ButtonTO, IcoMoon, InButtonText, Text, TextButton, View} from '../UI';
import {Row} from '../../containers/Row';
import {Col} from '../../containers/Col';
import {Slider} from '../../../packages/react-native-range-slider-expo/src';
import {Divider} from '../Divider';
import {RadioButton} from 'react-native-paper';
import RangeSlider from '../../../packages/react-native-range-slider-expo/src/RangeSlider';
import * as React from 'react';
import {useState} from 'react';
import _ from 'lodash';
import BunnyConstants from '../../constants/constants';
import {useBunnyKit} from '../../hooks/bunny-kit';
import {getSharedStyles} from '../../helpers';
import {getStyles} from './styles';

export interface SpousePickerResult {
    distance: number,
    age: number,
    fromHeight: number,
    toHeight: number,
}

export interface SpousePickerProps {
    onDone?: (result: SpousePickerResult) => void,
    onCancel?: () => void,
    minDistance?: number,
    maxDistance?: number,
    initialDistance?: number,
    minFromHeight?: number,
    maxFromHeight?: number,
    minHeight?: number,
    maxHeight?: number,
    initialFromHeight?: number,
    initialToHeight?: number,
    minAge?: number,
    maxAge?: number,
    initialAge?: number,
    heightUnit?: string,
    distanceUnit?: string,
    initialInterestedIn?: string,
    title?: string,
}

export const SpousePicker = (props: SpousePickerProps) => {
    const {sizeLabor, themeLabor, wp, colors} = useBunnyKit();
    const {
        onDone,
        onCancel,
        minDistance = 0, maxDistance = 100, initialDistance = 10,
        minHeight = 140, maxHeight = 220, initialFromHeight = 163, initialToHeight = 180,
        minAge = 18, maxAge = 60, initialAge = 24,
        heightUnit = 'cm', distanceUnit = 'mi',
        initialInterestedIn = 'swimming',
        title = 'title'
    } = props;
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);
    const [fromHeight, setFromHeight] = useState(initialFromHeight)
    const [toHeight, setToHeight] = useState(initialToHeight)
    const [age, setAge] = useState(initialAge)
    const [distance, setDistance] = useState(initialDistance)
    const [interestedIn, setInterestedIn] = useState(initialInterestedIn)

    const ageIndicated = _.throttle((value: number) => {
        setAge(value)
    }, BunnyConstants.throttleWait);
    const distanceIndicated = _.throttle((value: number) => {
        setDistance(value)
    }, BunnyConstants.throttleWait);

    const _reset = () => {
        setDistance(initialDistance);
        setInterestedIn(initialInterestedIn);
        setAge(initialAge);
        setFromHeight(initialFromHeight);
        setToHeight(initialToHeight);
    }

    return <View style={[styles.container]}>
        <View style={styles.header}>
            <Row>
                <Col><TextButton onPress={() => {
                    onCancel?.()
                }}><IcoMoon name="x"/></TextButton></Col>
                <Col align="center"><Text>{title}</Text></Col>
                <Col align="flex-end"><TextButton onPress={_reset}><Text
                    style={sharedStyles.text2}>Reset</Text></TextButton></Col>
            </Row>
        </View>
        <View style={styles.content}>
            <View style={{paddingVertical: wp(10)}}>
                <Row>
                    <Col><Text style={sharedStyles.title2}>Distance</Text></Col>
                    <Col align="flex-end"><Text
                        style={sharedStyles.text2}>{`${minDistance}-` + distance.toString() + 'mi'}</Text></Col>
                </Row>
                <Slider min={minDistance}
                        max={maxDistance}
                        step={1}
                        valueOnChange={value => setDistance(value)}
                        valueOnIndicated={distanceIndicated}
                        initialValue={initialDistance}
                        invert={false}
                        styleSize={24}
                        showRangeLabels={false}
                        showValueLabels={false}
                        valueLabelsUnit={distanceUnit}
                />
            </View>
            <Divider/>
            <View style={{paddingVertical: wp(10)}}>
                <Text style={sharedStyles.title2}>Interested in</Text>
                <RadioButton.Group onValueChange={value => setInterestedIn(value)} value={interestedIn}>
                    <Row>
                        <Col size={1.3}>
                            <RadioButton.Item color={colors.primary} labelStyle={{color: colors.text2}}
                                              label="Swimming"
                                              value="swimming"/>
                        </Col>
                        <Col>
                            <RadioButton.Item color={colors.primary} labelStyle={{color: colors.text2}}
                                              label="Hiking" value="hiking"/>
                        </Col>
                        <Col>
                            <RadioButton.Item color={colors.primary} labelStyle={{color: colors.text2}}
                                              label="Yoga" value="yoga"/>
                        </Col>
                    </Row>
                </RadioButton.Group>
            </View>
            <Divider/>
            <View style={{paddingVertical: wp(10)}}>
                <Row>
                    <Col><Text style={sharedStyles.title2}>Age</Text></Col>
                    <Col align="flex-end"><Text
                        style={sharedStyles.text2}>{`${minAge}-` + age.toString()}</Text></Col>
                </Row>
                <Slider min={minAge}
                        max={maxAge}
                        step={1}
                        valueOnChange={value => setAge(value)}
                        valueOnIndicated={ageIndicated}
                        initialValue={initialAge}
                        styleSize={24}
                        showRangeLabels={false}
                        showValueLabels={false}
                />
            </View>
            <Divider/>
            <View style={{paddingVertical: wp(10)}}>
                <Text style={sharedStyles.title2}>Height</Text>
                <RangeSlider min={minHeight}
                             max={maxHeight}
                             step={1}
                             fromValueOnChange={value => {
                                 setFromHeight(value)
                             }}
                             fromValueOnIndicated={value => {
                                 // console.log('---fromValueOnIndicated',value)
                             }}
                             toValueOnChange={value => {
                                 setToHeight(value)
                             }}
                             toValueOnIndicated={value => {
                                 // console.log('---toValueOnIndicated',value)
                             }}
                             initialFromValue={initialFromHeight}
                             initialToValue={initialToHeight}
                             styleSize={24}
                             showRangeLabels={false}
                             valueLabelsUnit={heightUnit}
                />
            </View>
        </View>

        <View style={[styles.footer]}>
            <ButtonTO onPress={() => {
                onDone?.({distance, age, fromHeight, toHeight})
            }}><InButtonText>Done</InButtonText></ButtonTO>
        </View>
    </View>
}
