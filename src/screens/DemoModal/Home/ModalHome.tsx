import * as React from 'react';
import {View} from '../../../components/UI';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {shortenTFunctionKey} from '../../../providers/i18n-labor';
import {ScrollView} from 'react-native';
import {DemoModalStackParam} from '../../../types';
import {getContainerStyles} from '../../../containers';
import {getSharedStyles} from '../../../helpers';
import {useBunnyKit} from '../../../hooks/bunny-kit';

type ModalHomeRouteProp = RouteProp<DemoModalStackParam, 'ModalHome'>;
type ModalHomeNavigationProp = StackNavigationProp<DemoModalStackParam, 'ModalHome'>;

export interface ModalHomeProps {
    route: ModalHomeRouteProp;
    navigation: ModalHomeNavigationProp;
}

function ModalHomeScreen({route, navigation}: ModalHomeProps) {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.ModalHome');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);

    return (
        <ScrollView>
            <View style={[containerStyles.Screen, sharedStyles.centralized]}>
            </View>
        </ScrollView>
    )
}

export default ModalHomeScreen;
