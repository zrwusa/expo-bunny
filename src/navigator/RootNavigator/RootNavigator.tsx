import React, {ComponentClass, FunctionComponent} from "react";
import {RootStack} from "../../stacks/Root";
import {DemoNestedStack} from "../../stacks/DemoNested";
import {DemoTabStack} from "../../stacks/DemoTab";
import {DemoTabRNComponentsStack} from "../../stacks/DemoTabRNComponents";
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
import TabRNComponentsHomeScreen from "../../screens/DemoRNComponents/TabRNComponentsHome";
import TabRNComponentsSectionListScreen from "../../screens/DemoRNComponents/SectionList";
import FlatListScreen from "../../screens/DemoRNComponents/FlatList";
import KeyboardAvoidingScreen from "../../screens/DemoRNComponents/KeyboardAvoiding";

type Screen = {
    component?: ComponentClass<any, any> | FunctionComponent<any> | undefined;
    path?: string;
    name: string;
    parse?: Object;
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
        // {component: SignInScreen, name: "SignIn", path: "sign-in"},
        {name: "DemoTab", stack: DemoTabStack, path: "demo-tab",
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
        {name: "DemoNested", path: "demo-nested", stack: DemoNestedStack,
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
        {name: "DemoRNComponents", path: "demo-tab-rn-components", stack: DemoTabRNComponentsStack,
            screens: [
                {
                    component: TabRNComponentsHomeScreen,
                    name: "All",
                    path: "tab-rn-components-home"
                },
                {
                    component: TabRNComponentsSectionListScreen,
                    name: "SectionList",
                    path: "tab-rn-components-settings"
                },
                {
                    component: FlatListScreen,
                    name: "FlatList",
                    path: "flat-list"
                },
                {
                    component: KeyboardAvoidingScreen,
                    name: "NoKeyboard",
                    path: "keyboard-avoiding"
                }
            ]
        }
    ]
}

type RecursiveNavigatorProps = { node: Screen }
const RecursiveNavigator: React.FC<RecursiveNavigatorProps> = ({node, children}) => {
    const stack = node.stack;
    const ScreenComponent = stack?.Screen;
    const Navigator = stack?.Navigator;
    const authState = useSelector((store: RootState) => store.authState);

    return (
        <Navigator>
            {
                authState.accessToken === undefined
                    ? (<ScreenComponent name="SignIn" component={SignInScreen}/>)
                    : (<>
                        {node.screens && node.screens.map((screen, i) => {
                            return (screen.screens && screen.screens.length > 0
                                ? <ScreenComponent name={screen.name} key={screen.name}>
                                    {props => <RecursiveNavigator {...props} node={screen}/>}
                                </ScreenComponent>
                                :
                                <ScreenComponent name={screen.name} key={screen.name} component={screen.component} initialParams={screen.initialParams}/>)
                        })}
                    </>)
            }
        </Navigator>
    );
}

const RootNavigator: React.FC = () => <RecursiveNavigator node={node}/>;

const recursiveConfig = (list: Screen[]): Object => {
    let obj = {};
    list.forEach(item => {
        obj[item.name] = {
            path: item.path,
            screens: (item.screens && item.screens.length) && recursiveConfig(item.screens),
            parse: item.parse
        }
    })
    return obj;
};

export const getConfig = (): Object => {
    return recursiveConfig([node]).RootStack.screens
}

export default RootNavigator;
