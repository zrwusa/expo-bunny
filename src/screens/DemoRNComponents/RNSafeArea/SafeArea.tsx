import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text} from '../../../components/UI';
import {getContainerStyles} from '../../../containers';
import {getSharedStyles} from '../../../helpers';
import {useBunnyKit} from '../../../hooks';

function RNFlatListScreen() {
    const {sizeLabor, themeLabor} = useBunnyKit();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);

    return (
        <SafeAreaView style={[containerStyles.Screen, sharedStyles.centralized]}>
            <Text>Safe Area View</Text>
        </SafeAreaView>
    );
}

export default RNFlatListScreen;
