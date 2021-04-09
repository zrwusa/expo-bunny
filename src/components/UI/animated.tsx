import {Animated, FlatList, FlatListProps} from "react-native";
import * as React from "react";
import {ComponentType} from "react";

export const AnimatedFlatList = <T extends object>() => {
    return Animated.createAnimatedComponent<ComponentType<FlatListProps<T>>>(FlatList)
}

