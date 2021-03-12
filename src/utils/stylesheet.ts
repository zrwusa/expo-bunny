import {StyleSheet} from "react-native";

export const getStyleObj = (style: any) => {
    let result;
    if (style) {
        // console.log('---typeof style,style',typeof style,style)
        switch (typeof style) {
            case 'number':
                result = StyleSheet.flatten(style)
                // console.log('---result',result)
                break;
            case 'object':
                if (style instanceof Array) {
                    let combineObj = {};
                    for (let key in style) {
                        console.log(style[key], StyleSheet.flatten(style[key]))
                        combineObj = {...combineObj, ...StyleSheet.flatten(style[key])}
                    }
                    result = combineObj;
                } else {
                    result = style
                }
                break;
            default:
                result = {}
                // console.log('---flatten not match')
                break;
        }
    }

    return result
}
