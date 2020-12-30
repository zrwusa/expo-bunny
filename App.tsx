import {StatusBar} from 'expo-status-bar';
import * as React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RootStackParamList from "./src/stacks/Root";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";

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
            Notifications: "notifications",
            Settings: "settings",
        },
    },
};

function App() {
    return (
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
            <RootStack.Navigator initialRouteName="Home">
                <RootStack.Screen name="Home" component={Home}/>
                <RootStack.Screen
                    name="Profile"
                    component={Profile}
                    initialParams={{id: '000'}}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

export default App;
