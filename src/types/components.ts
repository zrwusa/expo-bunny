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
