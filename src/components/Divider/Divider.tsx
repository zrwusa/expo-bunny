import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {getStyles} from './styles';
import {SizeKeys} from '../../types';
import {useBunnyKit} from '../../hooks';

export interface DividerProps {
    isVertical?: boolean,
    size?: SizeKeys,
    style?: StyleProp<ViewStyle>
}

export type SizeVerticalMap = {
    [key in SizeKeys]: number
}

export function Divider(props: DividerProps) {
    const {sizeLabor, themeLabor, wp} = useBunnyKit();
    const styles = getStyles(sizeLabor, themeLabor);
    const {isVertical, size, style} = props;
    const sizeVerticalMap: SizeVerticalMap = {
        xxs: wp(6),
        xs: wp(10),
        s: wp(14),
        m: wp(18),
        l: wp(22),
        xl: wp(30),
        xxl: wp(40)
    };

    const mergeStyleHorizontal: StyleProp<ViewStyle> = [
        styles.horizontal,
        style
    ];
    const mergeStyleVertical: StyleProp<ViewStyle> = [
        styles.vertical,
        style
    ];
    return isVertical
        ? <View style={[mergeStyleVertical, {height: size ? sizeVerticalMap[size] : wp(6)}]}/>
        : <View style={mergeStyleHorizontal}/>;
}
