import {Text, View} from '../../components/UI';
import * as React from 'react';
import {useSizeLabor} from '../../providers/size-labor';
import {useThemeLabor} from '../../providers/theme-labor';
import {makeContainerStyles} from '../styles';

export interface InputCardProps {
    title: string,
    children: React.ReactNode
}

export const InputCard = ({title, children}: InputCardProps) => {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = makeContainerStyles(sizeLabor, themeLabor);
    return <View style={containerStyles.InputCard}>
        <Text style={containerStyles.InputCardTitle}>{title}</Text>
        {children}
    </View>;
};
