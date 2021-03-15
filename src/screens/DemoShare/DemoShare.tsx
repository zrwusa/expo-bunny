import {createStyles} from "./styles";
import * as React from "react";
import {Share} from "react-native";
import {ButtonTO, Image, Text, TextBtn, TouchableOpacity, View} from "../../components/UI";
import {useDispatch} from "react-redux";
import {sysError} from "../../store/actions";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../providers/i18n-labor";
import {createContainerStyles} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {createSmartStyles} from "../../utils";

type SelectedImage = {
    localUri: string
}

function DemoShareScreen() {
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.DemoShare');
    const dispatch = useDispatch();
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: st(`message`),
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
            alert(st(`permissionNotGranted`));
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
            alert(st(`notAvailable`));
            return;
        }
        await Sharing.shareAsync(selectedImage.localUri);
        setSelectedImage({localUri: ''});
    };
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = createContainerStyles(sizeLabor, themeLabor);
    const styles = createStyles(sizeLabor, themeLabor);
    const {smartStyles} = createSmartStyles(sizeLabor, themeLabor);

    return (
        <View style={[containerStyles.Screen, smartStyles.centralized]}>
            <View style={{marginTop: 50}}>
                <ButtonTO onPress={onShare}>
                    <TextBtn>{st(`shareMessage`)}</TextBtn>
                </ButtonTO>
            </View>
            {
                (selectedImage && selectedImage.localUri)
                    ? (
                        <View style={smartStyles.centralized}>
                            <Image source={{uri: selectedImage.localUri}} style={styles.thumbnail}/>
                            <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
                                <Text style={styles.buttonText}>Share this photo</Text>
                            </TouchableOpacity>
                        </View>
                    )
                    : <View style={smartStyles.centralized}>
                        <Image source={{uri: 'https://i.imgur.com/TkIrScD.png'}} style={styles.logo}/>
                        <Text style={styles.instructions}>
                            {st(`pressButtonTip`)}
                        </Text>
                        <ButtonTO onPress={openImagePickerAsync} style={styles.button}>
                            <Text style={styles.buttonText}>{st(`pickAPhoto`)}</Text>
                        </ButtonTO>
                    </View>
            }
        </View>
    );
}

export default DemoShareScreen;
