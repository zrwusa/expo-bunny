import {ComponentType} from "react";
import * as Stacks from "../navigation/stacks";
import {Traversable} from "./helpers";
import {StackNavigationOptions} from "@react-navigation/stack";
import {
    DefaultNavigatorOptions, DrawerRouterOptions, EventMapBase,
    RouteConfig, StackRouterOptions, TabRouterOptions
} from "@react-navigation/native";
import {StackNavigationConfig} from "@react-navigation/stack/lib/typescript/src/types";
import {NavigationState, ParamListBase} from "@react-navigation/routers";
import {BottomTabNavigationOptions} from "@react-navigation/bottom-tabs";
import {BottomTabNavigationConfig} from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import {DrawerNavigationOptions} from "@react-navigation/drawer";
import {DrawerNavigationConfig} from "@react-navigation/drawer/lib/typescript/src/types";

export type NavigatorType = 'stack' | 'tab' | 'drawer';

export type LinkingConfig = {
    path?: string,
    exact?: boolean,
    parse?: Record<string, (value: string) => any>,
    stringify?: Record<string, (value: any) => string>,
    initialRouteName?: string,
    name?: string,
    screens?:NavigatorTreeNode[],
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

