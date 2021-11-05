import {getStyles} from './styles';
import * as React from 'react';
import {Share} from 'react-native';
import {ButtonTO, Image, InButtonText, Text, TouchableOpacity, View} from '../../components/UI';
import {useDispatch} from 'react-redux';
import {collectSysError} from '../../store/actions';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import {shortenTFunctionKey} from '../../providers/i18n-labor';
import {getContainerStyles} from '../../containers';
import {useSizeLabor} from '../../providers/size-labor';
import {useThemeLabor} from '../../providers/theme-labor';
import {getSharedStyles} from '../../helpers';
import {useBunnyKit} from '../../hooks/bunny-kit';

export type SelectedImage = {
    localUri: string
}

function DemoShareScreen() {
    const {t} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.DemoShare');
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
        } catch (e: any) {
            dispatch(collectSysError(e.toString()));
        }
    };

    const [selectedImage, setSelectedImage] = React.useState<SelectedImage>({localUri: ''});

    const openImagePicker = async () => {
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
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);

    return (
        <View style={[containerStyles.Screen, sharedStyles.centralized]}>
            <View style={{marginTop: 50}}>
                <ButtonTO onPress={onShare}>
                    <InButtonText>{st(`shareMessage`)}</InButtonText>
                </ButtonTO>
            </View>
            {
                (selectedImage && selectedImage.localUri)
                    ? (
                        <View style={sharedStyles.centralized}>
                            <Image source={{uri: selectedImage.localUri}} style={styles.thumbnail}/>
                            <TouchableOpacity onPress={openShareDialogAsync}>
                                <InButtonText>Share this photo</InButtonText>
                            </TouchableOpacity>
                        </View>
                    )
                    : <View style={sharedStyles.centralized}>
                        <Image source={{uri: 'https://i.imgur.com/TkIrScD.png'}} style={styles.logo}/>
                        <Text style={styles.instructions}>
                            {st(`pressButtonTip`)}
                        </Text>
                        <ButtonTO onPress={openImagePicker}>
                            <InButtonText>{st(`pickAPhoto`)}</InButtonText>
                        </ButtonTO>
                    </View>
            }
        </View>
    );
}

export default DemoShareScreen;
