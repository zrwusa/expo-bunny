import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {
    RootStackParam, DemoNestedStackParam, DemoTabStackParam,
    DemoTabRNComponentsStackParam, DemoBitcoinStackParam
} from "../../types/stacks";

export const RootStack = createStackNavigator<RootStackParam>();

export const DemoNestedStack = createStackNavigator<DemoNestedStackParam>();

export const DemoTabStack = createBottomTabNavigator<DemoTabStackParam>();

export const DemoBitcoinStack = createBottomTabNavigator<DemoBitcoinStackParam>();

export const DemoTabRNComponentsStack = createBottomTabNavigator<DemoTabRNComponentsStackParam>();



