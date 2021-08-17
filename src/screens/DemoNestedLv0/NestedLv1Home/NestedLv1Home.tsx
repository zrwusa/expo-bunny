import * as React from 'react';
import {ButtonTO, InButtonText, View} from '../../../components/UI';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DemoNestedLv1StackParam} from '../../../types';
import {shortenTFunctionKey} from '../../../providers/i18n-labor';
import {getContainerStyles} from '../../../containers';
import {getSharedStyles} from '../../../helpers';
import {useBunnyKit} from '../../../hooks/bunny-kit';

type NestedLv1HomeRouteProp = RouteProp<DemoNestedLv1StackParam, 'NestedLv1Home'>;
type NestedLv1HomeNavigationProp = StackNavigationProp<DemoNestedLv1StackParam, 'NestedLv1Home'>;

export interface NestedLv1HomeProps {
    route: NestedLv1HomeRouteProp,
    navigation: NestedLv1HomeNavigationProp
}

function NestedLv1HomeScreen({route, navigation}: NestedLv1HomeProps) {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.NestedLv1Home');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);

    return (
        <View style={[containerStyles.Screen, sharedStyles.centralized]}>
            <ButtonTO onPress={() => navigation.navigate('NestedLv1Settings', {item: '001'})}>
                <InButtonText>{st(`goToNestedLv1Settings`)}</InButtonText>
            </ButtonTO>
        </View>
    );
}


export default NestedLv1HomeScreen;
