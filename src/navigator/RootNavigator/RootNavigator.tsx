import React, {ComponentClass, FunctionComponent} from "react";
import {RootStack, DemoNestedStack, DemoTabStack, DemoTabRNComponentsStack} from "../../stacks";
import {useSelector} from "react-redux";
import {RootState} from "../../types/models";
import HomeScreen from "../../screens/Home";
import {SignInScreen} from "../../screens/Auth";
import ProfileScreen from "../../screens/Profile";
import DemoFCReduxHookScreen from "../../screens/DemoFCReduxHook";
import DemoCollectionScreen from "../../screens/DemoHome";
import DemoRouteScreen from "../../screens/DemoRoute";
import DemoThirdPartScreen from "../../screens/DemoThirdPart";
import DemoMapScreen from "../../screens/DemoMap/DemoMap";
import DemoThunkCCScreen from "../../screens/DemoThunkCC";
import TestMapScreen from "../../screens/TestMap";
import TabHomeScreen from "../../screens/DemoTab/TabHome";
import TabSettingsScreen from "../../screens/DemoTab/TabSettings";
import NestedHomeScreen from "../../screens/DemoNested/NestedHome";
import NestedSettingsScreen from "../../screens/DemoNested/NestedSettings";
import RNHome from "../../screens/DemoRNComponents/RNHome";
import RNSectionListScreen from "../../screens/DemoRNComponents/RNSectionList";
import RNFlatListScreen from "../../screens/DemoRNComponents/RNFlatList";
import RNKeyboardAvoidingScreen from "../../screens/DemoRNComponents/RNKeyboardAvoiding";
import RNSafeAreaScreen from "../../screens/DemoRNComponents/RNSafeArea";
import RNVirtualizedListScreen from "../../screens/DemoRNComponents/RNVirtualizedList";
import DemoShareScreen from "../../screens/DemoShare";
import {Config} from "../../types/common";
import {View} from "react-native";
import {PathConfig} from "@react-navigation/core/src/types";

type Screen = {
    component?: ComponentClass<any, any> | FunctionComponent<any> | undefined;
    path?: string;
    name: string;
    parse?: Record<string, (value: string) => any>;
    screens?: Screen[];
    initialParams?: Object;
    stack?: typeof RootStack | typeof DemoNestedStack | typeof DemoTabStack | typeof DemoTabRNComponentsStack,
    signInComponent?: ComponentClass<any, any> | FunctionComponent<any> | undefined;
};

const node: Screen = {
    stack: RootStack,
    name: "RootStack",
    signInComponent: SignInScreen,
    screens: [
        {component: HomeScreen, name: "Home", path: "home"},
        {
            component: ProfileScreen, name: "Profile", path: "profile/:id",
            parse: {
                id: (id: string) => `${id}`,
            },
        },
        {component: DemoFCReduxHookScreen, name: "DemoFCReduxHook", path: "demo-fc-redux-hook"},
        {component: DemoCollectionScreen, name: "DemoCollection", path: "demo-collection"},
        {component: DemoRouteScreen, name: "DemoRoute", path: "demo-route"},
        {component: DemoThirdPartScreen, name: "DemoThirdPart", path: "demo-third-part"},
        {component: DemoThunkCCScreen, name: "DemoThunkCC", path: "demo-thunk-cc"},
        {component: DemoMapScreen, name: "DemoMap", path: "demo-map"},
        {component: TestMapScreen, name: "TestMap", path: "test-map"},
        {component: DemoShareScreen, name: "DemoShare", path: "demo-share"},
        // {component: SignInScreen, name: "SignIn", path: "sign-in"},
        {
            name: "DemoTab", stack: DemoTabStack, path: "demo-tab",
            screens: [
                {
                    component: TabHomeScreen,
                    name: "TabHome",
                    path: "tab-home"
                },
                {
                    component: TabSettingsScreen,
                    name: "TabSettings",
                    path: "tab-settings/:item",
                    initialParams: {"item": "item-001"},
                    parse: {
                        item: (item: string) => `${item}`,
                    }
                }
            ]
        },
        {
            name: "DemoNested", path: "demo-nested", stack: DemoNestedStack,
            screens: [
                {
                    component: NestedHomeScreen,
                    name: "NestedHome",
                    path: "nested-home"
                },
                {
                    component: NestedSettingsScreen,
                    name: "NestedSettings",
                    path: "nested-settings/:item",
                    parse: {
                        item: (item: string) => `${item}`,
                    }
                }
            ]
        },
        {
            name: "DemoRNComponents", path: "demo-tab-rn-components", stack: DemoTabRNComponentsStack,
            screens: [
                {
                    component: RNHome,
                    name: "RNHome",
                    path: "rn-home"
                },
                {
                    component: RNSectionListScreen,
                    name: "RNSectionList",
                    path: "rn-section-list"
                },
                {
                    component: RNFlatListScreen,
                    name: "RNFlatList",
                    path: "rn-flat-list"
                },
                {
                    component: RNKeyboardAvoidingScreen,
                    name: "RNNoKeyboard",
                    path: "rn-keyboard-avoiding"
                },
                {
                    component: RNSafeAreaScreen,
                    name: "RNSafeArea",
                    path: "rn-safe-area"
                },
                {
                    component: RNVirtualizedListScreen,
                    name: "RNVirtualizedList",
                    path: "rn-virtualized-list"
                }

            ]
        }
    ]
}

type RecursiveNavigatorProps = { node: Screen }
const RecursiveNavigator: React.FC<RecursiveNavigatorProps> = ({node}) => {
    const {stack} = node;
    const Navigator = stack?.Navigator;
    let SScreen: React.ElementType = (stack && stack.Screen) ? stack.Screen : View;
    const authState = useSelector((store: RootState) => store.authState);
    return (
        Navigator
            ? <Navigator>
                {
                    authState.accessToken === undefined
                        ? (<SScreen name="SignIn" component={SignInScreen}/>)
                        : (<>
                            {node.screens && node.screens.map((screen: any, i: number) => {
                                return (screen.screens && screen.screens.length > 0
                                    ? <SScreen name={screen.name} key={screen.name}>
                                        {(props: any) => <RecursiveNavigator {...props} node={screen}/>}
                                    </SScreen>
                                    : <SScreen name={screen.name} key={screen.name}
                                               component={screen.component}
                                               initialParams={screen.initialParams}/>)
                            })}
                        </>)
                }
            </Navigator>
            : null
    );
}

const RootNavigator: React.FC = () => <RecursiveNavigator node={node}/>;

const recursiveConfig = (list: Screen[]): Config => {
    let obj: Config = {};
    list.forEach(item => {
        obj[item.name] = {
            path: item.path,
            screens: (item.screens && item.screens.length) ? recursiveConfig(item.screens) : undefined,
            parse: item.parse
        }
    })

    return obj;
};

export const getConfig = (): Config | undefined => {
    return recursiveConfig([node]).RootStack.screens
}

export default RootNavigator;
