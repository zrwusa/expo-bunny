import React from 'react';
import {getStyles} from './styles';
import {IcoMoon} from '../UI';
import {LinearGradientIconProps} from './LinearGradientIcon';
import {useBunnyKit} from '../../hooks/bunny-kit';

export function LinearGradientIcon(props: LinearGradientIconProps) {
    const {sizeLabor, themeLabor, wp} = useBunnyKit();
    const {name, size, colors} = props;
    const {theme} = themeLabor;
    const {designsBasedOn} = sizeLabor
    const finalSize = size || wp(20),
        colorsDefault = [theme.colors.backgroundBtn, theme.colors.backgroundBtn2];
    const styles = getStyles(sizeLabor, themeLabor)
    return (
        <IcoMoon
            name={name}
            size={finalSize}
            color={colors ? colors[0] : colorsDefault[0]}
        />
    )
}
