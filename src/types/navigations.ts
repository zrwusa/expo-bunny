// Navigations
import * as Stacks from "../navigation/stacks";
import {
    DefaultNavigatorOptions,
    DrawerRouterOptions,
    EventMapBase,
    RouteConfig,
    StackRouterOptions,
    TabRouterOptions
} from "@react-navigation/native";
import {ComponentType} from "react";
import {StackNavigationOptions} from "@react-navigation/stack";
import {MaterialTopTabNavigationOptions} from "@react-navigation/material-top-tabs";
import {StackNavigationConfig} from "@react-navigation/stack/lib/typescript/src/types";
import {NavigationState, ParamListBase, Route} from "@react-navigation/routers";
import {BottomTabNavigationOptions} from "@react-navigation/bottom-tabs";
import {DrawerNavigationOptions} from "@react-navigation/drawer";
import {BottomTabNavigationConfig} from "@react-navigation/bottom-tabs/src/types";
import {DrawerNavigationConfig} from "@react-navigation/drawer/src/types";

export type RootStackParam = {
    Home: undefined;
    Auth: undefined | { screen: string; params?: { [key: string]: any } };
    Profile: { id: string };
    DemoModal: undefined | { screen: string; params?: { [key: string]: any } };
    DemoFCReduxHook: undefined;
    DemoCollection: undefined;
    DemoRoute: { id: string, isHuman: boolean, sort?: 'latest' | 'top' };
    DemoThirdPart: undefined;
    DemoThunkCC: undefined;
    DemoSaga: undefined;
    DemoMap: undefined;
    DemoChat: undefined;
    DemoTab: undefined | { screen: string; params?: { [key: string]: any } };
    DemoDrawer: undefined | { screen: string; params?: { [key: string]: any } };
    DemoNestedLv0: undefined | { screen: string; params?: { [key: string]: any } };
    DemoRNComponents: undefined;
    DemoShare: undefined;
    DemoNotification: undefined;
    DemoTheme: undefined;
    DemoSuspense: undefined;
    DemoCryptoCurrency: undefined | { screen: string; params?: { [key: string]: any } };
    DemoSocialMedia: undefined | { screen: string; params?: { [key: string]: any } };
    DemoSearch: undefined | { keyword: string };
    Playground: undefined;
    ColorFinder: undefined;
    IconTools: undefined;
    DemoHealth: undefined | { screen: string; params?: { [key: string]: any } };
    DemoSagaFirebase: undefined;
    Settings: undefined;
};

export type DemoTabStackParam = {
    TabHome: undefined;
    TabSettings: { item: string };
};

export type DemoSocialMediaStackParam = {
    SocialMediaHome: undefined;
    SocialMediaSearch: { keyword: string };
    SocialMediaVideo: undefined;
    SocialMediaSettings: { item: string };
};

export type AuthTopStackParam = {
    Login: undefined | { reference: string };
    SignUp: undefined | { reference: string };
};

export type DemoDrawerStackParam = {
    DrawerHome: undefined;
    DrawerSettings: { item: string };
};

export type DemoTabRNComponentsStackParam = {
    RNHome: undefined;
    RNFlatList: undefined;
    RNNoKeyboard: undefined;
    RNSafeArea: undefined;
    RNSectionList: undefined;
    RNVirtualizedList: undefined;
};

export type DemoNestedLv1StackParam = {
    NestedLv1Home: undefined;
    NestedLv1Settings: { item: string };
};

export type DemoNestedLv2StackParam = {
    NestedLv2Home: undefined;
    NestedLv2Settings: { itemlv2: string };
};

export type DemoModalStackParam = {
    ModalHome: undefined;
};


export type DemoCryptoCurrencyStackParam = {
    CryptoCurrencyHome: undefined;
    CryptoCurrencyAlert: { isPush: boolean };
};

export type DemoHealthTabStackParam = {
    HealthHome: undefined;
    HealthSettings: undefined;
};
export type RouteBase = Route<string, object | undefined>

export type NavigationStackParamsUnion = RootStackParam
    | DemoTabStackParam
    | DemoDrawerStackParam
    | DemoTabRNComponentsStackParam
    | DemoNestedLv1StackParam
    | DemoNestedLv2StackParam
    | DemoCryptoCurrencyStackParam
    | DemoModalStackParam
    | DemoHealthTabStackParam
    | DemoSocialMediaStackParam
    | AuthTopStackParam

export type NavigationStackParamsIntersection = RootStackParam
    & DemoTabStackParam
    & DemoDrawerStackParam
    & DemoTabRNComponentsStackParam
    & DemoNestedLv1StackParam
    & DemoNestedLv2StackParam
    & DemoCryptoCurrencyStackParam
    & DemoModalStackParam
    & DemoHealthTabStackParam
    & DemoSocialMediaStackParam
    & AuthTopStackParam

export type NavigationStacksUnion = typeof Stacks.RootStack
    | typeof Stacks.DemoNestedLv1Stack
    | typeof Stacks.DemoNestedLv2Stack
    | typeof Stacks.DemoTabStack
    | typeof Stacks.DemoTabRNComponentsStack
    | typeof Stacks.DemoCryptoCurrencyStack
    | typeof Stacks.DemoDrawerStack
    | typeof Stacks.DemoModalStack
    | typeof Stacks.DemoHealthTabStack
    | typeof Stacks.DemoSocialMediaStack
    | typeof Stacks.AuthTopTabStack

export type NavigationStacksIntersection = typeof Stacks.RootStack
    & typeof Stacks.DemoNestedLv1Stack
    & typeof Stacks.DemoNestedLv2Stack
    & typeof Stacks.DemoTabStack
    & typeof Stacks.DemoTabRNComponentsStack
    & typeof Stacks.DemoCryptoCurrencyStack
    & typeof Stacks.DemoDrawerStack
    & typeof Stacks.DemoModalStack
    & typeof Stacks.DemoHealthTabStack
    & typeof Stacks.DemoSocialMediaStack
    & typeof Stacks.AuthTopTabStack


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
    stack?: NavigationStacksUnion
    authScreen?: ComponentType<any>,
    childrenNode?: NavigatorTreeNode[],
    authRequired: boolean,
}


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
