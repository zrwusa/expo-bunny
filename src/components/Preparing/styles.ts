import {StyleSheet} from 'react-native';
import {pl} from '../../utils';

export const makeStyles = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: pl.grey100,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            marginTop: 10,
            fontSize: 16,
            color: pl.grey700,
        }
    });
};
