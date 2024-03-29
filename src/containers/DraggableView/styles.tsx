import {StyleSheet} from 'react-native';
import {useSizeLabor} from '../../providers/size-labor';
import {getSharedStyles} from '../../helpers';
import {SizeLabor, ThemeLabor} from '../../types';

export const makeStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = useSizeLabor();
    const {wp} = designsBasedOn.iphoneX;
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor);
    const {shadow} = sharedStylesFlatten;
    const {theme} = themeLabor;
    const {colors} = theme;
    return StyleSheet.create({});
};
