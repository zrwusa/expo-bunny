import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../types';
import {getStyles} from './styles';
import {Snackbar} from 'react-native-paper';
import {Text, View} from '../UI'
import {setBLResult} from '../../store/actions';
import {useBunnyKit} from '../../hooks/bunny-kit';

const BLToast = () => {
    const {sizeLabor, themeLabor} = useBunnyKit();
    const {blResults} = useSelector((store: RootState) => store.blResultState);
    const styles = getStyles(sizeLabor, themeLabor);
    const dispatch = useDispatch();

    return (<View>
            {blResults.map(blResult => {
                return <Snackbar
                    key={blResult.id}
                    visible={blResult.shouldShow}
                    duration={Snackbar.DURATION_MEDIUM}
                    onDismiss={() => {
                        blResult.shouldShow = false
                        dispatch(setBLResult(blResult))
                    }}
                    action={{
                        label: 'Close',
                        onPress: () => {
                            blResult.shouldShow = false
                            dispatch(setBLResult(blResult))
                        },
                    }}
                >
                    <View>
                        <Text style={styles.text}>{blResult.message}</Text>
                    </View>
                </Snackbar>
            })}
        </View>

    );
}
export default BLToast;
