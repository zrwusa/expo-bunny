import {StyleSheet} from 'react-native';
import {SizeLabor, ThemeLabor} from '../../../types';

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        video: {
            alignSelf: 'center',
            width: wp(373),
            height: wp(210),
        },
        buttons: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
};
