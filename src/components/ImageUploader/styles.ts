import {StyleSheet} from 'react-native';
import {SizeLabor, ThemeLabor} from '../../types';
import {getSharedStyles} from '../../helpers';

export const makeStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor);

    return StyleSheet.create({
        container: {},
        imageContainer: {},
        image: {},
        placeholderContainer: {
            backgroundColor: colors.surface,
            justifyContent: 'center',
            alignItems: 'center'
        },
        loadingOverlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: colors.backdrop,
            alignItems: 'center',
            justifyContent: 'center',
        },
        modal: {
            justifyContent: 'flex-end'
        },
        modalPanelContainer: {
            marginBottom: ms.sp.l
        },
        modalPanel: {
            backgroundColor: colors.background,
            borderRadius: ms.br.s
        },
        modalPanel2: {
            backgroundColor: colors.background,
            marginTop: ms.sp.m,
            borderRadius: ms.br.s
        },
        button: {
            alignItems: 'center'
        },
        buttonText: {
            padding: ms.sp.s,
        }
    });
};
