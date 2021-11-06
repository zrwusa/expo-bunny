import React from 'react';
import {Text, View} from '../UI';
import {makeStyles} from './styles';
import {useBunnyKit} from '../../hooks/bunny-kit';

interface Props {
    title: string;
}

export const DemoLazy = (props: Props) => {
    const {sizeLabor, themeLabor} = useBunnyKit();
    const styles = makeStyles(sizeLabor, themeLabor);
    return (
        <View>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    );
};
