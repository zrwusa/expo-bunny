import React from 'react';
import {getStyles} from './styles';
import {ActivityIndicator, Text, View} from 'react-native';

export interface PreparingProps {
    text?: string
}

export const Preparing = (props: PreparingProps) => {
    const {text = ''} = props;

    const styles = getStyles();
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
            {text
                ? <Text style={styles.text}>
                    {text}
                </Text>
                : null
            }
        </View>
    )
}
