import {NavigationAction} from "@react-navigation/core";
import React from "react";
import {GestureResponderEvent, TextProps} from "react-native";

export type LinkProps = {
    to: string;
    action?: NavigationAction;
    target?: string;
    onPress?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void;
} & (TextProps & {
    children: React.ReactNode;
});


export type MasonryDatum<BrickT> = {
    id: string,
    column1: BrickT[],
    column2: BrickT[],
    column3: BrickT[],
}


export type PickerSelectorItem<T> = {
    label: string;
    value: T;
    key?: string | number;
    color?: string;
    inputLabel?: string;
}

