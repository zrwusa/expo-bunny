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
        errorConsole: {
            ...absoluteBottomLeft,
            backgroundColor: colors.surface,
            zIndex: ms.zi.xxl,
            width: '100%',
            // width: wp(375),
            padding: ms.sp.s
        },
        errorText: {
            width: '100%',
            height: wp(100),
        },
        buttonBox: {
            justifyContent: 'space-evenly'
        }
    });
};
