import * as React from "react"
import {Image} from "react-native"
import {CashedImageProps} from "./CachedImage";

export const CachedImage = ({source, ...rest}: CashedImageProps) => {
    return <Image source={source} {...rest} />
}
