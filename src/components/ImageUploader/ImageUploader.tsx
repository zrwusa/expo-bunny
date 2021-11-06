// TODO support ImageSourcePropType
import React, {useEffect, useState} from 'react';
import {IcoMoon, Text, TextButton} from '../UI';
import {
    ActivityIndicator,
    ActivityIndicatorProps,
    Image,
    ImageErrorEventData,
    ImageStyle,
    ImageURISource,
    NativeSyntheticEvent,
    Platform,
    SafeAreaView,
    Share,
    StyleProp,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
// import * as CameraRoll from "@react-native-community/cameraroll";
import {makeStyles} from './styles';
import * as ImagePicker from 'expo-image-picker';
import {ImagePickerOptions} from 'expo-image-picker';
import {Permissions, removeFileFromFirebaseByURL, uploadFileToFirebase} from '../../helpers';
import Modal, {ModalProps} from 'react-native-modal';
import {Divider} from '../Divider';
import {CopyableText} from '../CopyableText';
import {IcoMoonKeys} from '../../types';
import {useBunnyKit} from '../../hooks/bunny-kit';
// import ViewShot,{captureRef} from "react-native-view-shot";
export type UploadedResult = { uri: string }
export type RenderPreview = (props: { imageSource: ImageURISource, toggleModal: () => void }) => React.ReactElement | null;
export type PickResultType = 'image' | 'video' | undefined;

export interface ImageUploaderProps {
    width?: number,
    height?: number,
    isFullFill?: boolean,
    source?: ImageURISource,
    path?: string,
    isShowUri?: boolean,
    isDeleteFromServerWhenRemove?: boolean,
    isDeleteFromServerWhenUpload?: boolean,

    style?: StyleProp<ViewStyle>,
    imageContainerStyle?: StyleProp<ViewStyle>,
    placeholderContainerStyle?: StyleProp<ViewStyle>,
    modalPanelContainerStyle?: StyleProp<ViewStyle>,
    modalPanelStyle?: StyleProp<ViewStyle>,
    modalPanel2Style?: StyleProp<ViewStyle>,
    imageStyle?: StyleProp<ImageStyle>,
    loadingOverlayStyle?: StyleProp<ViewStyle>,
    buttonStyle?: StyleProp<ViewStyle>,
    buttonTextStyle?: StyleProp<TextStyle>,

    placeholderIconName?: IcoMoonKeys,
    imagePickerOptions?: ImagePickerOptions,
    cameraPickerOptions?: ImagePickerOptions,
    modalProps?: ModalProps,
    loadingIndicatorProps?: ActivityIndicatorProps,

    renderPreview?: RenderPreview,

    onError?: (error: Error) => void,
    onSelected?: (pickResult: ImagePicker.ImagePickerResult) => void,
    onUploaded?: (uploadedResult: UploadedResult, type?: PickResultType) => void,
    onValueChanged?: (imageSource: ImageURISource) => void,
    onRemovePhoto?: (imageSource?: ImageURISource) => void,
}

export function ImageUploader(props: ImageUploaderProps) {
    const {sizeLabor, themeLabor, wp} = useBunnyKit();
    const {colors} = themeLabor.theme;
    const {
        width = wp(200),
        height = wp(200),
        source,
        path,
        isFullFill = false,
        isShowUri = false,
        isDeleteFromServerWhenRemove = true,
        isDeleteFromServerWhenUpload = true,

        style,
        placeholderContainerStyle,
        imageContainerStyle,
        loadingOverlayStyle,
        modalPanelContainerStyle,
        modalPanelStyle,
        modalPanel2Style,
        imageStyle,
        buttonStyle,
        buttonTextStyle,

        placeholderIconName = 'plus',
        modalProps,
        imagePickerOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.2,
        } as ImagePickerOptions,
        cameraPickerOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.2,
        } as ImagePickerOptions,
        loadingIndicatorProps = {
            color: colors.text,
            animating: true,
            size: 'large'
        },

        renderPreview,

        onError,
        onSelected,
        onUploaded,
        onValueChanged,
        onRemovePhoto,
    } = props;
    const sizeStyle = {width: isFullFill ? '100%' : width, height: isFullFill ? '100%' : height};
    const styles = makeStyles(sizeLabor, themeLabor);
    const [image, setImage] = useState<ImageURISource>(source || {uri: ''});
    const [isModalVisible, setModalVisible] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    // const screenshotIt = useRef<ViewShot>(null)

    useEffect(() => {
        setImage(source || {uri: ''});
    }, [source]);

    const _takePhoto = async () => {
        const isAllowed = await Permissions.camera.get();
        if (!isAllowed) {
            return;
        }
        let pickerResult = await ImagePicker.launchCameraAsync(cameraPickerOptions);
        await _handleImagePicked(pickerResult);
    };

    const _pickImage = async () => {
        const isAllowed = await Permissions.mediaLibrary.get();
        if (!isAllowed) {
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync(imagePickerOptions);
        // const iOS = {
        //     "cancelled": false,
        //     "duration": 19181.66796875,
        //     "height": 1792,
        //     "type": "video",
        //     "uri": "file:///var/mobile/Containers/Data/Application/A2D459FE-B246-4823-92C0-023BCB216EC3/Library/Caches/ExponentExperienceData/%2540zrwusa%252Fexpo-react-bunny/ImagePicker/EE48EAD8-6717-488D-94D6-2C834E561553.mov",
        //     "width": 828,
        // }
        // const web = {
        //     cancelled: false,
        //     height: 0,
        //     uri: "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21",
        //     width: 0
        // }
        if (!pickerResult.cancelled) {
            // fixed expo-image-picker did not give a type on web platform
            switch (Platform.OS) {
                case 'web':
                    const {uri} = pickerResult;
                    let mimeType = '';
                    if (uri) {
                        const matched = uri.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/);
                        if (matched) {
                            mimeType = matched[0];
                        }
                    }
                    if (mimeType) {
                        const type = mimeType.split('/')[0];
                        pickerResult.type = type as 'image' | 'video' | undefined;
                    }
                    break;
                default:
                    break;
            }
        }

        await _handleImagePicked(pickerResult);
    };

    const _errorHandle = (e: Error) => {
        onError && onError(e);
    };

    const _imageError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
        e.nativeEvent.error;
        onError && onError(e.nativeEvent.error);
    };

    const _handleImagePicked = async (pickerResult: ImagePicker.ImagePickerResult) => {
        onSelected && onSelected(pickerResult);
        setIsUploading(true);
        setModalVisible(false);
        try {
            if (!pickerResult.cancelled) {
                if (image.uri && isDeleteFromServerWhenUpload) {
                    await removeFileFromFirebaseByURL(image.uri);
                }
                const uploadUrl = await uploadFileToFirebase(pickerResult.uri, path);
                onUploaded && onUploaded({uri: uploadUrl}, pickerResult.type);
                setImage({uri: uploadUrl});
                onValueChanged && onValueChanged({uri: uploadUrl});
            }
        } catch (e: any) {
            _errorHandle(e);
        } finally {
            setIsUploading(false);
        }
    };

    const _toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const _removePhoto = async () => {
        if (image.uri) {
            if (isDeleteFromServerWhenRemove) {
                const removeResult = await removeFileFromFirebaseByURL(image.uri);
            }
            const needRemovePhoto = {...image};
            setImage({uri: ''});
            setModalVisible(false);
            onRemovePhoto && onRemovePhoto(needRemovePhoto);
        } else {
            onRemovePhoto && onRemovePhoto();
        }
    };
    const _share = async () => {
        await Share.share({
            message: image.uri,
            title: 'Check out this photo',
            url: image.uri || '',
        });
    };

    // const _takeScreenshot = async () => {
    //     console.log("pre..");
    //     // console.log(screenshotIt);
    //     console.log("pre.2");
    //     let ss = await captureRef(screenshotIt, {
    //         format: 'png',
    //         quality: 0.6,
    //         // width: Dimensions.get('screen').width,
    //         // height: Dimensions.get('screen').height,
    //         // snapshotContentContainer: true,
    //     })
    //     // let ss = await screenshotIt.current.capture()
    //     // let ss = await Expo.takeSnapshotAsync(screenshotIt, {
    //     //     format: 'png',
    //     //     quality: 0.6,
    //     //     result: 'file',
    //     //     // width: Dimensions.get('screen').width,
    //     //     // height: Dimensions.get('screen').height,
    //     //     // snapshotContentContainer: true,
    //     // });
    //     console.log("taking a snap");
    //     console.log('---ss',ss)
    //     // await CameraRoll.save(ss);
    //     await _handleImagePicked(ss);
    // };

    const _maybeRenderUploadingOverlay = () => {
        if (isUploading) {
            return (
                <View
                    style={[styles.loadingOverlay, loadingOverlayStyle]}>
                    <ActivityIndicator {...loadingIndicatorProps}/>
                </View>
            );
        }
    };

    const _renderImage = () => {
        return (
            <View
                style={[styles.imageContainer, sizeStyle, imageContainerStyle]}>
                <Image source={image} style={[styles.image, sizeStyle, imageStyle]} onError={_imageError}/>
                {
                    isShowUri
                        ? <CopyableText numberOfLines={1}>{image.uri}</CopyableText>
                        : null
                }
            </View>
        );
    };

    const _renderPlaceholder = () => {
        return (
            <View style={[styles.placeholderContainer, sizeStyle, placeholderContainerStyle]}>
                <IcoMoon name={placeholderIconName} color={colors.text3}/>
            </View>
        );
    };

    const styleJudge: StyleProp<ViewStyle> = renderPreview ? undefined : [styles.container, sizeStyle, style];
    return (
        <SafeAreaView
            // ref={screenshotIt}
            style={styleJudge}>
            {
                renderPreview
                    ? renderPreview({imageSource: image, toggleModal: _toggleModal})
                    : <TouchableOpacity style={[sizeStyle]} onPress={_toggleModal}>
                        {image.uri ? _renderImage() : _renderPlaceholder()}
                        {_maybeRenderUploadingOverlay()}
                    </TouchableOpacity>
            }

            <Modal isVisible={isModalVisible}
                   onSwipeComplete={() => setModalVisible(false)}
                   swipeDirection="down"
                   style={styles.modal}
                   onBackdropPress={() => setModalVisible(false)}
                   {...modalProps}>
                <View style={[styles.modalPanelContainer, modalPanelContainerStyle]}>
                    <View style={[styles.modalPanel, modalPanelStyle]}>
                        <TextButton style={[styles.button, buttonStyle]} onPress={_pickImage}><Text
                            style={[styles.buttonText, buttonTextStyle]}>Open
                            Gallery</Text></TextButton>
                        <Divider/>
                        <TextButton style={[styles.button, buttonStyle]} onPress={_takePhoto}><Text
                            style={[styles.buttonText, buttonTextStyle]}>Take
                            A Photo</Text></TextButton>
                        {/*<Divider/>*/}
                        {/*<TextButton onPress={_takeScreenshot}><Text>Take a screenshot</Text></TextButton>*/}
                        {
                            image.uri
                                ? <>
                                    <Divider/>
                                    <TextButton onPress={_removePhoto} style={[styles.button, buttonStyle]}><Text
                                        style={[styles.buttonText, buttonTextStyle]}>Remove
                                        Photo</Text></TextButton>
                                </>
                                : null
                        }
                    </View>
                    <View style={[styles.modalPanel2, modalPanel2Style]}>
                        <TextButton style={[styles.button, buttonStyle]} onPress={_toggleModal}><Text
                            style={[styles.buttonText, buttonTextStyle]}>Cancel</Text></TextButton>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
