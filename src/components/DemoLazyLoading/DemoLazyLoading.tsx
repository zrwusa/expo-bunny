import React from 'react';
import {Text, View} from '../UI'
import {getStyles} from './styles';
import {ActivityIndicator} from 'react-native';
import {useBunnyKit} from '../../hooks/bunny-kit';

export function DemoLazyLoading() {
    const {sizeLabor, themeLabor, t, wp} = useBunnyKit();
    const styles = getStyles(sizeLabor, themeLabor);
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
            <Text>Waiting fro lazy components</Text>
        </View>
    )
}

