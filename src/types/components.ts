import {NavigationAction} from '@react-navigation/core';
import React from 'react';
import {GestureResponderEvent, TextProps} from 'react-native';

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


export type renderFunction = (x: any) => JSX.Element;

export interface Reply {
    title: string;
    value: string;
    messageId?: any;
}

export interface QuickReplies {
    type: 'radio' | 'checkbox';
    values: Reply[];
    keepIt?: boolean;
}

export interface BunnyChatUser {
    _id: string | number;
    name?: string;
    avatar?: string | renderFunction;
}

export interface BunnyChatMessage {
    _id: string | number;
    text: string;
    createdAt: Date | number;
    user: BunnyChatUser;
    image?: string;
    video?: string;
    audio?: string;
    system?: boolean;
    sent?: boolean;
    received?: boolean;
    pending?: boolean;
    quickReplies?: QuickReplies;
}

export type Sticker = {
    url: string,
    id: string
}

