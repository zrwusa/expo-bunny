import {createStackNavigator} from "@react-navigation/stack";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
    AuthTopStackParam,
    DemoChatStackParam,
    DemoCryptoCurrencyTabStackParam,
    DemoDatingTabStackParam,
    DemoDrawerStackParam,
    DemoHealthTabStackParam,
    DemoNestedLv1StackParam,
    DemoNestedLv2StackParam,
    DemoSocialMediaTabStackParam,
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

export const DemoCryptoCurrencyTabStack = createBottomTabNavigator<DemoCryptoCurrencyTabStackParam>();

export const DemoSocialMediaTabStack = createBottomTabNavigator<DemoSocialMediaTabStackParam>();

export const AuthTopTabStack = createMaterialTopTabNavigator<AuthTopStackParam>()

export const DemoHealthTabStack = createBottomTabNavigator<DemoHealthTabStackParam>();

export const DemoDatingTabStack = createBottomTabNavigator<DemoDatingTabStackParam>();

export const DemoChatStack = createStackNavigator<DemoChatStackParam>();
