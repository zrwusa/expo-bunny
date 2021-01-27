import * as React from "react";
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
import RNHome from "../../screens/DemoRNComponents/RNHome";
import RNSectionListScreen from "../../screens/DemoRNComponents/RNSectionList";
import RNFlatListScreen from "../../screens/DemoRNComponents/RNFlatList";
import RNKeyboardAvoidingScreen from "../../screens/DemoRNComponents/RNKeyboardAvoiding";
import RNSafeAreaScreen from "../../screens/DemoRNComponents/RNSafeArea";
import RNVirtualizedListScreen from "../../screens/DemoRNComponents/RNVirtualizedList";
import DemoShareScreen from "../../screens/DemoShare";
import {Platform, View} from "react-native";
import BitcoinHomeScreen from "../../screens/DemoBitcoin/BitcoinHome";
import BitcoinAlertScreen from "../../screens/DemoBitcoin/BitcoinAlert";
import SettingsScreen from "../../screens/Settings";
import DemoThemeScreen from "../../screens/DemoTheme";
import {EThemes} from "../../common/constants";
import {restoreAndSaveTheme} from "../../stores/sys/actions";
import SettingsItem from "../../screens/Settings/SettingsItem/SettingsItem";
import {DemoSuspenseScreen} from "../../screens/DemoSuspense";
import {useTranslation} from "react-i18next";
import DrawerHomeScreen from "../../screens/DemoDrawer/DrawerHome/DrawerHome";
import DrawerSettingsScreen from "../../screens/DemoDrawer/DrawerSettings/DrawerSettings";
import {DefaultNavigatorOptions} from "@react-navigation/core/src/types";
import {BottomTabBarOptions, BottomTabNavigationOptions} from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import {DrawerNavigationOptions} from "@react-navigation/drawer/lib/typescript/src/types";
import {StackNavigationOptions} from "@react-navigation/stack";
import {PathConfigMap} from "@react-navigation/native";
import {Traversable} from "../../types/helpers";
import {Icon} from "../../components/base-ui";
import {LinkingConfig, LinkingConfigTraversable, RecursiveNavigatorProps, NavigatorTreeNode} from "../../types/common"
import {getIconName, propsExtract} from "../../common/tools";
import DemoNotificationScreen from "../../screens/DemoNotification";
import NestedLv2HomeScreen from "../../screens/DemoNested/NestedSettings/NestedLv2Home";
import NestedLv2SettingsScreen from "../../screens/DemoNested/NestedSettings/NestedLv2Settings";

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

const optionsHeaderAndAnimation: StackNavigationOptions = {
    animationEnabled: true,
    headerRight: customHeaderRight,
    headerStyle: {
        height: Platform.select({
            web: 50,
            android: 64,
        })
    }
}

const optionsDraw: DrawerNavigationOptions = {
    headerStyle: {
        height: Platform.select({
            web: 50,
            android: 64,
            ios: 50,
        })
    },
    headerShown: true,
    headerStatusBarHeight: Platform.select({native: 0})
}

const tabBarOptions: BottomTabBarOptions = {
    tabStyle: {justifyContent: 'center'},
}

const screenOptionsTabBarIcon: DefaultNavigatorOptions<BottomTabNavigationOptions>["screenOptions"] = ({route}) => {
    return {
        tabBarIcon: ({focused, color, size}) => {
            const name = getIconName(route.name, focused)
            return <Icon name={name} style={{color: color}} size={size}/>;
        }
    }
}

const node: NavigatorTreeNode = {
    stack: Stacks.RootStack,
    name: "RootStack",
    signInComponent: SignInScreen,
    options: optionsHeaderAndAnimation,
    headerMode: "float",
    screenOptions: optionsHeaderAndAnimation,
    navigatorType: "stack",
    childrenNode: [
        {
            component: HomeScreen,
            name: "Home",
            path: "home",
            navigatorType: "stack"
        },
        {
            component: ProfileScreen,
            name: "Profile", path: "profile/:id",
            parse: {
                id: (id: string) => `${id}`,
            },
            navigatorType: "stack"
        },
        {
            component: DemoFCReduxHookScreen,
            name: "DemoFCReduxHook",
            path: "demo-fc-redux-hook",
            navigatorType: "stack"
        },
        {
            component: DemoCollectionScreen,
            name: "DemoCollection",
            path: "demo-collection",
            navigatorType: "stack"
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
            navigatorType: "stack"
        },
        {
            component: DemoThirdPartScreen,
            name: "DemoThirdPart",
            path: "demo-third-part",
            navigatorType: "stack"
        },
        {
            component: DemoThunkCCScreen,
            name: "DemoThunkCC",
            path: "demo-thunk-cc",
            navigatorType: "stack"
        },
        {
            component: DemoMapScreen,
            name: "DemoMap",
            path: "demo-map",
            navigatorType: "stack"
        },
        {
            component: TestMapScreen,
            name: "TestMap",
            path: "test-map",
            navigatorType: "stack"
        },
        {
            component: DemoShareScreen,
            name: "DemoShare",
            path: "demo-share",
            navigatorType: "stack"
        },
        {
            component: DemoNotificationScreen,
            name: "DemoNotification",
            path: "demo-notification",
            navigatorType: "stack"
        },
        {
            name: "DemoTab", stack: Stacks.DemoTabStack,
            path: "demo-tab",
            options: optionsHeaderAndAnimation,
            tabBarOptions: tabBarOptions,
            screenOptions: screenOptionsTabBarIcon,
            navigatorType: "tab",
            childrenNode: [
                {
                    component: TabHomeScreen,
                    name: "TabHome",
                    path: "tab-home",
                    navigatorType: "tab"
                },
                {
                    component: TabSettingsScreen,
                    name: "TabSettings",
                    path: "tab-settings/:item",
                    initialParams: {"item": "item-001"},
                    parse: {
                        item: (item: string) => `${item}`,
                    },
                    navigatorType: "tab"
                }
            ]
        },
        {
            name: "DemoDrawer",
            stack: Stacks.DemoDrawerStack,
            path: "demo-drawer",
            drawerType: "front",
            openByDefault: false,
            options: {...optionsHeaderAndAnimation, headerShown: true},
            screenOptions: optionsDraw,
            navigatorType: "drawer",
            childrenNode: [
                {
                    component: DrawerHomeScreen,
                    name: "DrawerHome",
                    path: "drawer-home",
                    navigatorType: "drawer"
                },
                {
                    component: DrawerSettingsScreen,
                    name: "DrawerSettings",
                    path: "drawer-settings/:item",
                    initialParams: {"item": "item-001"},
                    parse: {
                        item: (item: string) => `${item}`,
                    },
                    navigatorType: "drawer"
                }
            ]
        },
        {
            stack: Stacks.DemoNestedStack,
            name: "DemoNested",
            path: "demo-nested",
            options: {...optionsHeaderAndAnimation, headerShown: true},
            screenOptions: optionsHeaderAndAnimation,
            navigatorType: "stack",
            childrenNode: [
                {
                    component: NestedHomeScreen,
                    name: "NestedHome",
                    path: "nested-home",
                    navigatorType: "stack",
                },
                {
                    stack: Stacks.DemoNestedLv2Stack,
                    name: "NestedSettings",
                    path: "nested-settings/:item",
                    options: {headerShown: true},
                    screenOptions: optionsHeaderAndAnimation,
                    navigatorType: "stack",
                    childrenNode: [
                        {
                            component: NestedLv2HomeScreen,
                            name: "NestedLv2Home",
                            path: "nested-lv2-home",
                            navigatorType: "stack",
                        },
                        {
                            component: NestedLv2SettingsScreen,
                            name: "NestedLv2Settings",
                            path: "nested-lv2-settings/:itemlv2",
                            parse: {
                                itemlv2: (itemlv2: string) => `${itemlv2}`,
                            },
                            navigatorType: "stack",
                        }
                    ]
                }
            ]
        },
        {
            name: "DemoRNComponents",
            path: "demo-tab-rn-components",
            stack: Stacks.DemoTabRNComponentsStack,
            screenOptions: screenOptionsTabBarIcon,
            tabBarOptions: tabBarOptions,
            navigatorType: "tab",
            childrenNode: [
                {
                    component: RNHome,
                    name: "RNHome",
                    path: "rn-home",
                    navigatorType: "tab",
                },
                {
                    component: RNFlatListScreen,
                    name: "RNFlatList",
                    path: "rn-flat-list",
                    navigatorType: "tab",
                },
                {
                    component: RNSectionListScreen,
                    name: "RNSectionList",
                    path: "rn-section-list",
                    navigatorType: "tab",
                },
                {
                    component: RNVirtualizedListScreen,
                    name: "RNVirtualizedList",
                    path: "rn-virtualized-list",
                    navigatorType: "tab",
                },
                {
                    component: RNKeyboardAvoidingScreen,
                    name: "RNNoKeyboard",
                    path: "rn-keyboard-avoiding",
                    navigatorType: "tab",
                },
                {
                    component: RNSafeAreaScreen,
                    name: "RNSafeArea",
                    path: "rn-safe-area",
                    navigatorType: "tab",
                }
            ]
        },
        {
            name: "DemoBitcoin",
            stack: Stacks.DemoBitcoinStack,
            path: "demo-bitcoin",
            screenOptions: screenOptionsTabBarIcon,
            tabBarOptions: tabBarOptions,
            navigatorType: "tab",
            childrenNode: [
                {
                    component: BitcoinHomeScreen,
                    name: "BitcoinHome",
                    path: "bitcoin-home",
                    navigatorType: "tab",
                },
                {
                    component: BitcoinAlertScreen,
                    name: "BitcoinAlert",
                    path: "bitcoin-alert/:isPush",
                    initialParams: {"isPush": true},
                    navigatorType: "tab",
                }
            ]
        },
        {
            component: SettingsScreen,
            name: "Settings",
            path: "settings",
            options: optionsHeaderAndAnimation,
            navigatorType: "stack",
        },
        {
            component: DemoSuspenseScreen,
            name: "DemoSuspense",
            path: "demo-suspense",
            options: optionsHeaderAndAnimation,
            navigatorType: "stack",
        },
        {
            component: DemoThemeScreen,
            name: "DemoTheme",
            path: "demo-theme",
            options: optionsHeaderAndAnimation,
            navigatorType: "stack",
        },
    ]
}

const RecursiveNavigator: React.FC<RecursiveNavigatorProps> = ({node}) => {
    const {t} = useTranslation();
    const {stack} = node;
    const Navigator = stack?.Navigator;
    const props = propsExtract(node);
    const ScreenComponent: React.ElementType = (stack && stack.Screen) ? stack.Screen : View;
    const authState = (node.name === "RootStack") ? useSelector((store: RootState) => store.authState) : null;
    return Navigator
        ? <Navigator {...props}>
            {authState && authState.accessToken === undefined
                ? <ScreenComponent component={SignInScreen} name="SignIn" options={{
                    ...optionsHeaderAndAnimation,
                    title: t(`screens.SignIn.title`)
                }}/>
                : <>
                    {node.childrenNode && node.childrenNode.map((childScreen) => {
                        return <ScreenComponent {...childScreen}
                                                options={{
                                                    ...childScreen.options,
                                                    title: t(`screens.${childScreen.name}.title`)
                                                }} key={childScreen.name}>
                            {(childScreen.childrenNode && childScreen.childrenNode.length > 0)
                                ?
                                (navProps: any) => {
                                    return <RecursiveNavigator {...navProps} node={childScreen}/>
                                }
                                : null
                            }
                        </ScreenComponent>
                    })}
                </>
            }
        </Navigator>
        : null;
}

const NavigatorTree: React.FC = () => <RecursiveNavigator node={node}/>;
const recursiveConfig = (childrenNode: NavigatorTreeNode[]): LinkingConfig => {
    let obj: LinkingConfigTraversable = {};
    childrenNode.forEach(child => {
        const name = child.name;
        if (name) {
            obj[name] = {
                path: child.path,
                parse: child.parse,
                stringify: child.stringify,
                exact: child.exact,
                initialRouteName: child.initialParams,
                screens: (child.childrenNode && child.childrenNode.length) ? recursiveConfig(child.childrenNode) : undefined,
            }
        } else {
            obj = {}
        }
    })
    return obj;
};

export const getLinkingConfigScreens = (): PathConfigMap => {
    const config = recursiveConfig([node]) as Traversable;
    return (config[Object.keys(config)[0]] as unknown as LinkingConfig).screens as unknown as PathConfigMap;
}

export default NavigatorTree;
