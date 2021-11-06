import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text} from '../../../components/UI';
import {makeContainerStyles} from '../../../containers';
import {getSharedStyles} from '../../../helpers';
import {useBunnyKit} from '../../../hooks/bunny-kit';

function RNFlatListScreen() {
    const {sizeLabor, themeLabor} = useBunnyKit();
    const containerStyles = makeContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);

    return (
        <SafeAreaView style={[containerStyles.Screen, sharedStyles.centralized]}>
            <Text>Safe Area View</Text>
        </SafeAreaView>
    );
}

export default RNFlatListScreen;
