import React from 'react';
import {View, StyleSheet, Animated, ImageSourcePropType, StyleProp, ImageStyle, ImageResizeMode} from 'react-native';

const styles = StyleSheet.create({
    imageOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    container: {
        backgroundColor: '#e1e4e8',
    },
});
export type ImageProgressiveProps = {
    sourcePH: ImageSourcePropType,
    source: ImageSourcePropType,
    style: StyleProp<ImageStyle>,
    resizeMode: ImageResizeMode
}

class ImageProgressive extends React.Component<ImageProgressiveProps> {
    thumbnailAnimated = new Animated.Value(0);

    imageAnimated = new Animated.Value(0);

    handleThumbnailLoad = () => {
        Animated.timing(this.thumbnailAnimated, {
            useNativeDriver: true,
            toValue: 1,
        }).start();
    }

    onImageLoad = () => {
        Animated.timing(this.imageAnimated, {
            useNativeDriver: true,
            toValue: 1,
        }).start();
    }

    render() {
        const {
            sourcePH,
            source,
            style,
            ...rest
        } = this.props;

        return (
            <View style={styles.container}>
                <Animated.Image
                    {...rest}
                    source={sourcePH}
                    style={[style, {opacity: this.thumbnailAnimated}]}
                    onLoad={this.handleThumbnailLoad}
                    blurRadius={1}
                />
                <Animated.Image
                    {...rest}
                    source={source}
                    style={[styles.imageOverlay, {opacity: this.imageAnimated}, style]}
                    onLoad={this.onImageLoad}
                />
            </View>
        );
    }
}

export default ImageProgressive;
