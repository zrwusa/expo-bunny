import * as React from 'react';
import {Text, View} from '../../../components/UI';
import {shortenTFunctionKey} from '../../../providers';
import {getContainerStyles} from '../../../containers';
import {getSharedStyles} from '../../../helpers';
import {useBunnyKit} from '../../../hooks';

function TabHomeScreen() {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.TabHome');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    return (
        <View style={[containerStyles.Screen, sharedStyles.centralized]}>
            <Text>{st(`title`)}</Text>
        </View>
    );
}

export default TabHomeScreen;
