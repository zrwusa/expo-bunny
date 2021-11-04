import React from 'react';
import {Image, ImageSourcePropType, ImageStyle, ImageURISource, StyleProp} from 'react-native';
import {getStyles} from './styles';
import {SizeKeys} from '../../types';
import {ImageUploader, ImageUploaderProps} from '../ImageUploader';
import {useBunnyKit} from '../../hooks';

export interface AvatarProps {
    source: ImageSourcePropType,
    size?: SizeKeys,
    style?: StyleProp<ImageStyle>,
    shouldUpload?: boolean,
    uploaderProps?: ImageUploaderProps,
    isBorder?: boolean
}

export type SizeAvatarMap = {
    [key in SizeKeys]: number
}

export function Avatar(props: AvatarProps) {
    const {sizeLabor, themeLabor, wp} = useBunnyKit();
    const styles = getStyles(sizeLabor, themeLabor);
    const {size, source, style, shouldUpload = false, uploaderProps, isBorder = true} = props;
    const finalSize: SizeKeys = size || 'm';
    const sizeAvatarMap: SizeAvatarMap = {
        xxs: wp(16),
        xs: wp(20),
        s: wp(26),
        m: wp(32),
        l: wp(40),
        xl: wp(56),
        xxl: wp(78)
    };
    const borderDiff: number = isBorder ? wp(2) : 0;
    const borderWidth: number = isBorder ? wp(1) : 0;

    return shouldUpload
        ?
        <ImageUploader
            style={[styles.Avatar, {
                borderWidth,
                width: sizeAvatarMap[finalSize],
                height: sizeAvatarMap[finalSize],
                borderRadius: sizeAvatarMap[finalSize] / 2,
            }]}
            imageStyle={[{
                width: sizeAvatarMap[finalSize] - borderDiff,
                height: sizeAvatarMap[finalSize] - borderDiff,
                borderRadius: sizeAvatarMap[finalSize] / 2,
            }, style]}
            width={sizeAvatarMap[finalSize] - borderDiff}
            height={sizeAvatarMap[finalSize] - borderDiff}
            source={source as ImageURISource}
            {...uploaderProps}
        />
        : <Image
            style={[styles.Avatar, {
                borderWidth,
                width: sizeAvatarMap[finalSize],
                height: sizeAvatarMap[finalSize],
                borderRadius: sizeAvatarMap[finalSize] / 2,
            }, style]}
            width={sizeAvatarMap[finalSize]}
            height={sizeAvatarMap[finalSize]}
            source={source}/>;
}
