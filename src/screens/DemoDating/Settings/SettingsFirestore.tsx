import * as React from "react";
import {useEffect, useState} from "react";
import {View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {DemoDatingTabStackParam, RootState} from "../../../types";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {Col, getContainerStyles, Row} from "../../../containers";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {getSharedStyles} from "../../../helpers/shared-styles";
import {ImageUploader} from "../../../components/ImageUploader";
import {getStyles} from "./styles";
import {ImageURISource} from "react-native";
import {useFirestore, useFirestoreConnect} from "react-redux-firebase";
import {useDispatch, useSelector} from "react-redux";
import {useAuthLabor} from "../../../providers/auth-labor";
import {sysError} from "../../../store/actions";
import {useBunnyKit} from "../../../hooks/bunny-kit";

type DatingSettingsRouteProp = RouteProp<DemoDatingTabStackParam, 'DatingSettings'>;
type DatingSettingsNavigationProp = BottomTabNavigationProp<DemoDatingTabStackParam, 'DatingSettings'>;

export interface DatingSettingsProps {
    route: DatingSettingsRouteProp,
    navigation: DatingSettingsNavigationProp
}

export function DatingSettingsScreen({route, navigation}: DatingSettingsProps) {
    const {sizeLabor, themeLabor, wp, t} = useBunnyKit();
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

    return (
        <View style={[containerStyles.Screen]}>
            <View style={styles.container}>
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
        </View>
    );
}

