import * as React from 'react';
import {Platform, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from "./stacks/Root";
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
import {restoreToken} from "./stores/auth/actions";


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
    const [isReady, setIsReady] = React.useState(false)
    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let accessToken;
            try {
                accessToken = await AsyncStorage.getItem('accessToken');
                accessToken && dispatch(restoreToken({access_token: accessToken}));
                setIsReady(true);
            } catch (e) {
                // Restoring token failed
            }
        };
        bootstrapAsync();
    }, []);
    return isReady ? (
            <NavigationContainer linking={linking} fallback={<Text>Fallback loading...</Text>}>
                <RootStack.Navigator>
                    {(authState.accessToken === undefined) ? (
                        <RootStack.Screen name="SignIn" component={SignInScreen}/>
                    ) : (
                        <>
                            <RootStack.Screen name="Home" component={Home}/>
                            <RootStack.Screen name="Profile" component={Profile} initialParams={{id: '000'}}/>
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
        : (<Text>Preparing resources</Text>)

}

export default App;
