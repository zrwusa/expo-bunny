import {StyleSheet} from 'react-native';
import {SizeLabor, ThemeLabor} from '../../types';
import {getSharedStyles} from '../../helpers';

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor);
    const {shadowAround} = sharedStylesFlatten;
    return StyleSheet.create({
        authContainer: {
            flex: 1,
            marginTop: ms.sp.m
        },
        container: {
            paddingHorizontal: wp(20),
        },
        loginOrSignUpContainer: {
            marginTop: ms.sp.l,
            paddingHorizontal: wp(20),
        },
        header: {
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
        },
        content: {
            flex: 10,
            marginHorizontal: wp(20),
            borderRadius: wp(10),
            ...shadowAround
        },
        footer: {
            flex: 1,
        },
        footerBtnWrapper: {
            alignItems: 'center'
        },
        footerBtn: {
            top: ms.sp.m,
            width: wp(100),
            ...shadowAround
        },
        authService: {
            justifyContent: 'flex-end'
        }

    });
};
