import {ComponentType} from "react";
import * as Stacks from "../navigation/stacks";
import {StackNavigationOptions} from "@react-navigation/stack";
import {
    DefaultNavigatorOptions,
    DrawerRouterOptions,
    EventMapBase,
    RouteConfig,
    StackRouterOptions,
    TabRouterOptions,
} from "@react-navigation/native";
import {StackNavigationConfig} from "@react-navigation/stack/lib/typescript/src/types";
import {NavigationState, ParamListBase} from "@react-navigation/routers";
import {BottomTabNavigationOptions} from "react-navigation-bottom-tabs-no-warnings";
import {BottomTabNavigationConfig} from "react-navigation-bottom-tabs-no-warnings/lib/typescript/src/types";
import {DrawerNavigationOptions} from "react-navigation-drawer-no-warnings";
import {DrawerNavigationConfig} from "react-navigation-drawer-no-warnings/lib/typescript/src/types";
import {MaterialTopTabNavigationOptions} from "@react-navigation/material-top-tabs";
import {MaterialTopTabNavigationConfig} from "@react-navigation/material-top-tabs/lib/typescript/src/types";

export type NavigatorType = 'stack' | 'tab' | 'drawer' | 'top';

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
    key: string,
    navigatorType: NavigatorType,
    component?: ComponentType<any>,
    stack?:
        typeof Stacks.RootStack
        | typeof Stacks.DemoNestedLv1Stack
        | typeof Stacks.DemoNestedLv2Stack
        | typeof Stacks.DemoTabStack
        | typeof Stacks.DemoTabRNComponentsStack
        | typeof Stacks.DemoCryptoCurrencyStack
        | typeof Stacks.DemoDrawerStack
        | typeof Stacks.DemoCryptoCurrencyHomeTopStack,
    authScreen?: ComponentType<any>,
    childrenNode?: NavigatorTreeNode[],
    authRequired: boolean,
}

export type LinkingConfigTraversable = LinkingConfig & Traversable

export type Options = BottomTabNavigationOptions | DrawerNavigationOptions | StackNavigationOptions | MaterialTopTabNavigationOptions;
export type OptionsInner = DefaultNavigatorOptions<Options>;
export type NavigatorTreeNode =
    Partial<OptionsInner>
    & Partial<TabRouterOptions>
    & Partial<BottomTabNavigationConfig>

    & Partial<DrawerRouterOptions>
    & Partial<DrawerNavigationConfig>

    & Partial<StackRouterOptions>
    & Partial<StackNavigationConfig>

    // & Partial<TabRouterOptions>
    // & Partial<MaterialTopTabNavigationConfig>

    & Partial<RouteConfig<ParamListBase, any, NavigationState, {}, EventMapBase>>
    & LinkingConfig
    & StackConfig;

export type RecursiveNavigatorProps = { node: NavigatorTreeNode }

export type DeepLeavesWrap<T, U> = T extends { [key: string]: any } ? { [P in keyof T]: DeepLeavesWrap<T[P], U> }
    : T extends { [key: string]: any } | undefined ? { [P in keyof T]: DeepLeavesWrap<T[P], U> }
        : T extends boolean ? { [M in keyof U]: boolean }
            : T extends string ? { [M in keyof U]: string }
                // Todo : T extends (infer F) ? { [M in keyof U]: F}
                : { [M in keyof U]: T };

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

export type JsonKeys<T> = keyof {
    [P in keyof T]: number
}

const arr = ["1", 2, 4, 5, 6] as const;
type Range = typeof arr[number];
const a: Range = 2;


/**
 * A function that emits a side effect and does not return anything.
 */
export type Procedure = (...args: any[]) => void;

export type DebounceOptions = {
    isImmediate?: boolean;
    maxWait?: number;
};

export interface DebouncedFunction<F extends Procedure> {
    (this: ThisParameterType<F>, ...args: Parameters<F>): void;

    cancel: () => void;
}



