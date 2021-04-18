import React from "react";
import {Animated, ImageResizeMode, ImageSourcePropType, ImageStyle, StyleProp, View} from "react-native";
import {WithSizeLabor, withSizeLabor} from "../../providers/size-labor";
import {WithThemeLabor, withThemeLabor} from "../../providers/theme-labor";
import {getStyles} from "./styles";

export interface ImageProgressiveProps extends WithSizeLabor, WithThemeLabor {
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
            sizeLabor,
            themeLabor,
            ...rest
        } = this.props;
        const styles = getStyles(sizeLabor, themeLabor)
        return (
            <View style={styles.ImageProgressive.container}>
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
                    style={[styles.ImageProgressive.imageOverlay, {opacity: this.imageAnimated}, style]}
                    onLoad={this.onImageLoad}
                />
            </View>
        );
    }
}

export default withSizeLabor(withThemeLabor(ImageProgressive));
