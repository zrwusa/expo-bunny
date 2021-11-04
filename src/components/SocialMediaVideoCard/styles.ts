import {StyleSheet} from 'react-native';
import {SizeLabor, ThemeLabor} from '../../types';

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors, fonts} = themeLabor.theme;
    return StyleSheet.create({
        card: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: wp(6),
            paddingLeft: wp(6),
            paddingRight: wp(16)
        },
        header: {flexDirection: 'row', alignItems: 'center'},
        headerLeft: {
            marginRight: wp(5),
            // width: wp(28),
            // height: wp(28),
            // borderRadius: wp(14),
            // borderColor: colors.accent,
            // borderWidth: wp(1)
        },
        // headerLeftAvatar: {
        //     position: 'relative',
        //     width: wp(26),
        //     height: wp(26),
        //     borderRadius: wp(13),
        //     borderColor: colors.buttonText,
        //     borderWidth: wp(1)
        // },
        headerLeftUser: {fontSize: ms.fs.s, lineHeight: ms.fs.s, color: colors.text},
        headerRightText: {fontSize: ms.fs.l, color: colors.text},
        image: {
            alignSelf: 'center',
            width: wp(373),
            height: wp(210),
        },
        bottomBar: {
            flexDirection: 'row',
            paddingHorizontal: wp(16),
            paddingVertical: wp(10),
            justifyContent: 'space-between'
        },
        bottomBarLeft: {flexDirection: 'row', width: wp(80), justifyContent: 'space-between'},
        comments: {paddingHorizontal: wp(16)},
        commentsLikes: {fontSize: ms.fs.xs, fontWeight: 'bold', color: colors.text},
        comment: {
            fontFamily: fonts.thin.fontFamily,
            fontWeight: fonts.light.fontWeight,
            color: colors.text,
            fontSize: ms.fs.xs,
        }
    });
};
