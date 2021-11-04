import {StyleSheet} from 'react-native';

export const getStyleObj = (style: any) => {
    let result;
    if (style) {
        switch (typeof style) {
            case 'number':
                result = StyleSheet.flatten(style);
                break;
            case 'object':
                if (style instanceof Array) {
                    let combineObj = {};
                    for (let key in style) {
                        combineObj = {...combineObj, ...StyleSheet.flatten(style[key])};
                    }
                    result = combineObj;
                } else {
                    result = style;
                }
                break;
            default:
                result = {};
                break;
        }
    }

    return result;
};
