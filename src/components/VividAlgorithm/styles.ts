import {StyleSheet} from 'react-native';
import {SizeLabor, ThemeLabor} from '../../types';
import {getSharedStyles} from '../../helpers';

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor);
    const {absoluteBottomLeft} = sharedStylesFlatten;
    const {colors} = themeLabor.theme;

    return StyleSheet.create({
        array: {},
        arrayItem: {
            width: wp(50),
            height: wp(50),
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: colors.border,
            borderWidth: ms.sp.xxs
        }
    });
}
