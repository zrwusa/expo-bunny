import * as React from 'react';
import {useEffect, useState} from 'react';
import {View} from '../UI';
import {RootState} from '../../types';
import {Col, Row} from '../../containers';
import {ImageUploader} from '../ImageUploader';
import {makeStyles} from './styles';
import {ImageURISource} from 'react-native';
import {useFirestore, useFirestoreConnect} from 'react-redux-firebase';
import {useDispatch, useSelector} from 'react-redux';
import {collectSysError} from '../../store/actions';
import {useBunnyKit} from '../../hooks/bunny-kit';


export interface UserAlbumEditorProps {
    photoPath?: string;
}


export function UserAlbumEditor(props: UserAlbumEditorProps) {
    const {sizeLabor, themeLabor, wp, user} = useBunnyKit();

    const styles = makeStyles(sizeLabor, themeLabor);
    const dispatch = useDispatch();
    const firebaseUser = user?.firebaseUser;
    let userId = '';
    if (firebaseUser) {
        userId = firebaseUser.uid;
    }
    const {photoPath = `usersWithPhotos/${userId}`} = props;
    const firestore = useFirestore();

    useFirestoreConnect(photoPath);

    const usersWithPhotos = useSelector((state: RootState) => state.firestoreState.ordered.usersWithPhotos);

    const _imageUploaderError = (e: Error) => {
        dispatch(collectSysError(e));
    };

    const _removePhoto = async (position: string, source?: ImageURISource) => {
        await firestore.update(photoPath, {[position]: {uri: ''}});
    };

    const _savePhoto = async (position: string, photoUrl?: string) => {
        if (!photoUrl) {
            return;
        }
        await firestore.update(photoPath, {[position]: {uri: photoUrl}});
    };

    const [sources, setSources] = useState<{ [key: string]: ImageURISource }>();

    useEffect(() => {
        if (usersWithPhotos && usersWithPhotos.length > 0) {
            // todo react-redux-firebase type issue
            setSources(usersWithPhotos[0] as { [key: string]: ImageURISource });
        }
    }, [usersWithPhotos]);


    useEffect(() => {
        (async () => {
            const doc = await firestore.get(photoPath);
            if (!doc.exists) {
                await firestore.set(photoPath, {
                    '0': {uri: ''},
                    '1': {uri: ''},
                    '2': {uri: ''},
                    '3': {uri: ''},
                    '4': {uri: ''},
                    '5': {uri: ''}
                });
            }
        })();
    }, []);
    const userPhotosPath = `/userPhotos/${userId}`;

    return (
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
                                    isDeleteFromServerWhenRemove
                                    isDeleteFromServerWhenUpload
                                    onValueChanged={async (value) => {
                                        await _savePhoto('0', value.uri);
                                    }}
                                    onRemovePhoto={async (needRemove) => {
                                        await _removePhoto('0', needRemove);
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
                                        isDeleteFromServerWhenRemove
                                        isDeleteFromServerWhenUpload
                                        onValueChanged={async (value) => {
                                            await _savePhoto('1', value.uri);
                                        }}
                                        onRemovePhoto={async (needRemove) => {
                                            await _removePhoto('1', needRemove);
                                        }}
                                        onError={_imageUploaderError}
                                    />
                                </Row>
                                <Row size={1} style={{marginTop: wp(2)}}>
                                    <ImageUploader
                                        path={userPhotosPath}
                                        source={sources[2]}
                                        isFullFill
                                        isDeleteFromServerWhenRemove
                                        isDeleteFromServerWhenUpload
                                        onValueChanged={async (value) => {
                                            await _savePhoto('2', value.uri);
                                        }}
                                        onRemovePhoto={async (needRemove) => {
                                            await _removePhoto('2', needRemove);
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
                                    isDeleteFromServerWhenRemove
                                    isDeleteFromServerWhenUpload
                                    onValueChanged={async (value) => {
                                        await _savePhoto('3', value.uri);
                                    }}
                                    onRemovePhoto={async (needRemove) => {
                                        await _removePhoto('3', needRemove);
                                    }}
                                    onError={_imageUploaderError}
                                />
                            </Col>
                            <Col size={1} style={{marginLeft: wp(2)}}>
                                <ImageUploader
                                    path={userPhotosPath}
                                    source={sources[4]}
                                    isFullFill
                                    isDeleteFromServerWhenRemove
                                    isDeleteFromServerWhenUpload
                                    onValueChanged={async (value) => {
                                        await _savePhoto('4', value.uri);
                                    }}
                                    onRemovePhoto={async (needRemove) => {
                                        await _removePhoto('4', needRemove);
                                    }}
                                    onError={_imageUploaderError}
                                />
                            </Col>
                            <Col size={1} style={{marginLeft: wp(2)}}>
                                <ImageUploader
                                    path={userPhotosPath}
                                    source={sources[5]}
                                    isFullFill
                                    isDeleteFromServerWhenRemove
                                    isDeleteFromServerWhenUpload
                                    onValueChanged={async (value) => {
                                        await _savePhoto('5', value.uri);
                                    }}
                                    onRemovePhoto={async (needRemove) => {
                                        await _removePhoto('5', needRemove);
                                    }}
                                    onError={_imageUploaderError}
                                />
                            </Col>
                        </Row>
                    </View>
                    : null
            }
        </View>
    );
}

