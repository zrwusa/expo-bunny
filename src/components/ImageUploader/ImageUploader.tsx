import React, {useEffect, useState} from "react";
import {IcoMoon, Text, TextButton} from "../UI";
import {useThemeLabor} from "../../providers/theme-labor";
import {
    ActivityIndicator,
    ActivityIndicatorProps,
    Image,
    ImageErrorEventData,
    ImageStyle,
    ImageURISource,
    NativeSyntheticEvent,
    SafeAreaView,
    Share,
    StyleProp,
    TouchableOpacity,
    View,
    ViewStyle
} from "react-native";
// import * as CameraRoll from "@react-native-community/cameraroll";
import {getStyles} from "./styles";
import {useSizeLabor} from "../../providers/size-labor";
import * as ImagePicker from 'expo-image-picker';
import {ImagePickerOptions} from 'expo-image-picker';
import {Permissions, removeImageFromFirebase, uploadImageToFirebase} from "../../helpers";
import Modal, {ModalProps} from 'react-native-modal';
import {Divider} from "../Divider";
import {CopyableText} from "../CopyableText";
import {IcoMoonKeys} from "../../types";
// import ViewShot,{captureRef} from "react-native-view-shot";
export type UploadedResult = { uri: string }

export interface ImageUploaderProps {
    width?: number,
    height?: number,
    isFullFill?: boolean,
    source?: ImageURISource,
    isShowUri?: boolean,
    isDeleteFromServerWhenRemove?: boolean,
    isDeleteFromServerWhenUpload?: boolean,

    containerStyle?: StyleProp<ViewStyle>,
    imageContainerStyle?: StyleProp<ViewStyle>,
    placeholderContainerStyle?: StyleProp<ViewStyle>,
    modalPanelContainerStyle?: StyleProp<ViewStyle>,
    modalPanelStyle?: StyleProp<ViewStyle>,
    modalPanel2Style?: StyleProp<ViewStyle>,
    imageStyle?: StyleProp<ImageStyle>,
    loadingOverlayStyle?: StyleProp<ViewStyle>,

    placeholderIconName?: IcoMoonKeys,
    imagePickerOptions?: ImagePickerOptions,
    cameraPickerOptions?: ImagePickerOptions,
    modalProps?: ModalProps,
    loadingIndicatorProps?: ActivityIndicatorProps,

    onError?: (error: Error) => void,
    onSelected?: (pickResult: ImagePicker.ImagePickerResult) => void,
    onUploaded?: (uploadedResult: UploadedResult) => void,
    onValueChanged?: (source: ImageURISource) => void,
    onRemovePhoto?: (source?: ImageURISource) => void,
}

export function ImageUploader(props: ImageUploaderProps) {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {colors} = themeLabor.theme;
    const {wp} = sizeLabor.designsBasedOn.iphoneX
    const {
        width = wp(200),
        height = wp(200),
        source,
        isFullFill = false,
        isShowUri = false,
        isDeleteFromServerWhenRemove = true,
        isDeleteFromServerWhenUpload = true,

        containerStyle,
        placeholderContainerStyle,
        imageContainerStyle,
        loadingOverlayStyle,
        modalPanelContainerStyle,
        modalPanelStyle,
        modalPanel2Style,
        imageStyle,

        placeholderIconName = 'plus',
        modalProps,
        imagePickerOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        },
        cameraPickerOptions = {
            allowsEditing: true,
            aspect: [4, 3],
        },
        loadingIndicatorProps = {
            color: colors.text,
            animating: true,
            size: 'large'
        },

        onError,
        onSelected,
        onUploaded,
        onValueChanged,
        onRemovePhoto,
    } = props
    const sizeStyle = {width: isFullFill ? '100%' : width, height: isFullFill ? '100%' : height}
    const styles = getStyles(sizeLabor, themeLabor)
    const [image, setImage] = useState<ImageURISource>(source || {uri: ''});
    const [isModalVisible, setModalVisible] = useState(false);
    const [isUploading, setIsUploading] = useState(false)
    // const screenshotIt = useRef<ViewShot>(null)
    useEffect(() => {
        if (source?.uri !== image.uri) {
            onValueChanged && onValueChanged(image)
        }
    }, [image])

    useEffect(() => {
        setImage(source || {uri: ''})
    }, [source])

    const _takePhoto = async () => {
        const isAllowed = await Permissions.camera.get()
        if (!isAllowed) {
            return
        }
        let pickerResult = await ImagePicker.launchCameraAsync(cameraPickerOptions);
        await _handleImagePicked(pickerResult);
    };

    const _pickImage = async () => {
        const isAllowed = await Permissions.mediaLibrary.get()
        if (!isAllowed) {
            return
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync(imagePickerOptions);
        await _handleImagePicked(pickerResult);
    };

    const _errorHandle = (e: Error) => {
        onError && onError(e)
    }

    const _imageError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
        e.nativeEvent.error
        onError && onError(e.nativeEvent.error)
    }

    const _handleImagePicked = async (pickerResult: ImagePicker.ImagePickerResult) => {
        onSelected && onSelected(pickerResult);
        setIsUploading(true)
        setModalVisible(false)
        try {
            if (!pickerResult.cancelled) {
                if (image.uri && isDeleteFromServerWhenUpload) {
                    await removeImageFromFirebase(image.uri)
                }
                const uploadUrl = await uploadImageToFirebase(pickerResult.uri);
                onUploaded && onUploaded({uri: uploadUrl});
                setImage({uri: uploadUrl})
            }
        } catch (e) {
            _errorHandle(e)
        } finally {
            setIsUploading(false)
        }
    };

    const _toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const _removePhoto = async () => {
        if (image.uri) {
            if (isDeleteFromServerWhenRemove) {
                const removeResult = await removeImageFromFirebase(image.uri)
                console.log('---removeResult', removeResult)
            }
            const needRemovePhoto = {...image}
            setImage({uri: ''});
            setModalVisible(false);
            onRemovePhoto && onRemovePhoto(needRemovePhoto)
        } else {
            onRemovePhoto && onRemovePhoto()
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
    }

    return (
        <SafeAreaView
            // ref={screenshotIt}
            style={[styles.container, sizeStyle, containerStyle]}>
            <TouchableOpacity style={[sizeStyle]} onPress={_toggleModal}>
                {image.uri ? _renderImage() : _renderPlaceholder()}
                {_maybeRenderUploadingOverlay()}
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}
                   onSwipeComplete={() => setModalVisible(false)}
                   swipeDirection="down"
                   style={styles.modal}
                   onBackdropPress={() => setModalVisible(false)}
                   {...modalProps}>
                <View style={[styles.modalPanelContainer, modalPanelContainerStyle]}>
                    <View style={[styles.modalPanel, modalPanelStyle]}>
                        <TextButton onPress={_pickImage}><Text>Open Gallery</Text></TextButton>
                        <Divider/>
                        <TextButton onPress={_takePhoto}><Text>Take A Photo</Text></TextButton>
                        {/*<Divider/>*/}
                        {/*<TextButton onPress={_takeScreenshot}><Text>Take a screenshot</Text></TextButton>*/}
                        {
                            image.uri
                                ? <>
                                    <Divider/>
                                    <TextButton onPress={_removePhoto}><Text>Remove Photo</Text></TextButton>
                                </>
                                : null
                        }
                    </View>
                    <View style={[styles.modalPanel2, modalPanel2Style]}>
                        <TextButton onPress={_toggleModal}><Text>Cancel</Text></TextButton>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}



