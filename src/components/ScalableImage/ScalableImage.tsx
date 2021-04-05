import * as React from "react";
import {Image, ImageStyle, StyleProp} from "react-native";

export interface ScalableImageProps {
    uri: string
    width?: number
    height?: number
    style?: StyleProp<ImageStyle>;
}

interface ScalableImageState {
    source: {}
    width: number
    height: number
}

export class ScaledImage extends React.PureComponent<ScalableImageProps, ScalableImageState> {
    constructor(props: ScalableImageProps) {
        super(props)
        this.state = {
            source: {uri: this.props.uri},
            width: 0,
            height: 0,
        }
    }

    componentDidMount() {
        const {uri} = this.props
        const propWidth = this.props.width;
        const propHeight = this.props.height;

        // const ratio = 9 / 16
        // if (propWidth) {
        //     this.setState({
        //         width: propWidth,
        //         height: propWidth / ratio
        //     })
        // } else if (propHeight) {
        //     this.setState({
        //         width: propHeight * ratio,
        //         height: propHeight
        //     })
        // } else {
        //     this.setState({
        //         width: 100,
        //         height: 100 / ratio
        //     })
        // }

        Image.getSize(uri, (width, height) => {
            if (propWidth && !propHeight) {
                this.setState({width: propWidth, height: height * (propWidth / width)})
            } else if (!propWidth && propHeight) {
                this.setState({width: width * (propHeight / height), height: propHeight})
            } else {
                this.setState({width: width, height: height})
            }
        }, (error) => {
            throw error
        })
    }


    render() {
        const {style} = this.props;
        const {source, height, width} = this.state;
        return <Image source={source} style={[style, {height: height, width: width}]}/>
    }
}


// import {useEffect, useState} from "react";

// export function ScaledImage(props: ScalableImageProps) {
//     const [width, setWidth] = useState(0)
//     const [height, setHeight] = useState(0)
//     const [uri, setURI] = useState('')
//
//     useEffect(() => {
//         setURI(props.uri)
//         Image.getSize(props.uri, (width, height) => {
//             if (props.width && !props.height) {
//                 setWidth(props.width)
//                 setHeight(height * (props.width / width))
//             } else if (!props.width && props.height) {
//                 setWidth(width * (props.height / height))
//                 setHeight(props.height)
//             } else {
//                 setWidth(width)
//                 setHeight(height)
//             }
//         }, (error) => {
//             throw error
//         })
//     }, [])
//
//     return <Image source={{uri: uri}} style={[props.style, {height: height, width: width}]}/>
//     // return <Image source={{uri:props.uri}} style={{width:100,height:100}} />
//
// }
