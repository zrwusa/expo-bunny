import {StyleSheet} from 'react-native';
import {SizeLabor, ThemeLabor} from '../../types';
import {getSharedStyles} from '../../helpers';

export const makeStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {theme} = themeLabor;
    const {colors, borderRadius} = theme;
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor);
    const {shadowAround, title, card} = sharedStylesFlatten;
    return StyleSheet.create({});
};
