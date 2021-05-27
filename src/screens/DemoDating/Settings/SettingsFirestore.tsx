import * as React from "react";
import {useEffect, useState} from "react";
import {Text, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {DemoDatingTabStackParam, RootState} from "../../../types";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {Col, getContainerStyles, Row} from "../../../containers";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {getSharedStyles} from "../../../helpers/shared-styles";
import {ImageUploader} from "../../../components/ImageUploader";
import {getStyles} from "./styles";
import {ImageURISource, ScrollView} from "react-native";
import {useFirestore, useFirestoreConnect} from "react-redux-firebase";
import {useDispatch, useSelector} from "react-redux";
import {useAuthLabor} from "../../../providers/auth-labor";
import {sysError} from "../../../store/actions";
import {useBunnyKit} from "../../../hooks/bunny-kit";
// import Slider from "@react-native-community/slider";
import RangeSlider, {Slider} from "../../../../packages/react-native-range-slider-expo/src"
import {Divider} from "../../../components/Divider";
import {RadioButton} from "react-native-paper";

type DatingSettingsRouteProp = RouteProp<DemoDatingTabStackParam, 'DatingSettings'>;
type DatingSettingsNavigationProp = BottomTabNavigationProp<DemoDatingTabStackParam, 'DatingSettings'>;

export interface DatingSettingsProps {
    route: DatingSettingsRouteProp,
    navigation: DatingSettingsNavigationProp
}

export function DatingSettingsScreen({route, navigation}: DatingSettingsProps) {
    const {sizeLabor, themeLabor, wp, t, colors} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.DatingSettings');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);
    const dispatch = useDispatch()
    const {user} = useAuthLabor().authResult
    const firebaseUser = user?.firebaseUser;
    let userId = ''
    if (firebaseUser) {
        userId = firebaseUser.uid;
    }

    const firestore = useFirestore()
    const docPath = `usersWithPhotos/${userId}`

    useFirestoreConnect(docPath)

    const usersWithPhotos = useSelector((state: RootState) => state.firestoreState.ordered.usersWithPhotos)

    const _imageUploaderError = (e: Error) => {
        dispatch(sysError(e))
    }

    const _removePhoto = async (position: string, source?: ImageURISource) => {
        await firestore.update(docPath, {[position]: {uri: ''}})
    }

    const _savePhoto = async (position: string, photoUrl?: string) => {
        if (!photoUrl) {
            return;
        }
        await firestore.update(docPath, {[position]: {uri: photoUrl}})
    }

    const [sources, setSources] = useState<{ [key: string]: ImageURISource }>()

    useEffect(() => {
        if (usersWithPhotos && usersWithPhotos.length > 0) {
            // todo react-redux-firebase type issue
            setSources(usersWithPhotos[0] as { [key: string]: ImageURISource })
        }
    }, [usersWithPhotos])


    useEffect(() => {
        (async () => {
            const doc = await firestore.get(docPath)
            if (!doc.exists) {
                await firestore.set(docPath, {
                    '0': {uri: ''},
                    '1': {uri: ''},
                    '2': {uri: ''},
                    '3': {uri: ''},
                    '4': {uri: ''},
                    '5': {uri: ''}
                })
            }
        })()
    }, [])
    const userPhotosPath = `/userPhotos/${userId}`

    const [fromHeight, setFromHeight] = useState(0)
    const [toHeight, setToHeight] = useState(100)
    const [age, setAge] = useState(18)
    const [distance, setDistance] = useState(10)
    const [interestedIn, setInterestedIn] = useState('swimming')
    return (
        <ScrollView style={[containerStyles.Screen]}>
            <View style={styles.albumContainer}>
                {
                    sources
                        ? <View style={{height: wp(375), width: wp(375)}}>
                            <Row size={2}>
                                <Col size={2}>
                                    <ImageUploader
                                        source={sources[0]}
                                        path={userPhotosPath}
                                        isFullFill
                                        onValueChanged={async (value) => {
                                            await _savePhoto('0', value.uri)
                                        }}
                                        onRemovePhoto={async (needRemove) => {
                                            await _removePhoto('0', needRemove)
                                        }}
                                        onError={_imageUploaderError}
                                    />
                                </Col>
                                <Col size={1} style={{marginLeft: wp(2)}}>
                                    <Row size={1}>
                                        <ImageUploader
                                            path={userPhotosPath}
                                            source={sources[1]}
                                            isFullFill
                                            onValueChanged={async (value) => {
                                                await _savePhoto('1', value.uri)
                                            }}
                                            onRemovePhoto={async (needRemove) => {
                                                await _removePhoto('1', needRemove)
                                            }}
                                            onError={_imageUploaderError}
                                        />
                                    </Row>
                                    <Row size={1} style={{marginTop: wp(2)}}>
                                        <ImageUploader
                                            path={userPhotosPath}
                                            source={sources[2]}
                                            isFullFill
                                            onValueChanged={async (value) => {
                                                await _savePhoto('2', value.uri)
                                            }}
                                            onRemovePhoto={async (needRemove) => {
                                                await _removePhoto('2', needRemove)
                                            }}
                                            onError={_imageUploaderError}
                                        />
                                    </Row>
                                </Col>
                            </Row>
                            <Row size={1} style={{marginTop: wp(2)}}>
                                <Col size={1}>
                                    <ImageUploader
                                        path={userPhotosPath}
                                        source={sources[3]}
                                        isFullFill
                                        onValueChanged={async (value) => {
                                            await _savePhoto('3', value.uri)
                                        }}
                                        onRemovePhoto={async (needRemove) => {
                                            await _removePhoto('3', needRemove)
                                        }}
                                        onError={_imageUploaderError}
                                    />
                                </Col>
                                <Col size={1} style={{marginLeft: wp(2)}}>
                                    <ImageUploader
                                        path={userPhotosPath}
                                        source={sources[4]}
                                        isFullFill
                                        onValueChanged={async (value) => {
                                            await _savePhoto('4', value.uri)
                                        }}
                                        onRemovePhoto={async (needRemove) => {
                                            await _removePhoto('4', needRemove)
                                        }}
                                        onError={_imageUploaderError}
                                    />
                                </Col>
                                <Col size={1} style={{marginLeft: wp(2)}}>
                                    <ImageUploader
                                        isDeleteFromServerWhenUpload={false}
                                        path={userPhotosPath}
                                        source={sources[5]}
                                        isFullFill
                                        onValueChanged={async (value) => {
                                            await _savePhoto('5', value.uri)
                                        }}
                                        onRemovePhoto={async (needRemove) => {
                                            await _removePhoto('5', needRemove)
                                        }}
                                        onError={_imageUploaderError}
                                    />
                                </Col>
                            </Row>
                        </View>
                        : null
                }
            </View>
            <View style={{paddingLeft: wp(20), paddingRight: wp(10)}}>
                <View style={{paddingVertical: wp(10)}}>
                    <Row>
                        <Col><Text style={sharedStyles.title2}>Distance</Text></Col>
                        <Col align="flex-end"><Text style={sharedStyles.text2}>{'0-' + distance.toString() + 'mi'}</Text></Col>
                    </Row>
                    <Slider min={0}
                            max={100}
                            step={1}
                            valueOnChange={value => console.log('---valueOnChanged', setDistance(value))}
                            initialValue={10}
                            styleSize={24}
                            showRangeLabels={false}
                            showValueLabels={false}
                            valueLabelsUnit="mi"
                    />
                </View>

                <Divider/>
                <View style={{paddingVertical: wp(10)}}>
                    <Text style={sharedStyles.title2}>Interested in</Text>
                    <Row>
                        <RadioButton
                            color={colors.primary}
                            value="first"
                            status={interestedIn === 'swimming' ? 'checked' : 'unchecked'}
                            onPress={() => setInterestedIn('swimming')}/>
                        <Text style={sharedStyles.text2}>Swimming</Text>

                        <RadioButton
                            color={colors.primary}
                            value="first"
                            status={interestedIn === 'hiking' ? 'checked' : 'unchecked'}
                            onPress={() => setInterestedIn('hiking')}/>
                        <Text style={sharedStyles.text2}>Hiking</Text>

                        <RadioButton
                            color={colors.primary}
                            value="first"
                            status={interestedIn === 'yoga' ? 'checked' : 'unchecked'}
                            onPress={() => setInterestedIn('yoga')}/>
                        <Text style={sharedStyles.text2}>Yoga</Text>

                    </Row>
                </View>

                <Divider/>
                <View style={{paddingVertical: wp(10)}}>
                    <Row>
                        <Col><Text style={sharedStyles.title2}>Age</Text></Col>
                        <Col align="flex-end"><Text style={sharedStyles.text2}>{'18-' + age.toString()}</Text></Col>
                    </Row>
                    <Slider min={18}
                            max={50}
                            step={1}
                            valueOnChange={value => console.log('---valueOnChanged', setAge(value))}
                            initialValue={26}
                            styleSize={24}
                            showRangeLabels={false}
                            showValueLabels={false}
                    />
                </View>

                <Divider/>
                <View style={{paddingVertical: wp(10)}}>
                    <Text style={sharedStyles.title2}>Height</Text>
                    <RangeSlider min={140}
                                 max={200}
                                 step={1}
                                 fromValueOnChange={value => {
                                     setFromHeight(value)
                                 }
                                 }
                                 toValueOnChange={value => {
                                     setToHeight(value)
                                 }
                                 }
                                 initialFromValue={155}
                                 initialToValue={180}
                                 styleSize={24}
                                 showRangeLabels={false}
                                 valueLabelsUnit="cm"
                    />
                </View>


            </View>
        </ScrollView>
    );
}

