import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "react-navigation-bottom-tabs-no-warnings";
import {createDrawerNavigator} from "react-navigation-drawer-no-warnings";
import {
    DemoCryptoCurrencyStackParam,
    DemoDrawerStackParam,
    DemoIGStackParam,
    DemoNestedLv1StackParam,
    DemoNestedLv2StackParam,
    DemoTabRNComponentsStackParam,
    DemoTabStackParam,
    RootStackParam
} from "../../types";

export const RootStack = createStackNavigator<RootStackParam>();

export const DemoTabStack = createBottomTabNavigator<DemoTabStackParam>();

export const DemoModalStack = createStackNavigator<RootStackParam>();

export const DemoNestedLv1Stack = createStackNavigator<DemoNestedLv1StackParam>();

export const DemoNestedLv2Stack = createStackNavigator<DemoNestedLv2StackParam>();

export const DemoDrawerStack = createDrawerNavigator<DemoDrawerStackParam>();

export const DemoTabRNComponentsStack = createBottomTabNavigator<DemoTabRNComponentsStackParam>();

export const DemoCryptoCurrencyStack = createBottomTabNavigator<DemoCryptoCurrencyStackParam>();

export const DemoIGStack = createBottomTabNavigator<DemoIGStackParam>();
