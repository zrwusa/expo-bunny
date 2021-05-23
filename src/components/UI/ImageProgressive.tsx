import React from "react";
import {Animated, ImageResizeMode, ImageSourcePropType, ImageStyle, StyleProp, View} from "react-native";
import {getStyles} from "./styles";
import config from "../../config";
import {WithBunnyKit, withBunnyKit} from "../../hooks/bunny-kit";

export interface ImageProgressiveProps extends WithBunnyKit {
    previewSource: ImageSourcePropType,
    source: ImageSourcePropType,
    style: StyleProp<ImageStyle>,
    resizeMode: ImageResizeMode
}

class ImageProgressive extends React.Component<ImageProgressiveProps> {
    thumbnailAnimated = new Animated.Value(0);
    imageAnimated = new Animated.Value(0);

    handleThumbnailLoad = () => {
        Animated.timing(this.thumbnailAnimated, {
            useNativeDriver: config.useNativeDriver,
            toValue: 1,
        }).start();
    }

    onImageLoad = () => {
        Animated.timing(this.imageAnimated, {
            useNativeDriver: config.useNativeDriver,
            toValue: 1,
        }).start();
    }

    render() {
        const {
            previewSource,
            source,
            style,
            bunnyKit,
            ...rest
        } = this.props;
        const {sizeLabor, themeLabor} = bunnyKit;
        const styles = getStyles(sizeLabor, themeLabor)
        return (
            <View style={styles.ImageProgressive.container}>
                <Animated.Image
                    {...rest}
                    source={previewSource}
                    style={[style, {opacity: this.thumbnailAnimated}]}
                    onLoad={this.handleThumbnailLoad}
                    blurRadius={1}
                />
                <Animated.Image
                    {...rest}
                    source={source}
                    style={[styles.ImageProgressive.imageOverlay, {opacity: this.imageAnimated}, style]}
                    onLoad={this.onImageLoad}
                />
            </View>
        );
    }
}

export default withBunnyKit(ImageProgressive);
