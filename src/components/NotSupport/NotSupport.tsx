import React from 'react';
import {makeStyles} from './styles';
import {Text, View} from 'react-native';
import {useBunnyKit} from '../../hooks/bunny-kit';

export interface NotSupportProps {
    text?: string | JSX.Element;
}

export const NotSupport = (props: NotSupportProps) => {
    const {sizeLabor, themeLabor} = useBunnyKit();
    const {text} = props;
    const styles = makeStyles(sizeLabor, themeLabor);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};
