import React, {ComponentClass, FunctionComponent} from "react";
import * as Stacks from "../stacks";
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
import {Platform, View} from "react-native";
import BitcoinHomeScreen from "../../screens/DemoBitcoin/BitcoinHome";
import BitcoinAlertScreen from "../../screens/DemoBitcoin/BitcoinAlert";
import SettingsScreen from "../../screens/Settings";
import DemoThemeScreen from "../../screens/DemoTheme";
import {EThemes} from "../../types/enums";
import {restoreAndSaveTheme} from "../../stores/sys/actions";
import SettingsItem from "../../screens/Settings/SettingsItem/SettingsItem";
import {DemoSuspenseScreen} from "../../screens/DemoSuspense";
import {useTranslation} from "react-i18next";
import DrawerHomeScreen from "../../screens/DemoDrawer/DrawerHome/DrawerHome";
import DrawerSettingsScreen from "../../screens/DemoDrawer/DrawerSettings/DrawerSettings";
import {DrawerType} from "react-native-gesture-handler/DrawerLayout";

type Screen = {
    component?: ComponentClass<any, any> | FunctionComponent<any> | undefined;
    path?: string;
    name: string;
    parse?: Record<string, (value: string) => any>;
    stringify?: Record<string, (value: string) => any>;
    screens?: Screen[];
    initialParams?: Object;
    stack?:
        typeof Stacks.RootStack
        | typeof Stacks.DemoNestedStack
        | typeof Stacks.DemoTabStack
        | typeof Stacks.DemoTabRNComponentsStack
        | typeof Stacks.DemoBitcoinStack
        | typeof Stacks.DemoDrawerStack,
    signInComponent?: ComponentClass<any, any> | FunctionComponent<any> | undefined;
    options?: any,
    screenOptions?: any,
    tabBarOptions?: any,
    drawerType?: DrawerType,
    openByDefault?: boolean
};

const customHeaderRight = () => {
    const sysState = useSelector((rootState: RootState) => rootState.sysState)
    const dispatch = useDispatch()
    const {themeName} = sysState;
    return <SettingsItem
        label=""
        value={themeName === EThemes.dark}
        onValueChange={(value) => {
            dispatch(restoreAndSaveTheme({themeName: value ? EThemes.dark : EThemes.default}));
        }}
    />
}

const generalOptions = {
    headerRight: customHeaderRight,
    headerStyle: {
        height: Platform.select({
            web: 44,
            android: 64,
        })
    }
}

const tabBarOptions = {
    labelStyle: {fontSize: 12},
    tabStyle: {justifyContent: 'center'},
    style: {backgroundColor: 'powderblue'},
}

const node: Screen = {
    stack: Stacks.RootStack,
    name: "RootStack",
    signInComponent: SignInScreen,
    screenOptions: generalOptions,
    screens: [
        {
            component: HomeScreen, name: "Home", path: "home",
        },
        {
            component: ProfileScreen, name: "Profile", path: "profile/:id",
            parse: {
                id: (id: string) => `${id}`,
            },
        },
        {
            component: DemoFCReduxHookScreen,
            name: "DemoFCReduxHook", path: "demo-fc-redux-hook",
        },
        {
            component: DemoCollectionScreen,
            name: "DemoCollection", path: "demo-collection",
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
        },
        {
            component: DemoThirdPartScreen, name: "DemoThirdPart", path: "demo-third-part",
        },
        {
            component: DemoThunkCCScreen, name: "DemoThunkCC", path: "demo-thunk-cc",
        },
        {
            component: DemoMapScreen, name: "DemoMap", path: "demo-map",
        },
        {
            component: TestMapScreen, name: "TestMap", path: "test-map",
        },
        {
            component: DemoShareScreen, name: "DemoShare", path: "demo-share",
        },
        // {
        //     component: SignInScreen, name: "SignIn", path: "sign-in",
        //     options: generalOptions
        // },
        {
            name: "DemoTab", stack: Stacks.DemoTabStack, path: "demo-tab",
            options: generalOptions,
            tabBarOptions: tabBarOptions,
            screens: [
                {
                    component: TabHomeScreen,
                    name: "TabHome",
                    path: "tab-home",
                },
                {
                    component: TabSettingsScreen,
                    name: "TabSettings",
                    path: "tab-settings/:item",
                    initialParams: {"item": "item-001"},
                    parse: {
                        item: (item: string) => `${item}`,
                    },
                }
            ]
        },
        {
            name: "DemoDrawer",
            stack: Stacks.DemoDrawerStack,
            path: "demo-drawer",
            drawerType: "front",
            openByDefault: false,
            options: {...generalOptions, headerShown: true},
            screenOptions: {
                headerShown: true,
                headerStatusBarHeight:Platform.select({native:0})
            },
            screens: [
                {
                    component: DrawerHomeScreen,
                    name: "DrawerHome",
                    path: "drawer-home",
                },
                {
                    component: DrawerSettingsScreen,
                    name: "DrawerSettings",
                    path: "drawer-settings/:item",
                    initialParams: {"item": "item-001"},
                    parse: {
                        item: (item: string) => `${item}`,
                    },
                }
            ]
        },
        {
            name: "DemoNested", path: "demo-nested", stack: Stacks.DemoNestedStack,
            options: {...generalOptions, headerShown: true},
            screenOptions: generalOptions,
            screens: [
                {
                    component: NestedHomeScreen,
                    name: "NestedHome",
                    path: "nested-home",
                },
                {
                    component: NestedSettingsScreen,
                    name: "NestedSettings",
                    path: "nested-settings/:item",
                    parse: {
                        item: (item: string) => `${item}`,
                    },
                }
            ]
        },
        {
            name: "DemoRNComponents",
            path: "demo-tab-rn-components",
            stack: Stacks.DemoTabRNComponentsStack,
            screenOptions: generalOptions,
            screens: [
                {
                    component: RNHome,
                    name: "RNHome",
                    path: "rn-home",
                },
                {
                    component: RNSectionListScreen,
                    name: "RNSectionList",
                    path: "rn-section-list",
                },
                {
                    component: RNFlatListScreen,
                    name: "RNFlatList",
                    path: "rn-flat-list",
                },
                {
                    component: RNKeyboardAvoidingScreen,
                    name: "RNNoKeyboard",
                    path: "rn-keyboard-avoiding",
                },
                {
                    component: RNSafeAreaScreen,
                    name: "RNSafeArea",
                    path: "rn-safe-area",
                },
                {
                    component: RNVirtualizedListScreen,
                    name: "RNVirtualizedList",
                    path: "rn-virtualized-list",
                }

            ]
        },
        {
            name: "DemoBitcoin",
            stack: Stacks.DemoBitcoinStack,
            path: "demo-bitcoin",
            screenOptions: generalOptions,
            screens: [
                {
                    component: BitcoinHomeScreen,
                    name: "BitcoinHome",
                    path: "bitcoin-home",
                },
                {
                    component: BitcoinAlertScreen,
                    name: "BitcoinAlert",
                    path: "bitcoin-alert/:isPush",
                    initialParams: {"isPush": true},
                }
            ]
        },
        {
            component: SettingsScreen, name: "Settings", path: "settings",
            options: generalOptions,
        },
        {
            component: DemoSuspenseScreen, name: "DemoSuspense", path: "demo-suspense",
            options: generalOptions,
        },
        {
            component: DemoThemeScreen, name: "DemoTheme", path: "demo-theme",
            options: generalOptions,
        },
    ]
}

type RecursiveNavigatorProps = { node: Screen }
const RecursiveNavigator: React.FC<RecursiveNavigatorProps> = ({node}) => {
    const {t} = useTranslation();
    const {stack, ...rest} = node;
    const Navigator = stack?.Navigator;
    // console.log('---stack,Navigator',stack,Navigator)
    let ScreenComponent: React.ElementType = (stack && stack.Screen) ? stack.Screen : View;
    const authState = (node.name === "RootStack") ? useSelector((store: RootState) => store.authState) : null;
    const jsxNode = (
        Navigator
            ? <Navigator {...rest}>
                {authState && (authState.accessToken === undefined)
                    ? (<ScreenComponent component={SignInScreen} name="SignIn" options={{
                        ...generalOptions,
                        title: t(`screens.SignIn.title`)
                    }}/>)
                    : (<>
                        {node.screens && node.screens.map((screen) => {
                            return (screen.screens && screen.screens.length > 0
                                ? <ScreenComponent {...screen}
                                                   options={{
                                                       ...screen.options,
                                                       title: t(`screens.${screen.name}.title`)
                                                   }} key={screen.name}>
                                    {(navProps: any) => {
                                        return <RecursiveNavigator {...navProps} node={screen}/>
                                    }}
                                </ScreenComponent>
                                : <ScreenComponent {...screen}
                                                   options={{
                                                       ...screen.options,
                                                       title: t(`screens.${screen.name}.title`)
                                                   }} key={screen.name}/>)
                        })}
                    </>)
                }
            </Navigator>
            : null
    );
    // console.log(`---jsxNode`,jsxNode)
    return jsxNode;
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
            // options: screen.options,
            // tabBarOptions: screen.tabBarOptions || undefined,
            // screenOptions: screen.screenOptions
        }
    })
    return obj;
};

export const getScreensConfig = (): Config | undefined => {
    return recursiveConfig([node]).RootStack.screens
}

export default RootNavigator;
