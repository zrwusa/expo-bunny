import {ComponentType} from "react";
import * as Stacks from "../navigation/stacks";
import {StackNavigationOptions} from "@react-navigation/stack";
import {
    DefaultNavigatorOptions, DrawerRouterOptions, EventMapBase,
    RouteConfig, StackRouterOptions, TabRouterOptions
} from "@react-navigation/native";
import {StackNavigationConfig} from "@react-navigation/stack/lib/typescript/src/types";
import {NavigationState, ParamListBase} from "@react-navigation/routers";
import {BottomTabNavigationOptions} from "react-navigation-bottom-tabs-no-warnings";
import {BottomTabNavigationConfig} from "react-navigation-bottom-tabs-no-warnings/lib/typescript/src/types";
import {DrawerNavigationOptions} from "react-navigation-drawer-no-warnings";
import {DrawerNavigationConfig} from "react-navigation-drawer-no-warnings/lib/typescript/src/types";

export type NavigatorType = 'stack' | 'tab' | 'drawer';

export type LinkingConfig = {
    path?: string,
    exact?: boolean,
    parse?: Record<string, (value: string) => any>,
    stringify?: Record<string, (value: any) => string>,
    initialRouteName?: string,
    name?: string,
    screens?: NavigatorTreeNode[],
};

export type StackConfig = {
    navigatorType: NavigatorType,
    component?: ComponentType<any>,
    stack?:
        typeof Stacks.RootStack
        | typeof Stacks.DemoNestedLv1Stack
        | typeof Stacks.DemoNestedLv2Stack
        | typeof Stacks.DemoTabStack
        | typeof Stacks.DemoTabRNComponentsStack
        | typeof Stacks.DemoBitcoinStack
        | typeof Stacks.DemoDrawerStack,
    signInComponent?: ComponentType<any>,
    childrenNode?: NavigatorTreeNode[],
}

export type LinkingConfigTraversable = LinkingConfig & Traversable

export type Options = BottomTabNavigationOptions | DrawerNavigationOptions | StackNavigationOptions;
export type OptionsInner = DefaultNavigatorOptions<Options>;

export type NavigatorTreeNode =
    Partial<OptionsInner>
    & Partial<TabRouterOptions>
    & Partial<BottomTabNavigationConfig>

    & Partial<DrawerRouterOptions>
    & Partial<DrawerNavigationConfig>

    & Partial<StackRouterOptions>
    & Partial<StackNavigationConfig>

    & Partial<RouteConfig<ParamListBase, any, NavigationState, {}, EventMapBase>>
    & LinkingConfig
    & StackConfig;

export type RecursiveNavigatorProps = { node: NavigatorTreeNode }

export type DeepLeavesWrap<T, U> = T extends { [key: string]: any } ? { [P in keyof T]: DeepLeavesWrap<T[P], U> }
    : T extends { [key: string]: any } | undefined ? { [P in keyof T]: DeepLeavesWrap<T[P], U> }
        : T extends boolean ? { [M in keyof U]: boolean }
            : T extends string ? { [M in keyof U]: string }
                // Todo : T extends (infer F) ? { [M in keyof U]: F}
                : { [M in keyof U]: T }

export type Traversable = {
    [key: string]: any
}

export type TraversableNested = {
    [key: string]: any
}

export type TypeName<T> = T extends string
    ? "string"
    : T extends number
        ? "number"
        : T extends boolean
            ? "boolean"
            : T extends undefined
                ? "undefined"
                : T extends Function
                    ? "function"
                    : "object";



