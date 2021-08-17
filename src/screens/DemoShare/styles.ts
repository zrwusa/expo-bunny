import {StyleSheet} from 'react-native';
import {SizeLabor, ThemeLabor} from '../../types/styles';

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        logo: {
            width: 305,
            height: 159,
            marginBottom: 20,
        },
        instructions: {
            color: '#888',
            fontSize: 18,
            marginHorizontal: 15,
            marginBottom: 10,
        },
        thumbnail: {
            width: 300,
            height: 300,
            resizeMode: 'contain',
        },
    });
}
