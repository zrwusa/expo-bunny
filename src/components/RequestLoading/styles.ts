import {StyleSheet} from 'react-native';
import {SizeLabor, ThemeLabor} from '../../types';

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        container: {
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: colors.background,
            opacity: 0.8,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%'
        },
        text: {
            marginTop: ms.sp.m,
            fontSize: ms.fs.xl,
            color: colors.text,
        }
    });
};
