import React from 'react';
import {Button, Text, View} from '../../components/UI';
import {useDispatch, useSelector} from 'react-redux';
import {getDemoSagas} from '../../store/actions';
import {RootState} from '../../types';
import {getSharedStyles} from '../../helpers';
import {getContainerStyles} from '../../containers';
import {useBunnyKit} from '../../hooks/bunny-kit';


function DemoSagaScreen() {
    const {sizeLabor, themeLabor} = useBunnyKit();
    const dispatch = useDispatch();
    const demoSagaState = useSelector((rootState: RootState) => rootState.demoSagaState);
    const {items} = demoSagaState;
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);

    return (
        <View style={[containerStyles.Screen, sharedStyles.centralized]}>
            <Button onPress={() => {
                dispatch(getDemoSagas({
                    pageNum: 1, pageCount: 10, filter: {
                        text: 'saga1'
                    }
                }));
            }} title="fetchDemoSagas"/>
            {
                items && items.length > 0
                    ? items.map(item => {
                        return <Text key={item.id}>{item.text}</Text>;
                    })
                    : null
            }
        </View>
    );
}

export default DemoSagaScreen;
