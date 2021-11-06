import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../types';
import {makeStyles} from './styles';
import {Snackbar} from 'react-native-paper';
import {Text, View} from '../UI';
import {setBizLogicResult} from '../../store/actions';
import {useBunnyKit} from '../../hooks/bunny-kit';

const BLToast = () => {
    const {sizeLabor, themeLabor} = useBunnyKit();
    const {bizLogicResults} = useSelector((store: RootState) => store.bizLogicResultState);
    const styles = makeStyles(sizeLabor, themeLabor);
    const dispatch = useDispatch();

    return (<View>
            {bizLogicResults.map(bizLogicResult => {
                return <Snackbar
                    key={bizLogicResult.id}
                    visible={bizLogicResult.shouldShow}
                    duration={Snackbar.DURATION_MEDIUM}
                    onDismiss={() => {
                        bizLogicResult.shouldShow = false;
                        dispatch(setBizLogicResult(bizLogicResult));
                    }}
                    action={{
                        label: 'Close',
                        onPress: () => {
                            bizLogicResult.shouldShow = false;
                            dispatch(setBizLogicResult(bizLogicResult));
                        },
                    }}
                >
                    <View>
                        <Text style={styles.text}>{bizLogicResult.message}</Text>
                    </View>
                </Snackbar>;
            })}
        </View>

    );
};
export default BLToast;
