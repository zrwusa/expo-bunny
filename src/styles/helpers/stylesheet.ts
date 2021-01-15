import {StyleSheet} from "react-native";

export const getStyleObj = (style: any) => {
    let result;
    switch (typeof style) {
        case "number":
            result = StyleSheet.flatten(style) as {}
            break;
        case "object":
            if (style instanceof Array) {
                let combineObj = {};
                style.forEach((key) => {
                    combineObj = {...combineObj, ...style[key]}
                })
                result = combineObj;
            } else {
                result = style;
            }
            break;
        default:
            result = {}
            break;
    }
    return result
}
