import {Animated, FlatList, FlatListProps} from "react-native";
import * as React from "react";
import {MasonryDatum} from "../../types";

export const AnimatedFlatListMasonryDatum = Animated.createAnimatedComponent<React.ComponentType<FlatListProps<MasonryDatum>>>(FlatList)
