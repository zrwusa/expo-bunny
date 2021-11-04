import {StyleSheet} from 'react-native';
import {SizeLabor, ThemeLabor} from '../types';
import {getSharedStyles} from '../helpers';

export const getContainerStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor);
    const {ms, designsBasedOn} = sizeLabor;
    const {wp} = designsBasedOn.iphoneX;
    const {shadowAround, title, title2, card} = sharedStylesFlatten;
    const {theme} = themeLabor;
    return StyleSheet.create({
        Card: {
            ...shadowAround,
            ...card,
            paddingVertical: ms.sp.m,
            paddingHorizontal: ms.sp.l,
            width: '100%',
            // flex:1, //TODO width 100% different from flex on native devices
        },
        CardInTitle: {
            ...title2,
            marginBottom: ms.sp.m,
        },
        CardOutTitle: {
            ...title,
            marginVertical: ms.sp.m,
            fontWeight: 'bold',
        },
        InputCard: {
            marginTop: wp(20)
        },
        InputCardTitle: {
            ...sharedStylesFlatten.text2,
            marginBottom: wp(10)
        },
        Screen: {
            flex: 1,
        },
        FullFill: {
            flex: 1
        },
        Box: {
            padding: ms.sp.m
        }
    });
};
