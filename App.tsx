import {StatusBar} from 'expo-status-bar';
import * as React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RootStackParamList from "./src/stacks/Root";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import DemoFCReduxHook from "./src/screens/DemoFCReduxHook";
import DemoHome from "./src/screens/DemoHome";
import DemoRoute from "./src/screens/DemoRoute";
import DemoThirdPart from "./src/screens/DemoThirdPart";
import DemoThunkCC from "./src/screens/DemoThunkCC";
import {Provider} from "react-redux";
import store from "./src/stores";

const RootStack = createStackNavigator<RootStackParamList>();

const linking = {
    prefixes: ["demo://app"],
    config: {
        initialRouteName: "Home",
        screens: {
            Home: "home",
            Profile: {
                path: "profile/:id",
                parse: {
                    id: (id: string) => `${id}`,
                },
            },
            DemoFCReduxHook: "demo-fc-redux-hook",
            DemoHome: "demo-home",
            DemoRoute: "demo-route",
            DemoThirdPart: "demo-third-part",
            DemoThunkCC: "demo-thunk-cc",
        },
    },
};

function App() {
    return (
        <Provider store={store}>
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
            <RootStack.Navigator initialRouteName="Home">
                <RootStack.Screen name="Home" component={Home}/>
                <RootStack.Screen
                    name="Profile"
                    component={Profile}
                    initialParams={{id: '000'}}
                />
                <RootStack.Screen name="DemoFCReduxHook" component={DemoFCReduxHook}/>
                <RootStack.Screen name="DemoHome" component={DemoHome}/>
                <RootStack.Screen name="DemoRoute" component={DemoRoute}/>
                <RootStack.Screen name="DemoThirdPart" component={DemoThirdPart}/>
                <RootStack.Screen name="DemoThunkCC" component={DemoThunkCC}/>
            </RootStack.Navigator>
        </NavigationContainer>
        </Provider>
    );
}

export default App;
