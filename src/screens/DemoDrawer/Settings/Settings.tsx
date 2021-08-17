import * as React from 'react';
import {Text, View} from '../../../components/UI';
import {RouteProp} from '@react-navigation/native';
import {DemoDrawerStackParam, RootStackParam} from '../../../types';
import {shortenTFunctionKey} from '../../../providers/i18n-labor';
import {getContainerStyles} from '../../../containers';
import {StackNavigationProp} from '@react-navigation/stack';
import {getSharedStyles} from '../../../helpers';
import {useBunnyKit} from '../../../hooks/bunny-kit';

type DrawerSettingsRouteProp = RouteProp<DemoDrawerStackParam, 'DrawerSettings'>;
type DrawerSettingsNavigationProp = StackNavigationProp<RootStackParam, 'DemoDrawer'>;

export interface DrawerSettingsProps {
    route: DrawerSettingsRouteProp,
    navigation: DrawerSettingsNavigationProp
}

function DrawerSettingsScreen({route, navigation}: DrawerSettingsProps) {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.DrawerSettings');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    return (
        <View style={[containerStyles.Screen, sharedStyles.centralized]}>
            <Text>{st(`title`)}</Text>
            <Text>{route.params.item}</Text>
        </View>
    );
}

export default DrawerSettingsScreen;
