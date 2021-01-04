import * as React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch} from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {restoreToken} from "./stores/auth/actions";
import * as Linking from "expo-linking";
import {sysError} from "./stores/sys/actions";
import RootStackNavigatorWithScreensIn from "./stacks/Root/Root";

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
            },
            DemoNested: {
                path: "demo-nested",
                screens: {
                    NestedHome: "nested-home",
                    NestedSettings: {
                        path: "nested-settings/:item",
                        parse: {
                            item: (item: string) => `${item}`,
                        }
                    }
                }
            },
            DemoRNComponents:"demo-rn-components"
        },
    },
};

function App() {
    const dispatch = useDispatch();
    const [isReady, setIsReady] = React.useState(false);
    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let accessToken;
            try {
                accessToken = await AsyncStorage.getItem('accessToken');
                accessToken && dispatch(restoreToken({access_token: accessToken}));
                setIsReady(true);
            } catch (err) {
                dispatch(sysError(err.toString()));
            }
        };
        bootstrapAsync()
            .catch((err) => dispatch(sysError(err.toString())));
    }, []);

    return isReady ? (
            <NavigationContainer linking={linking} fallback={<Text>Fallback loading...</Text>}>
                    <RootStackNavigatorWithScreensIn/>
            </NavigationContainer>
        )
        : (<Text>Preparing resources</Text>)
}

export default App;
