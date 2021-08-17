import {StyleSheet} from 'react-native';
import {SizeLabor, ThemeLabor} from '../../../types';
import {getSharedStyles} from '../../../helpers';

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor);
    const {} = sharedStylesFlatten
    return StyleSheet.create({
        btcChart: {
            marginTop: wp(36),
            paddingBottom: wp(6)
        }
    });
}
