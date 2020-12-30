// import {StatusBar} from 'expo-status-bar';
import * as React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RootStackParamList from "./stacks/Root";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import DemoFCReduxHook from "./screens/DemoFCReduxHook";
import DemoHome from "./screens/DemoHome";
import DemoRoute from "./screens/DemoRoute";
import DemoThirdPart from "./screens/DemoThirdPart";
import DemoThunkCC from "./screens/DemoThunkCC";
import {useDispatch, useSelector} from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SignInScreen} from "./components/Auth/Auth";
import {IRootState} from "./stores/models";
import {restoreTokenAction, signInAction} from "./stores/auth/actions";

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
            SignIn: "sign-in"
        },
    },
};


function App() {
    const dispatch = useDispatch();
    const authState = useSelector((store: IRootState) => store.authState);

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let accessToken;
            try {
                accessToken = await AsyncStorage.getItem('accessToken');
            } catch (e) {
                // Restoring token failed
            }
            accessToken && dispatch(restoreTokenAction({access_token: accessToken}))
        };
        bootstrapAsync();
    }, []);

    return (
        <NavigationContainer linking={linking} fallback={<Text>Fallback loading...</Text>}>
            <RootStack.Navigator initialRouteName="Home">
                {(authState.accessToken === undefined || authState.accessToken === null) ? (
                    <RootStack.Screen
                        name="SignIn"
                        options={{
                            title: 'Sign in',
                            animationTypeForReplace: authState.isSignOut ? 'pop' : 'push',
                        }}
                        component={SignInScreen}
                    />
                ) : (
                    <>
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
                    </>
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default App;
