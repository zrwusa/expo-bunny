import {Text, View} from '../../components/UI';
import * as React from 'react';
import {useSizeLabor, useThemeLabor} from '../../providers';
import {getContainerStyles} from '../styles';

export interface InputCardProps {
    title: string,
    children: React.ReactNode
}

export const InputCard = ({title, children}: InputCardProps) => {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    return <View style={containerStyles.InputCard}>
        <Text style={containerStyles.InputCardTitle}>{title}</Text>
        {children}
    </View>;
};
