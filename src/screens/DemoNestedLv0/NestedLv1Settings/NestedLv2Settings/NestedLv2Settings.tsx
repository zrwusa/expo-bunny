import * as React from 'react';
import {ButtonTO, InButtonText, View} from '../../../../components/UI';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DemoNestedLv2StackParam} from '../../../../types';
import {shortenTFunctionKey} from '../../../../providers';
import {getContainerStyles} from '../../../../containers';
import {getSharedStyles} from '../../../../helpers';
import {useBunnyKit} from '../../../../hooks';

type NestedLv2SettingsRouteProp = RouteProp<DemoNestedLv2StackParam, 'NestedLv2Settings'>;
type NestedLv2SettingsNavigationProp = StackNavigationProp<DemoNestedLv2StackParam, 'NestedLv2Settings'>;

export interface NestedLv2SettingsProps {
    route: NestedLv2SettingsRouteProp,
    navigation: NestedLv2SettingsNavigationProp
}

function NestedLv2SettingsScreen({route, navigation}: NestedLv2SettingsProps) {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.NestedLv2Settings');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);

    return (
        <View style={[containerStyles.Screen, sharedStyles.centralized]}>
            <ButtonTO onPress={() => navigation.navigate('NestedLv2Home')}>
                <InButtonText>{st(`goToNestedLv2Home`)}</InButtonText>
            </ButtonTO>
        </View>
    );
}


export default NestedLv2SettingsScreen;
