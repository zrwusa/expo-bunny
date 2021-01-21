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
    options?: any,
    tabBarOptions?: any
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

const customOptions = {
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
    screens: [
        {
            component: HomeScreen, name: "Home", path: "home",
            options: customOptions,
        },
        {
            component: ProfileScreen, name: "Profile", path: "profile/:id",
            parse: {
                id: (id: string) => `${id}`,
            },
            options: customOptions
        },
        {
            component: DemoFCReduxHookScreen,
            name: "DemoFCReduxHook", path: "demo-fc-redux-hook",
            options: customOptions
        },
        {
            component: DemoCollectionScreen,
            name: "DemoCollection", path: "demo-collection",
            options: customOptions,
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
            options: customOptions,
        },
        {
            component: DemoThirdPartScreen, name: "DemoThirdPart", path: "demo-third-part",
            options: customOptions,
        },
        {
            component: DemoThunkCCScreen, name: "DemoThunkCC", path: "demo-thunk-cc",
            options: customOptions,
        },
        {
            component: DemoMapScreen, name: "DemoMap", path: "demo-map",
            options: customOptions,
        },
        {
            component: TestMapScreen, name: "TestMap", path: "test-map",
            options: customOptions,
        },
        {
            component: DemoShareScreen, name: "DemoShare", path: "demo-share",
            options: customOptions,
        },
        // {
        //     component: SignInScreen, name: "SignIn", path: "sign-in",
        //     options: customOptions
        // },
        {
            name: "DemoTab", stack: Stacks.DemoTabStack, path: "demo-tab",
            options: customOptions,
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
            name: "DemoNested", path: "demo-nested", stack: Stacks.DemoNestedStack,
            screens: [
                {
                    component: NestedHomeScreen,
                    name: "NestedHome",
                    path: "nested-home",
                    options: customOptions,
                },
                {
                    component: NestedSettingsScreen,
                    name: "NestedSettings",
                    path: "nested-settings/:item",
                    parse: {
                        item: (item: string) => `${item}`,
                    },
                    options: customOptions,
                }
            ]
        },
        {
            name: "DemoRNComponents",
            path: "demo-tab-rn-components",
            stack: Stacks.DemoTabRNComponentsStack,
            options: customOptions,
            screens: [
                {
                    component: RNHome,
                    name: "RNHome",
                    path: "rn-home",
                    options: customOptions,
                },
                {
                    component: RNSectionListScreen,
                    name: "RNSectionList",
                    path: "rn-section-list",
                    options: customOptions,
                },
                {
                    component: RNFlatListScreen,
                    name: "RNFlatList",
                    path: "rn-flat-list",
                    options: customOptions,
                },
                {
                    component: RNKeyboardAvoidingScreen,
                    name: "RNNoKeyboard",
                    path: "rn-keyboard-avoiding",
                    options: customOptions,
                },
                {
                    component: RNSafeAreaScreen,
                    name: "RNSafeArea",
                    path: "rn-safe-area",
                    options: customOptions,
                },
                {
                    component: RNVirtualizedListScreen,
                    name: "RNVirtualizedList",
                    path: "rn-virtualized-list",
                    options: customOptions,
                }

            ]
        },
        {
            name: "DemoBitcoin",
            stack: Stacks.DemoBitcoinStack,
            path: "demo-bitcoin",
            options: customOptions,
            screens: [
                {
                    component: BitcoinHomeScreen,
                    name: "BitcoinHome",
                    path: "bitcoin-home",
                    options: customOptions,
                },
                {
                    component: BitcoinAlertScreen,
                    name: "BitcoinAlert",
                    path: "bitcoin-alert/:isPush",
                    initialParams: {"isPush": true},
                    options: customOptions,
                }
            ]
        },
        {
            component: SettingsScreen, name: "Settings", path: "settings",
            options: customOptions,
        },
        {
            component: DemoSuspenseScreen, name: "DemoSuspense", path: "demo-suspense",
            options: customOptions,
        },
        {
            component: DemoThemeScreen, name: "DemoTheme", path: "demo-theme",
            options: customOptions,
        },
    ]
}

type RecursiveNavigatorProps = { node: Screen }
const RecursiveNavigator: React.FC<RecursiveNavigatorProps> = ({node}) => {
    const {t} = useTranslation();
    const {stack, ...rest} = node;
    const Navigator = stack?.Navigator;
    let ScreenComponent: React.ElementType = (stack && stack.Screen) ? stack.Screen : View;
    const authState = (node.name === "RootStack") ? useSelector((store: RootState) => store.authState) : null;

    return (
        Navigator
            ? <Navigator {...rest}>
                {authState && (authState.accessToken === undefined)
                    ? (<ScreenComponent component={SignInScreen} name="SignIn" options={{
                        ...customOptions,
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
            tabBarOptions: screen.tabBarOptions || undefined
        }
    })
    return obj;
};

export const getScreensConfig = (): Config | undefined => {
    return recursiveConfig([node]).RootStack.screens
}

export default RootNavigator;
