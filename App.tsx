// import {StatusBar} from 'expo-status-bar';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Action, SignInScreen, State, AuthContext} from "./src/components/Auth/Auth";

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
    const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    AsyncStorage.setItem('userToken', action.token)
                    return {
                        ...prevState,
                        isSignOut: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignOut: true,
                        userToken: undefined,
                    };
            }
        },
        {
            isLoading: true,
            isSignOut: false,
            userToken: undefined,
        }
    );

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                // Restoring token failed
            }

            dispatch({type: 'RESTORE_TOKEN', token: userToken});
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: () => dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'}),
            signOut: () => dispatch({type: 'SIGN_OUT'}),
        }),
        []
    );
    return (
        <Provider store={store}>
            <AuthContext.Provider value={authContext}>
                <NavigationContainer linking={linking} fallback={<Text>Fallback loading...</Text>}>
                    <RootStack.Navigator initialRouteName="Home">
                        {(state.userToken === undefined || state.userToken === null) ? (
                            <RootStack.Screen
                                name="SignIn"
                                options={{
                                    title: 'Sign in',
                                    animationTypeForReplace: state.isSignOut ? 'pop' : 'push',
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
            </AuthContext.Provider>
        </Provider>
    )
    // return (
    //     <Provider store={store}>
    //         <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
    //             <RootStack.Navigator initialRouteName="Home">
    //                 <RootStack.Screen name="Home" component={Home}/>
    //                 <RootStack.Screen
    //                     name="Profile"
    //                     component={Profile}
    //                     initialParams={{id: '000'}}
    //                 />
    //                 <RootStack.Screen name="DemoFCReduxHook" component={DemoFCReduxHook}/>
    //                 <RootStack.Screen name="DemoHome" component={DemoHome}/>
    //                 <RootStack.Screen name="DemoRoute" component={DemoRoute}/>
    //                 <RootStack.Screen name="DemoThirdPart" component={DemoThirdPart}/>
    //                 <RootStack.Screen name="DemoThunkCC" component={DemoThunkCC}/>
    //             </RootStack.Navigator>
    //         </NavigationContainer>
    //     </Provider>
    // );
}

export default App;
