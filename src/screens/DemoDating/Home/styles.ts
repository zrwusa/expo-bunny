import {StyleSheet} from 'react-native';
import {SizeLabor, ThemeLabor} from '../../../types/styles';

export const makeStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        screen: {
            flex: 1
        },
        filter: {
            height: wp(20)
        },
        albumContainer: {justifyContent: 'center'},
        album: {width: wp(370)}
    });
};
