import {StyleSheet} from 'react-native';
import {SizeLabor, ThemeLabor} from '../../types';

export const makeStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        container: {
            // borderTopLeftRadius: ms.br.m,
            // borderTopRightRadius: ms.br.m,
            backgroundColor: colors.background,
        },

        header: {
            paddingHorizontal: wp(10),
            paddingVertical: wp(10)
        },
        content: {
            paddingLeft: wp(20),
            paddingRight: wp(10)
        },
        footer: {
            backgroundColor: colors.background,
            marginTop: ms.sp.m,
            borderRadius: ms.br.s,
            paddingBottom: ms.sp.l,
            paddingHorizontal: ms.sp.l,
        },
    });
};
