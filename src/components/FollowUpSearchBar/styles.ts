import {StyleSheet} from 'react-native';
import {SizeLabor, ThemeLabor} from '../../types';

export const makeStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;

    return StyleSheet.create({
        container: {
            position: 'absolute',
            top: 0,
            width: wp(375),
            left: 0,
            zIndex: ms.zi.s,
            backgroundColor: colors.background,
            flexDirection: 'row',
            alignItems: 'center',
            padding: ms.sp.m
        },
        formField: {
            flex: 1,
            padding: ms.sp.m,
            paddingLeft: ms.sp.l,
            paddingRight: ms.sp.l,
            borderRadius: ms.br.s,
            fontSize: ms.fs.l,
            backgroundColor: colors.background,
            height: wp(35),
        },
        barRight: {
            marginHorizontal: ms.sp.m,
            marginRight: ms.sp.s,
        }
    });
};
