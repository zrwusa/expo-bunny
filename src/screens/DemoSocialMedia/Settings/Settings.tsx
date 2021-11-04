import * as React from 'react';
import {Text} from '../../../components/UI';
import {RouteProp} from '@react-navigation/native';
import {DemoSocialMediaTabStackParam, RootStackParam} from '../../../types';
import {shortenTFunctionKey} from '../../../providers';
import {Card, getContainerStyles} from '../../../containers';
import {SafeAreaView} from 'react-native';
import {getStyles} from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {useBunnyKit} from '../../../hooks';


type SocialMediaSettingsRouteProp = RouteProp<DemoSocialMediaTabStackParam, 'SocialMediaSettings'>;
type SocialMediaSettingsNavigationProp = StackNavigationProp<RootStackParam, 'DemoSocialMedia'>;

export interface SocialMediaSettingsProps {
    route: SocialMediaSettingsRouteProp,
    navigation: SocialMediaSettingsNavigationProp
}

export function SocialMediaSettingsScreen({route, navigation}: SocialMediaSettingsProps) {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.SocialMediaSettings');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);

    return (
        <SafeAreaView style={containerStyles.Screen}>
            <Card title={st(`title`)}>
                <Text>{route.params.item}</Text>
            </Card>
        </SafeAreaView>
    );
}
