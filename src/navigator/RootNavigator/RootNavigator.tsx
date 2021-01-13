import React, {ComponentClass, FunctionComponent} from "react";
import * as Stacks from "../../stacks";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types/models";
import HomeScreen from "../../screens/Home";
import {SignInScreen} from "../../screens/Auth";
import ProfileScreen from "../../screens/Profile";
import DemoFCReduxHookScreen from "../../screens/DemoFCReduxHook";
import DemoCollectionScreen from "../../screens/DemoCollection";
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
import BitcoinHomeScreen from "../../screens/DemoBitcoin/BitcoinHome";
import BitcoinAlertScreen from "../../screens/DemoBitcoin/BitcoinAlert";
import SettingsScreen from "../../screens/Settings";
import DemoThemeScreen from "../../screens/DemoTheme";
import {EThemes} from "../../types/enums";
import {restoreAndSaveTheme} from "../../stores/sys/actions";
import SettingsItem from "../../screens/Settings/SettingsItem/SettingsItem";

type Screen = {
    component?: ComponentClass<any, any> | FunctionComponent<any> | undefined;
    path?: string;
    name: string;
    parse?: Record<string, (value: string) => any>;
    stringify?: Record<string, (value: string) => any>;
    screens?: Screen[];
    initialParams?: Object;
    stack?: typeof Stacks.RootStack | typeof Stacks.DemoNestedStack | typeof Stacks.DemoTabStack | typeof Stacks.DemoTabRNComponentsStack | typeof Stacks.DemoBitcoinStack,
    signInComponent?: ComponentClass<any, any> | FunctionComponent<any> | undefined;
    options?: any
};

const headerRight = () => {
    const sysState = useSelector((rootState: RootState) => rootState.sysState)
    const dispatch = useDispatch()
    const {themeName} = sysState;
    return <SettingsItem
        label=""
        value={themeName === EThemes.DARK}
        onValueChange={(value) => {
            dispatch(restoreAndSaveTheme({themeName: value ? EThemes.DARK : EThemes.DEFAULT}));
        }}
    />
}


const node: Screen = {
    stack: Stacks.RootStack,
    name: "RootStack",
    signInComponent: SignInScreen,
    screens: [
        {
            component: HomeScreen, name: "Home", path: "home",
            options: {headerRight: headerRight},
        },
        {
            component: ProfileScreen, name: "Profile", path: "profile/:id",
            parse: {
                id: (id: string) => `${id}`,
            },
            options: {headerRight: headerRight}
        },
        {
            component: DemoFCReduxHookScreen,
            name: "DemoFCReduxHook", path: "demo-fc-redux-hook",
            options: {headerRight: headerRight}
        },
        {
            component: DemoCollectionScreen,
            name: "DemoCollection", path: "demo-collection",
            options: {headerRight: headerRight},
        },
        {
            component: DemoRouteScreen,
            name: "DemoRoute",
            path: "demo-route",
            parse: {
                id: (id: string) => {
                    // when passing a param through URL the param value will be parsed
                    return id;
                }
            },
            stringify: {
                id: (id: string) => {
                    // when passing a param through URL the param key will be stringified
                    return id
                }
            },
            options: {headerRight: headerRight},
        },
        {
            component: DemoThirdPartScreen, name: "DemoThirdPart", path: "demo-third-part",
            options: {headerRight: headerRight},
        },
        {
            component: DemoThunkCCScreen, name: "DemoThunkCC", path: "demo-thunk-cc",
            options: {headerRight: headerRight},
        },
        {
            component: DemoMapScreen, name: "DemoMap", path: "demo-map",
            options: {headerRight: headerRight},
        },
        {
            component: TestMapScreen, name: "TestMap", path: "test-map",
            options: {headerRight: headerRight},
        },
        {
            component: DemoShareScreen, name: "DemoShare", path: "demo-share",
            options: {headerRight: headerRight},
        },
        // {component: SignInScreen, name: "SignIn", path: "sign-in"},
        {
            name: "DemoTab", stack: Stacks.DemoTabStack, path: "demo-tab",
            options: {headerRight: headerRight},
            screens: [
                {
                    component: TabHomeScreen,
                    name: "TabHome",
                    path: "tab-home",
                    options: {headerRight: headerRight},
                },
                {
                    component: TabSettingsScreen,
                    name: "TabSettings",
                    path: "tab-settings/:item",
                    initialParams: {"item": "item-001"},
                    parse: {
                        item: (item: string) => `${item}`,
                    },
                    options: {headerRight: headerRight},
                }
            ]
        },
        {
            name: "DemoNested", path: "demo-nested", stack: Stacks.DemoNestedStack,
            screens: [
                {
                    component: NestedHomeScreen,
                    name: "NestedHome",
                    path: "nested-home",
                    options: {headerRight: headerRight},
                },
                {
                    component: NestedSettingsScreen,
                    name: "NestedSettings",
                    path: "nested-settings/:item",
                    parse: {
                        item: (item: string) => `${item}`,
                    },
                    options: {headerRight: headerRight},
                }
            ]
        },
        {
            name: "DemoRNComponents", path: "demo-tab-rn-components", stack: Stacks.DemoTabRNComponentsStack,
            screens: [
                {
                    component: RNHome,
                    name: "RNHome",
                    path: "rn-home",
                    options: {headerRight: headerRight},
                },
                {
                    component: RNSectionListScreen,
                    name: "RNSectionList",
                    path: "rn-section-list",
                    options: {headerRight: headerRight},
                },
                {
                    component: RNFlatListScreen,
                    name: "RNFlatList",
                    path: "rn-flat-list",
                    options: {headerRight: headerRight},
                },
                {
                    component: RNKeyboardAvoidingScreen,
                    name: "RNNoKeyboard",
                    path: "rn-keyboard-avoiding",
                    options: {headerRight: headerRight},
                },
                {
                    component: RNSafeAreaScreen,
                    name: "RNSafeArea",
                    path: "rn-safe-area",
                    options: {headerRight: headerRight},
                },
                {
                    component: RNVirtualizedListScreen,
                    name: "RNVirtualizedList",
                    path: "rn-virtualized-list",
                    options: {headerRight: headerRight},
                }

            ]
        },
        {
            name: "DemoBitcoin",
            stack: Stacks.DemoBitcoinStack,
            path: "demo-bitcoin",
            screens: [
                {
                    component: BitcoinHomeScreen,
                    name: "BitcoinHome",
                    path: "bitcoin-home",
                    options: {headerRight: headerRight},
                },
                {
                    component: BitcoinAlertScreen,
                    name: "BitcoinAlert",
                    path: "bitcoin-alert/:isPush",
                    initialParams: {"isPush": true},
                    options: {headerRight: headerRight},
                }
            ]
        },
        {
            component: SettingsScreen, name: "Settings", path: "settings",
            options: {headerRight: headerRight},
        },
        {
            component: DemoThemeScreen, name: "DemoTheme", path: "demo-theme",
            options: {headerRight: headerRight},
        },
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
                            {node.screens && node.screens.map(({
                                                                   screens,
                                                                   name,
                                                                   component,
                                                                   ...rest
                                                               }) => {
                                return (screens && screens.length > 0
                                    ? <SScreen name={name} key={name}>
                                        {(props: RecursiveNavigatorProps) =>
                                            <RecursiveNavigator {...props}
                                                                node={{name: name, component: component, ...rest}}/>}
                                    </SScreen>
                                    : <SScreen name={name} key={name}
                                               component={component}
                                               {...rest}/>)
                            })}
                        </>)
                }
            </Navigator>
            : null
    );
}

const RootNavigator: React.FC = () => <RecursiveNavigator node={node}/>;

const recursiveConfig = (screens: Screen[]): Config => {
    let obj: Config = {};
    screens.forEach(screen => {
        obj[screen.name] = {
            path: screen.path,
            screens: (screen.screens && screen.screens.length) ? recursiveConfig(screen.screens) : undefined,
            parse: screen.parse,
            stringify: screen.stringify,
            options: screen.options,
        }
    })
    return obj;
};

export const getConfig = (): Config | undefined => {
    return recursiveConfig([node]).RootStack.screens
}

export default RootNavigator;
