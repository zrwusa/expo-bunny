import styles from "./styles";
import * as React from "react";
import {Share} from "react-native";
import {View, Text, Button, TouchableOpacity, Image, ButtonTO} from "../../components/base-ui";
import {useDispatch} from "react-redux";
import {sysError} from "../../stores/sys/actions";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import {useTranslation} from "react-i18next";

type SelectedImage = {
    localUri: string
}

export function DemoShareScreen() {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.DemoShare';
    const dispatch = useDispatch();
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: t(`${i18nPrefix}.data.message`),
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            dispatch(sysError(error.toString()))
        }
    };

    const [selectedImage, setSelectedImage] = React.useState<SelectedImage>({localUri: ''});

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert(t(`${i18nPrefix}.data.permissionNotGranted`));
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled) {
            return;
        }
        setSelectedImage({localUri: pickerResult.uri});
    };

    const openShareDialogAsync = async () => {
        if (!(await Sharing.isAvailableAsync())) {
            alert(t(`${i18nPrefix}.data.notAvailable`));
            return;
        }
        await Sharing.shareAsync(selectedImage.localUri);
        setSelectedImage({localUri: ''});
    };

    return (
        <View style={styles.container}>
            <View style={{marginTop: 50}}>
                <Button onPress={onShare} title={t(`${i18nPrefix}.buttons.shareMessage`)}/>
            </View>
            {
                (selectedImage && selectedImage.localUri)
                    ? (
                        <View style={styles.container}>
                            <Image source={{uri: selectedImage.localUri}} style={styles.thumbnail}></Image>
                            <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
                                <Text style={styles.buttonText}>Share this photo</Text>
                            </TouchableOpacity>
                        </View>
                    )
                    : <View style={styles.container}>
                        <Image source={{uri: 'https://i.imgur.com/TkIrScD.png'}} style={styles.logo}/>
                        <Text style={styles.instructions}>
                            {t(`${i18nPrefix}.labels.pressButtonTip`)}
                        </Text>
                        <ButtonTO onPress={openImagePickerAsync} style={styles.button}>
                            <Text style={styles.buttonText}>Pick a photo</Text>
                        </ButtonTO>
                    </View>
            }
        </View>
    );
}

export default DemoShareScreen;
