import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {
    RootStackParam, DemoNestedStackParam, DemoTabStackParam,
    DemoTabRNComponentsStackParam, DemoBitcoinStackParam, DemoDrawerStackParam, DemoNestedLv2StackParam
} from "../../types/stacks";

export const RootStack = createStackNavigator<RootStackParam>();

export const DemoNestedStack = createStackNavigator<DemoNestedStackParam>();

export const DemoNestedLv2Stack = createStackNavigator<DemoNestedLv2StackParam>();

export const DemoTabStack = createBottomTabNavigator<DemoTabStackParam>();

export const DemoDrawerStack = createDrawerNavigator<DemoDrawerStackParam>();

export const DemoBitcoinStack = createBottomTabNavigator<DemoBitcoinStackParam>();

export const DemoTabRNComponentsStack = createBottomTabNavigator<DemoTabRNComponentsStackParam>();



