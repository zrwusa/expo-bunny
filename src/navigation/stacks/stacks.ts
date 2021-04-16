import {createStackNavigator} from "@react-navigation/stack";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
    AuthTopStackParam,
    DemoCryptoCurrencyStackParam,
    DemoDrawerStackParam, DemoHealthTabStackParam,
    DemoIGStackParam,
    DemoNestedLv1StackParam,
    DemoNestedLv2StackParam,
    DemoTabRNComponentsStackParam,
    DemoTabStackParam,
    RootStackParam
} from "../../types";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";

export const RootStack = createStackNavigator<RootStackParam>();

export const DemoTabStack = createBottomTabNavigator<DemoTabStackParam>();

export const DemoModalStack = createStackNavigator<RootStackParam>();

export const DemoNestedLv1Stack = createStackNavigator<DemoNestedLv1StackParam>();

export const DemoNestedLv2Stack = createStackNavigator<DemoNestedLv2StackParam>();

export const DemoDrawerStack = createDrawerNavigator<DemoDrawerStackParam>();

export const DemoTabRNComponentsStack = createBottomTabNavigator<DemoTabRNComponentsStackParam>();

export const DemoCryptoCurrencyStack = createBottomTabNavigator<DemoCryptoCurrencyStackParam>();

export const DemoIGStack = createBottomTabNavigator<DemoIGStackParam>();

export const AuthTopTabStack = createMaterialTopTabNavigator<AuthTopStackParam>()

export const DemoHealthTabStack = createBottomTabNavigator<DemoHealthTabStackParam>();
