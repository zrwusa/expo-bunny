import {StyleSheet} from 'react-native';
import {SizeLabor, ThemeLabor} from '../../../types';

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;

    return StyleSheet.create({
        stickerPickerIcon: {
            paddingBottom: wp(15),
            paddingHorizontal: wp(10)
        },
        mediaLibraryPickerIcon: {
            paddingBottom: wp(15)
        },
        sendIcon: {
            paddingBottom: wp(15),
            paddingHorizontal: wp(10)
        }
    });
};
