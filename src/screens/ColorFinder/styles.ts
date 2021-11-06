import {StyleSheet} from 'react-native';
import {SizeLabor, ThemeLabor} from '../../types';
import {getSharedStyles} from '../../helpers';

export const makeStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor);

    return StyleSheet.create({
        container: {
            padding: ms.sp.m
        },
        shadow: {
            shadowColor: 'black',
            shadowOpacity: 0.5,
            shadowRadius: wp(5),
            shadowOffset: {
                width: 0,
                height: wp(1),
            },
        },
        input: {
            marginVertical: ms.sp.m,
            borderWidth: ms.sp.xxs,
            borderColor: colors.border,
        },
        button: {marginTop: wp(10)},

        row: {
            justifyContent: 'space-between',
        },
        colorPanel: {
            width: wp(100),
            height: wp(20),
            borderColor: colors.background,
            borderRadius: ms.br.xs,
            borderWidth: ms.sp.xxs,
        }
    });
};
