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
import NestedSettingsScreen from "../../screens/DemoNested/NestedSettings";
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
import {EThemes} from "../../types/enums";
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
import {Traversable, TraversableNested} from "../../types/helpers";
import {Icon} from "../../components/base-ui";
import {Config, ConfigTraversable, RecursiveNavigatorProps, Screen} from "../../types/common"
import {getIconName, propsExtract} from "../../common/tools";

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

const screenOptionsTabBarIcon: DefaultNavigatorOptions<BottomTabNavigationOptions>["screenOptions"] = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
        const name = getIconName(route.name, focused)
        return <Icon name={name} style={{color: color}} size={size}/>;
    }
})

const node: Screen = {
    stack: Stacks.RootStack,
    name: "RootStack",
    signInComponent: SignInScreen,
    options: optionsHeaderAndAnimation,
    headerMode: "float",
    screenOptions: {...optionsHeaderAndAnimation},
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
        {
            name: "DemoTab", stack: Stacks.DemoTabStack, path: "demo-tab",
            options: optionsHeaderAndAnimation,
            tabBarOptions: tabBarOptions,
            screenOptions: screenOptionsTabBarIcon,
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
            options: {...optionsHeaderAndAnimation, headerShown: true},
            screenOptions: optionsDraw,
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
            options: {...optionsHeaderAndAnimation, headerShown: true},
            screenOptions: optionsHeaderAndAnimation,
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
            screenOptions: screenOptionsTabBarIcon,
            tabBarOptions: tabBarOptions,
            screens: [
                {
                    component: RNHome,
                    name: "RNHome",
                    path: "rn-home",
                },
                {
                    component: RNFlatListScreen,
                    name: "RNFlatList",
                    path: "rn-flat-list",
                },
                {
                    component: RNSectionListScreen,
                    name: "RNSectionList",
                    path: "rn-section-list",
                },
                {
                    component: RNVirtualizedListScreen,
                    name: "RNVirtualizedList",
                    path: "rn-virtualized-list",
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
                }
            ]
        },
        {
            name: "DemoBitcoin",
            stack: Stacks.DemoBitcoinStack,
            path: "demo-bitcoin",
            screenOptions: screenOptionsTabBarIcon,
            tabBarOptions: tabBarOptions,
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
            options: optionsHeaderAndAnimation,
        },
        {
            component: DemoSuspenseScreen, name: "DemoSuspense", path: "demo-suspense",
            options: optionsHeaderAndAnimation,
        },
        {
            component: DemoThemeScreen, name: "DemoTheme", path: "demo-theme",
            options: optionsHeaderAndAnimation,
        },
    ]
}

const RecursiveNavigator: React.FC<RecursiveNavigatorProps> = ({node}) => {
    const {t} = useTranslation();
    const {stack, ...rest} = node;
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
                    {node.screens && node.screens.map((screen) => {
                        return <ScreenComponent {...screen}
                                                options={{
                                                    ...screen.options,
                                                    title: t(`screens.${screen.name}.title`)
                                                }} key={screen.name}>
                            {(screen.screens && screen.screens.length > 0)
                                ?
                                (navProps: any) => {
                                    return <RecursiveNavigator {...navProps} node={screen}/>
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

const RootNavigator: React.FC = () => <RecursiveNavigator node={node}/>;
const recursiveConfig = (screens: Screen[]): Config => {
    let obj: ConfigTraversable = {};
    screens.forEach(screen => {
        const name = screen.name;
        if (name) {
            obj[name] = {
                path: screen.path,
                parse: screen.parse,
                stringify: screen.stringify,
                exact: screen.exact,
                initialRouteName: screen.initialParams,
                screens: (screen.screens && screen.screens.length) ? recursiveConfig(screen.screens) : undefined,
            }
        } else {
            obj = {}
        }
    })
    return obj;
};

export const getScreensConfig = (): PathConfigMap => {
    const config = recursiveConfig([node]) as Traversable;
    return (config[Object.keys(config)[0]] as unknown as Config).screens as unknown as PathConfigMap;
}

export default RootNavigator;
