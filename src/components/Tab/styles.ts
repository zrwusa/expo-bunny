import {StyleSheet} from 'react-native';
import {SizeLabor, ThemeLabor} from '../../types';
import {getSharedStyles} from '../../helpers';

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor);
    const {} = sharedStylesFlatten
    return StyleSheet.create({
        tabs: {
            borderBottomColor: colors.border,
            borderBottomWidth: wp(1),
        },
        tab: {
            flex: 1,
            alignItems: 'center'
        },
        tabIndicator: {
            width: wp(60),
            height: wp(2),
            backgroundColor: colors.transparent,
        },
        tabIndicatorActive: {
            backgroundColor: colors.secondary,
        },
        tabText: {
            fontSize: ms.fs.s,
            padding: ms.sp.m,
            paddingHorizontal: ms.sp.l,
            textAlign: 'center',
        },
        tabTextActive: {
            color: colors.secondary
        },
    });
}
