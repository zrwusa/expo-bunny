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

export type Config = {
    component?: ComponentType<any>,
    stack?:
        typeof Stacks.RootStack
        | typeof Stacks.DemoNestedStack
        | typeof Stacks.DemoTabStack
        | typeof Stacks.DemoTabRNComponentsStack
        | typeof Stacks.DemoBitcoinStack
        | typeof Stacks.DemoDrawerStack,
    signInComponent?: ComponentType<any>,
    screens?: Screen[],

    path?: string,
    exact?: boolean,
    parse?: Record<string, (value: string) => any>,
    stringify?: Record<string, (value: any) => string>,
    initialRouteName?: string,
    name?: string,
};

export type ConfigTraversable = Config & Traversable

export type Options = BottomTabNavigationOptions | DrawerNavigationOptions | StackNavigationOptions;
export type OptionsInner = DefaultNavigatorOptions<Options>;

export type Screen =
    Partial<OptionsInner>
    & Partial<TabRouterOptions>
    & Partial<BottomTabNavigationConfig>

    & Partial<DrawerRouterOptions>
    & Partial<DrawerNavigationConfig>

    & Partial<StackRouterOptions>
    & Partial<StackNavigationConfig>

    & Partial<RouteConfig<ParamListBase, any, NavigationState, {}, EventMapBase>>
    & Config;

export type RecursiveNavigatorProps = { node: Screen }

