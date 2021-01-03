import * as React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from "./stacks/Root";
import {useDispatch, useSelector} from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SignInScreen} from "./screens/Auth";
import {restoreToken} from "./stores/auth/actions";
import {RootState} from "./types/models";
import * as Linking from "expo-linking";
import HomeScreen from "./screens/Home";
import ProfileScreen from "./screens/Profile";
import DemoFCReduxHookScreen from "./screens/DemoFCReduxHook";
import DemoCollectionScreen from "./screens/DemoHome";
import DemoRouteScreen from "./screens/DemoRoute";
import DemoThirdPartScreen from "./screens/DemoThirdPart";
import DemoThunkCCScreen from "./screens/DemoThunkCC";
import DemoMapScreen from "./screens/DemoMap";
import TestMapScreen from "./screens/TestMap";
import {sysError} from "./stores/sys/actions";
import DemoTabScreen from "./screens/DemoTab";

const basePath = Linking.makeUrl('/');
const linking = {
    prefixes: [basePath],
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
            DemoCollection: "demo-collection",
            DemoRoute: "demo-route",
            DemoThirdPart: "demo-third-part",
            DemoThunkCC: "demo-thunk-cc",
            SignIn: "sign-in",
            TestMap: "test-map",
            DemoTab: {
                path: "demo-tab",
                screens: {
                    TabHome: "tab-home",
                    TabSettings: {
                        path: "tab-settings/:item",
                        parse: {
                            item: (item: string) => `${item}`,
                        }
                    }
                }
            }
        },
    },
};

function App() {
    const dispatch = useDispatch();
    const authState = useSelector((store: RootState) => store.authState);
    const [isReady, setIsReady] = React.useState(false);
    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let accessToken;
            try {
                accessToken = await AsyncStorage.getItem('accessToken');
                accessToken && dispatch(restoreToken({access_token: accessToken}));
                setIsReady(true);
            } catch (err) {
                // Restoring token failed
                dispatch(sysError(err.toString()));
            }
        };
        bootstrapAsync()
            .catch((err) => dispatch(sysError(err.toString())));
    }, []);

    return isReady ? (
            <>
                <NavigationContainer linking={linking} fallback={<Text>Fallback loading...</Text>}>
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
                            </>
                        )}
                    </RootStack.Navigator>
                </NavigationContainer>
            </>
        )
        : (<Text>Preparing resources</Text>)
}

export default App;
