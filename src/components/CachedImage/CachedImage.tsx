import * as _ from "lodash";
import * as React from "react";
import {Animated, Image as RNImage, ImageSourcePropType, ImageStyle, ImageURISource, Platform, StyleProp, StyleSheet, View} from "react-native";
import {BlurView} from "expo-blur";

import imageCacheManager from "./CacheManager";
import {DownloadOptions} from "expo-file-system";

const black = 'black';
const white = 'white';
const propsToCopy = [
    'borderRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius'
];
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);


interface CashedImageProps {
    style?: StyleProp<ImageStyle>;
    defaultSource?: ImageURISource | number;
    preview?: ImageSourcePropType;
    options?: DownloadOptions;
    uri: string;
    transitionDuration?: number;
    tint?: 'dark' | 'light';
    onError: (error: { nativeEvent: { error: Error } }) => void;
}

interface CashedImageState {
    uri: string | undefined;
    intensity: Animated.Value;
}

export class CachedImage extends React.Component<CashedImageProps, CashedImageState> {
    mounted = false;

    static defaultProps = {
        transitionDuration: 300,
        tint: 'light',
        onError: () => {
        }
    };

    state = {
        uri: undefined,
        intensity: new Animated.Value(100)
    };

    constructor(props: CashedImageProps) {
        super(props);
    }

    async componentDidMount() {
        this.mounted = true;
        await this.load(this.props);
    }

    async componentDidUpdate(prevProps: CashedImageProps, prevState: CashedImageState) {
        const {preview, transitionDuration, uri: newURI} = this.props;
        const {uri, intensity} = this.state;
        if (newURI !== prevProps.uri) {
            await this.load(this.props);
        } else if (uri && preview && prevState.uri === undefined) {
            Animated.timing(intensity, {
                duration: transitionDuration,
                toValue: 0,
                useNativeDriver: Platform.OS === 'android'
            }).start();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    async load({uri, options = {}, onError}: CashedImageProps): Promise<void> {
        if (uri) {
            try {
                const cacheLabor = imageCacheManager.getCacheLabor(uri, options);
                cacheLabor.register(
                    (path) => {
                        if (this.mounted) {
                            if (path) {
                                this.setState({uri: path});
                            } else {
                                onError({nativeEvent: {error: new Error('Could not load image')}});
                            }
                        }
                    }, (progress) => {
                    });

            } catch (error) {
                onError({nativeEvent: {error}});
            }
        }
    }

    render() {
        const {preview, style, defaultSource, tint = 'light', ...otherProps} = this.props;
        const {uri, intensity} = this.state;
        const isImageReady = !!uri;
        const opacity = intensity.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 0.5]
        });
        const flattenedStyle = StyleSheet.flatten(style);
        const computedStyle: StyleProp<ImageStyle> = [
            StyleSheet.absoluteFill,
            _.transform(_.pickBy(flattenedStyle, (_val, key) => propsToCopy.indexOf(key) !== -1), (result, value: any, key) =>
                Object.assign(result, {[key]: value - (flattenedStyle.borderWidth || 0)})
            )
        ];
        return (
            <View {...{style}}>
                {
                    !!defaultSource && !isImageReady
                        ? <RNImage source={defaultSource} style={computedStyle} {...otherProps} />
                        : null
                }
                {
                    !!preview ?
                        <RNImage
                            source={preview}
                            style={computedStyle}
                            blurRadius={Platform.OS === 'android' ? 0.5 : 0}
                            {...otherProps}
                        />
                        : null
                }
                {isImageReady
                    ? <RNImage source={{uri: uri}} style={computedStyle} {...otherProps} />
                    : null
                }
                {
                    !!preview && Platform.OS === 'ios'
                        ? <AnimatedBlurView style={computedStyle} tint={tint} intensity={intensity}/>
                        : null
                }
                {
                    !!preview && Platform.OS === 'android'
                        ? <Animated.View style={[computedStyle, {backgroundColor: tint === 'dark' ? black : white, opacity}]}/>

                        : null
                }
            </View>
        );
    }
}


