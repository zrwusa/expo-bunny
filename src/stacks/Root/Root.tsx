import {createStackNavigator} from "@react-navigation/stack";
import {RootStackParam} from "../../types/stacks";
import * as React from "react";

export const RootStack = createStackNavigator<RootStackParam>();
