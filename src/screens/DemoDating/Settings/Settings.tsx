// import * as React from "react";
// import {useEffect, useState} from "react";
// import {View} from "../../../components/UI";
// import {RouteProp} from "@react-navigation/native";
// import {DemoDatingTabStackParam, RootState, UserPhoto} from "../../../types";
// import {useTranslation} from "react-i18next";
// import {shortenTFunctionKey} from "../../../providers/i18n-labor";
// import {Col, getContainerStyles, Row} from "../../../containers";
// import {useSizeLabor} from "../../../providers/size-labor";
// import {useThemeLabor} from "../../../providers/theme-labor";
// import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
// import {getSharedStyles} from "../../../helpers/shared-styles";
// import {ImageUploader} from "../../../components/ImageUploader";
// import {getStyles} from "./styles";
// import {ImageURISource} from "react-native";
// import {useFirebase, useFirebaseConnect} from "react-redux-firebase";
// import {useDispatch, useSelector} from "react-redux";
// import {useAuthLabor} from "../../../providers/auth-labor";
// import {sysError} from "../../../store/actions";
//
// type DatingSettingsRouteProp = RouteProp<DemoDatingTabStackParam, 'DatingSettings'>;
// type DatingSettingsNavigationProp = BottomTabNavigationProp<DemoDatingTabStackParam, 'DatingSettings'>;
//
// export interface DatingSettingsProps {
//     route: DatingSettingsRouteProp,
//     navigation: DatingSettingsNavigationProp
// }
//
// export function DatingSettingsScreen({route, navigation}: DatingSettingsProps) {
//     const firebase = useFirebase();
//     const {t} = useTranslation();
//     const st = shortenTFunctionKey(t, 'screens.DatingSettings');
//     const sizeLabor = useSizeLabor();
//     const {wp} = sizeLabor.designsBasedOn.iphoneX
//     const themeLabor = useThemeLabor();
//     const containerStyles = getContainerStyles(sizeLabor, themeLabor);
//     const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
//     const styles = getStyles(sizeLabor, themeLabor);
//     const dispatch = useDispatch()
//     const {user} = useAuthLabor().authResult
//     const firebaseUser = user?.firebaseUser;
//     let userId = ''
//     if (firebaseUser) {
//         userId = firebaseUser.uid;
//     }
//     // useFirebaseConnect([{path: 'usersWithPhotos', queryParams: ['orderByChild=userId', `equalTo=${userId}`]}])
//     useFirebaseConnect([{path: `usersWithPhotos/${userId}`}])
//
//     const userPhotos = useSelector(({firebaseState: {ordered: {usersWithPhotos}}}: RootState) => {
//         if (usersWithPhotos) {
//             // @ts-ignore todo react-redux-firebase type bug
//             return usersWithPhotos[userId] as { key: string, value: UserPhoto }[]
//         } else {
//             return []
//         }
//     })
//
//     const _imageUploaderError = (e: Error) => {
//         dispatch(sysError(e))
//     }
//
//     const _removePhoto = (position: string, source?: ImageURISource) => {
//         firebase.database().ref(`usersWithPhotos/${userId}/${position}`).remove()
//     }
//
//     const _savePhoto = (position: string, photoUrl?: string) => {
//         if (!photoUrl) {
//             return;
//         }
//         firebase.database().ref(`usersWithPhotos/${userId}/${position}`).set({uri: photoUrl})
//     }
//
//     const [sources, setSources] = useState<ImageURISource[]>([])
//
//     useEffect(() => {
//         if (userPhotos && userPhotos.length > 0) {
//             let sourcesResult = []
//             for (let i = 0; i < 6; i++) {
//                 const filteredByKey = userPhotos.filter(item => item.key === i.toString())
//                 sourcesResult[i] = filteredByKey && filteredByKey.length > 0 ? filteredByKey[0].value : {uri: ''}
//             }
//             setSources(sourcesResult)
//         }
//     }, [userPhotos])
//
//
//     return (
//         <View style={[containerStyles.Screen]}>
//             <View style={styles.container}>
//                 <View style={{height: wp(375), width: wp(375)}}>
//                     <Row size={2}>
//                         <Col size={2}>
//                             <ImageUploader
//                                 source={sources[0]}
//                                 isFullFill
//                                 onValueChanged={(value) => {
//                                     _savePhoto('0', value.uri)
//                                 }}
//                                 onRemovePhoto={(needRemove) => {
//                                     _removePhoto('0', needRemove)
//                                 }}
//                                 onError={_imageUploaderError}
//                             />
//                         </Col>
//                         <Col size={1} style={{marginLeft: wp(2)}}>
//                             <Row size={1}>
//                                 <ImageUploader
//                                     source={sources[1]}
//                                     isFullFill
//                                     onValueChanged={(value) => {
//                                         _savePhoto('1', value.uri)
//                                     }}
//                                     onRemovePhoto={(needRemove) => {
//                                         _removePhoto('1', needRemove)
//                                     }}
//                                     onError={_imageUploaderError}
//                                 />
//                             </Row>
//                             <Row size={1} style={{marginTop: wp(2)}}>
//                                 <ImageUploader
//                                     source={sources[2]}
//                                     isFullFill
//                                     onValueChanged={(value) => {
//                                         _savePhoto('2', value.uri)
//                                     }}
//                                     onRemovePhoto={(needRemove) => {
//                                         _removePhoto('2', needRemove)
//                                     }}
//                                     onError={_imageUploaderError}
//                                 />
//                             </Row>
//                         </Col>
//                     </Row>
//                     <Row size={1} style={{marginTop: wp(2)}}>
//                         <Col size={1}>
//                             <ImageUploader
//                                 source={sources[3]}
//                                 isFullFill
//                                 onValueChanged={(value) => {
//                                     _savePhoto('3', value.uri)
//                                 }}
//                                 onRemovePhoto={(needRemove) => {
//                                     _removePhoto('3', needRemove)
//                                 }}
//                                 onError={_imageUploaderError}
//                             />
//                         </Col>
//                         <Col size={1} style={{marginLeft: wp(2)}}>
//                             <ImageUploader
//                                 source={sources[4]}
//                                 isFullFill
//                                 onValueChanged={(value) => {
//                                     _savePhoto('4', value.uri)
//                                 }}
//                                 onRemovePhoto={(needRemove) => {
//                                     _removePhoto('4', needRemove)
//                                 }}
//                                 onError={_imageUploaderError}
//                             />
//                         </Col>
//                         <Col size={1} style={{marginLeft: wp(2)}}>
//                             <ImageUploader
//                                 source={sources[5]}
//                                 isFullFill
//                                 onValueChanged={(value) => {
//                                     _savePhoto('5', value.uri)
//                                 }}
//                                 onRemovePhoto={(needRemove) => {
//                                     _removePhoto('5', needRemove)
//                                 }}
//                                 onError={_imageUploaderError}
//                             />
//                         </Col>
//                     </Row>
//                 </View>
//             </View>
//         </View>
//     );
// }
//

export {}
