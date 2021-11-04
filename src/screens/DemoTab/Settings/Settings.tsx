import * as React from 'react';
import {Text, View} from '../../../components/UI';
import {RouteProp} from '@react-navigation/native';
import {DemoTabStackParam} from '../../../types';
import {shortenTFunctionKey} from '../../../providers';
import {getContainerStyles} from '../../../containers';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {getSharedStyles} from '../../../helpers';
import {useBunnyKit} from '../../../hooks';

type TabSettingsRouteProp = RouteProp<DemoTabStackParam, 'TabSettings'>;
type TabSettingsNavigationProp = BottomTabNavigationProp<DemoTabStackParam, 'TabSettings'>;

export interface TabSettingsProps {
    route: TabSettingsRouteProp,
    navigation: TabSettingsNavigationProp
}

function TabSettingsScreen({route, navigation}: TabSettingsProps) {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.TabSettings');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    return (
        <View style={[containerStyles.Screen, sharedStyles.centralized]}>
            <Text>{st(`title`)}</Text>
            <Text>{route.params.item}</Text>
        </View>
    );
}

export default TabSettingsScreen;
