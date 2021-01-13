import {StyleSheet} from "react-native";

export const getStyleObj = (style: any) => (typeof style === 'number' ? StyleSheet.flatten(style) : style) as {}
