import {createStackNavigator} from "@react-navigation/stack";
import {RootStackParam} from "../../types/stacks";
import {SignInScreen} from "../../screens/Auth";
import * as React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../types/models";
import HomeScreen from "../../screens/Home";
import ProfileScreen from "../../screens/Profile";
import DemoFCReduxHookScreen from "../../screens/DemoFCReduxHook";
import DemoCollectionScreen from "../../screens/DemoHome";
import DemoRouteScreen from "../../screens/DemoRoute";
import DemoThirdPartScreen from "../../screens/DemoThirdPart";
import DemoMapScreen from "../../screens/DemoMap/DemoMap";
import DemoThunkCCScreen from "../../screens/DemoThunkCC";
import TestMapScreen from "../../screens/TestMap";
import DemoTabScreen from "../../screens/DemoTab";
import DemoRNComponents from "../../screens/DemoRNComponents";
import DemoNestedScreen from "../../screens/DemoNested";

export const RootStack = createStackNavigator<RootStackParam>();

function RootStackNavigatorWithScreensIn() {
    const authState = useSelector((store: RootState) => store.authState);

    return (
        <RootStack.Navigator>
            {(authState.accessToken === undefined) ? (
                <RootStack.Screen name="SignIn" component={SignInScreen}/>
            ) : (
                <>
                    <RootStack.Screen name="Home" component={HomeScreen}/>
                    <RootStack.Screen name="Profile" component={ProfileScreen} initialParams={{id: '000'}}/>
                    <RootStack.Screen name="DemoFCReduxHook" component={DemoFCReduxHookScreen}/>
                    <RootStack.Screen name="DemoCollection" component={DemoCollectionScreen}/>
                    <RootStack.Screen name="DemoRoute" component={DemoRouteScreen}/>
                    <RootStack.Screen name="DemoThirdPart" component={DemoThirdPartScreen}/>
                    <RootStack.Screen name="DemoMap" component={DemoMapScreen}/>
                    <RootStack.Screen name="DemoThunkCC" component={DemoThunkCCScreen}/>
                    <RootStack.Screen name="TestMap" component={TestMapScreen}/>
                    <RootStack.Screen name="DemoTab" component={DemoTabScreen}/>
                    <RootStack.Screen name="DemoNested" component={DemoNestedScreen}/>
                    <RootStack.Screen name="DemoRNComponents" component={DemoRNComponents}/>
                </>
            )}
        </RootStack.Navigator>
    )
}

export default RootStackNavigatorWithScreensIn


