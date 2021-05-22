import * as React from "react";
import {Image as RNImage, ImageProps, ImageURISource} from "react-native";
import imageCacheManager from "./CacheManager";


export interface CashedImageProps extends ImageProps {
    source: ImageURISource;
}

interface CashedImageState {
    sourceState: ImageURISource;
}

export class CachedImage extends React.Component<CashedImageProps, CashedImageState> {
    private mounted = false;

    static defaultProps = {};

    state = {
        sourceState: {uri: ''}
    };

    constructor(props: CashedImageProps) {
        super(props);
    }

    async componentDidMount() {
        this.mounted = true;
        await this.load();
    }

    async componentDidUpdate(prevProps: CashedImageProps, prevState: CashedImageState) {
        const {source: newSource} = this.props;
        if (newSource.uri !== prevProps.source.uri) {
            await this.load();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    async load() {
        const {source, onError} = this.props;
        if (source?.uri) {
            try {
                const cacheLabor = imageCacheManager.getCacheLabor(source.uri);
                cacheLabor.register(
                    (path) => {
                        if (this.mounted) {
                            if (path) {
                                this.setState({sourceState: {uri: path}});
                            }
                        }
                    }, (progress) => {
                    });
            } catch (error) {
                onError?.(error);
            }
        }
    }

    render() {
        const {source, ...rest} = this.props;
        const {sourceState} = this.state;
        const isImageReady = sourceState && sourceState?.uri;
        return isImageReady
            ? <RNImage source={sourceState} {...rest} />
            : null
    }
}


