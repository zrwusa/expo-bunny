import {StyleSheet} from 'react-native';
import {SizeLabor, ThemeLabor} from '../../../types';

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;

    return StyleSheet.create({
        conversation: {
            marginHorizontal: wp(10)
        },
        latestMessage: {alignItems: 'flex-start', justifyContent: 'flex-start'},
        timePanel: {justifyContent: 'space-between'},
        time: {color: colors.text3, fontSize: ms.fs.xs},
        tipPanel: {paddingTop: wp(6)},
        tip: {color: colors.text3, fontSize: ms.fs.xs}
    });
}
