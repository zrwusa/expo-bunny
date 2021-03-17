import * as React from "react";
import * as Stacks from "../stacks";
import HomeScreen from "../../screens/Home";
import {AuthScreen} from "../../screens/Auth";
import ProfileScreen from "../../screens/Profile";
import DemoFCReduxHookScreen from "../../screens/DemoFCReduxHook";
import DemoCollectionScreen from "../../screens/DemoCollection";
import DemoRouteScreen from "../../screens/DemoRoute";
import DemoThirdPartScreen from "../../screens/DemoThirdPart";
import DemoMapScreen from "../../screens/DemoMap/DemoMap";
import DemoThunkCCScreen from "../../screens/DemoThunkCC";
import TabHomeScreen from "../../screens/DemoTab/Home";
import TabSettingsScreen from "../../screens/DemoTab/Settings";
import RNHome from "../../screens/DemoRNComponents/RNHome";
import RNSectionListScreen from "../../screens/DemoRNComponents/RNSectionList";
import RNFlatListScreen from "../../screens/DemoRNComponents/RNFlatList";
import RNKeyboardAvoidingScreen from "../../screens/DemoRNComponents/RNKeyboardAvoiding";
import RNSafeAreaScreen from "../../screens/DemoRNComponents/RNSafeArea";
import RNVirtualizedListScreen from "../../screens/DemoRNComponents/RNVirtualizedList";
import DemoShareScreen from "../../screens/DemoShare";
import {Platform, TouchableOpacity, View} from "react-native";
import CryptoCurrencyHomeScreen from "../../screens/DemoCryptoCurrency/Home";
import CryptoCurrencyAlertScreen from "../../screens/DemoCryptoCurrency/Alert";
import SettingsScreen from "../../screens/Settings";
import DemoThemeScreen from "../../screens/DemoTheme";
import BunnyConstants, {EThemes} from "../../constants/constants";
import SettingsItem from "../../screens/Settings/Item/Item";
import {DemoSuspenseScreen} from "../../screens/DemoSuspense";
import {useTranslation} from "react-i18next";
import DrawerHomeScreen from "../../screens/DemoDrawer/Home/Home";
import DrawerSettingsScreen from "../../screens/DemoDrawer/Settings/Settings";
import {DefaultNavigatorOptions} from "@react-navigation/core/src/types";
import {BottomTabBarOptions, BottomTabNavigationOptions} from "react-navigation-bottom-tabs-no-warnings/lib/typescript/src/types";
import {StackNavigationOptions} from "@react-navigation/stack";
import {DrawerActions, NavigationContainer, NavigationContainerProps, NavigationContainerRef, PathConfigMap} from "@react-navigation/native";
import {LinkingConfig, LinkingConfigTraversable, NavigatorTreeNode, RecursiveNavigatorProps, ThemeName, JSONSerializable} from "../../types";
import {IcoMoon} from "../../components/UI";
import {getIconNameByRoute, navigatorPropsExtract} from "../../helpers";
import DemoNotificationScreen from "../../screens/DemoNotification";
import NestedLv1HomeScreen from "../../screens/DemoLv0Nested/NestedLv1Home";
import NestedLv2HomeScreen from "../../screens/DemoLv0Nested/NestedLv1Settings/NestedLv2Home";
import NestedLv2SettingsScreen from "../../screens/DemoLv0Nested/NestedLv1Settings/NestedLv2Settings";
import ModalHomeScreen from "../../screens/DemoModal/Home";
import {useThemeLabor} from "../../providers/theme-labor";
import DemoChatScreen from "../../screens/DemoChat";
import {useReduxDevToolsExtension} from "@react-navigation/devtools";
import * as Linking from "expo-linking";
import {DocumentTitleOptions, LinkingOptions, Theme} from "@react-navigation/native/lib/typescript/src/types";
import {useSizeLabor} from "../../providers/size-labor";
import {createStyles} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAuthLabor} from "../../providers/auth-labor";
import {uuidV4} from "../../utils";
import DemoSagaScreen from "../../screens/DemoSaga";
import {NotSupport} from "../../components/NotSupport";
import {useSafeAreaInsets} from "react-native-safe-area-context";


export const basePath = Linking.makeUrl('/');

export type NavigatorTreeProps = Omit<NavigationContainerProps, 'children'> & {
    theme?: Theme | undefined;
    linking?: LinkingOptions | undefined;
    fallback?: React.ReactNode;
    documentTitle?: DocumentTitleOptions | undefined;
    onReady?: (() => void) | undefined;
}

// Explicitly define a navigation tree, the navigation of the entire App is clear at a glance
const NavigatorTree: React.FC<NavigatorTreeProps> = (props) => {
    const {ms, responsive} = useSizeLabor();
    const {wp, hp} = responsive.iphoneX;
    const {t} = useTranslation();
    const styles = createStyles();
    const insets = useSafeAreaInsets();
    const headerRight = () => {
        const {theme, changeTheme} = useThemeLabor();
        return (<View style={styles.settingBox}>
            <SettingsItem
                label=""
                value={theme.dark}
                onValueChange={async (value) => {
                    const themeName: ThemeName = value ? EThemes.dark : EThemes.light;
                    await AsyncStorage.setItem(BunnyConstants.THEME_NAME_PERSISTENCE_KEY, themeName)
                    if (changeTheme) {
                        changeTheme(themeName);
                    }
                }}
            />
        </View>)
    }

    const optionsHeaderAndAnimation: StackNavigationOptions = {
        animationEnabled: true,
        headerRight: headerRight,
        headerTitleStyle: {
            fontSize: ms.fs.m
        },
        headerLeftContainerStyle: {},
        headerBackImage: ({tintColor}) => <IcoMoon
            name="chevron-left1"
            style={{
                fontSize: ms.fs.xxl,
                color: tintColor
            }}/>,
        headerStyle: {
            height: Platform.select({
                web: wp(50),
            })
        }
    }

    const optionsDraw = ({navigation}: any) => {
        return {
            headerStyle: {
                height: wp(50)
            },
            headerShown: true,
            headerLeft: ({tintColor}: any) => {
                const {colors} = useThemeLabor().theme
                return (<TouchableOpacity onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer())
                }}>
                    <IcoMoon
                        name="menu"
                        style={{
                            paddingLeft: ms.sp.l,
                            fontSize: ms.fs.l,
                            color: colors.text
                        }}/>
                </TouchableOpacity>)
            },
            headerStatusBarHeight: Platform.select({native: 0})
        }
    }

    const tabBarOptions: BottomTabBarOptions = {
        tabStyle: {
            justifyContent: 'center'
        },
        labelStyle: {
            fontSize: ms.fs.xxs,
        },
        style: {
            height: wp(46) + insets.bottom
        }
    }

    const screenOptionsTabBarIcon: DefaultNavigatorOptions<BottomTabNavigationOptions>["screenOptions"] = ({route}) => {
        return {
            tabBarIcon: ({focused, color, size}) => {
                const name = getIconNameByRoute(route.name, focused)
                return <IcoMoon name={name} style={{color: color}} size={wp(size / 1.25)}/>;
            }
        }
    }

    const node: NavigatorTreeNode = {
        key: uuidV4(),
        stack: Stacks.RootStack,
        name: 'RootStack',
        authScreen: AuthScreen,
        options: optionsHeaderAndAnimation,
        headerMode: 'float',
        screenOptions: optionsHeaderAndAnimation,
        navigatorType: 'stack',
        authRequired: false,
        childrenNode: [
            {
                key: uuidV4(),
                component: HomeScreen,
                name: 'Home',
                path: 'home',
                navigatorType: 'stack',
                authRequired: false
            },
            // {
            //     component: AuthScreen,
            //     name: 'Auth',
            //     path: 'auth',
            //     navigatorType: 'stack',
            //     authRequired: false
            // },
            {
                key: uuidV4(),
                component: ProfileScreen,
                name: 'Profile',
                path: 'profile/:id',
                parse: {
                    id: (id: string) => `${id}`,
                },
                navigatorType: 'stack',
                authRequired: true
            },
            {
                key: uuidV4(),
                component: DemoFCReduxHookScreen,
                name: 'DemoFCReduxHook',
                path: 'demo-fc-redux-hook',
                navigatorType: 'stack',
                authRequired: false
            },
            {
                key: uuidV4(),
                component: DemoCollectionScreen,
                name: 'DemoCollection',
                path: 'demo-collection',
                navigatorType: 'stack',
                authRequired: false
            },
            {
                key: uuidV4(),
                component: DemoRouteScreen,
                name: 'DemoRoute',
                path: 'demo-route',
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
                navigatorType: 'stack',
                authRequired: false
            },
            {
                key: uuidV4(),
                component: DemoThirdPartScreen,
                name: 'DemoThirdPart',
                path: 'demo-third-part',
                navigatorType: 'stack',
                authRequired: false
            },
            {
                key: uuidV4(),
                component: DemoThunkCCScreen,
                name: 'DemoThunkCC',
                path: 'demo-thunk-cc',
                navigatorType: 'stack',
                authRequired: false
            },
            {
                key: uuidV4(),
                component: DemoSagaScreen,
                name: 'DemoSaga',
                path: 'demo-saga',
                navigatorType: 'stack',
                authRequired: false
            },
            {
                key: uuidV4(),
                component: DemoMapScreen,
                name: 'DemoMap',
                path: 'demo-map',
                navigatorType: 'stack',
                authRequired: false
            },
            {
                key: uuidV4(),
                component: DemoChatScreen,
                name: 'DemoChat',
                path: 'demo-chat',
                navigatorType: 'stack',
                authRequired: false
            },
            {
                key: uuidV4(),
                component: DemoShareScreen,
                name: 'DemoShare',
                path: 'demo-share',
                navigatorType: 'stack',
                authRequired: false
            },
            {
                key: uuidV4(),
                component: Platform.OS !== 'web'
                    ? DemoNotificationScreen
                    : () => <NotSupport text='Not supported on web'/>,
                name: 'DemoNotification',
                path: 'demo-notification',
                navigatorType: 'stack',
                authRequired: false
            },
            {
                key: uuidV4(),
                name: 'DemoModal',
                stack: Stacks.DemoModalStack,
                path: 'demo-modal',
                navigatorType: 'stack',
                mode: 'modal',
                headerMode: 'none',
                authRequired: false,
                childrenNode: [
                    {
                        key: uuidV4(),
                        component: ModalHomeScreen,
                        name: 'ModalHome',
                        path: 'home',
                        navigatorType: 'stack',
                        options: {
                            animationEnabled: true,
                            cardStyle: {backgroundColor: 'transparent'},
                            cardOverlayEnabled: true,
                            cardStyleInterpolator: ({current: {progress}}: any) => {
                                return {
                                    cardStyle: {
                                        opacity: progress.interpolate({
                                            inputRange: [0, 0.5, 0.9, 1],
                                            outputRange: [0, 0.25, 0.7, 1],
                                        }),
                                    },
                                    overlayStyle: {
                                        opacity: progress.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, 0.5],
                                            extrapolate: 'clamp',
                                        }),
                                    },
                                };
                            },
                        },
                        authRequired: false
                    }
                ]
            },
            {
                key: uuidV4(),
                name: 'DemoTab',
                stack: Stacks.DemoTabStack,
                path: 'demo-tab',
                options: optionsHeaderAndAnimation,
                tabBarOptions: tabBarOptions,
                screenOptions: screenOptionsTabBarIcon,
                navigatorType: 'tab',
                authRequired: false,
                childrenNode: [
                    {
                        key: uuidV4(),
                        component: TabHomeScreen,
                        name: 'TabHome',
                        path: 'home',
                        navigatorType: 'tab',
                        authRequired: false
                    },
                    {
                        key: uuidV4(),
                        component: TabSettingsScreen,
                        name: 'TabSettings',
                        path: 'settings/:item',
                        initialParams: {'item': 'item-001'},
                        parse: {
                            item: (item: string) => `${item}`,
                        },
                        navigatorType: 'tab',
                        authRequired: false
                    }
                ]
            },
            {
                key: uuidV4(),
                name: 'DemoDrawer',
                stack: Stacks.DemoDrawerStack,
                path: 'demo-drawer',
                drawerType: 'front',
                openByDefault: false,
                options: {
                    ...optionsHeaderAndAnimation,
                    headerShown: true
                },
                screenOptions: optionsDraw,
                navigatorType: 'drawer',
                authRequired: false,
                childrenNode: [
                    {
                        key: uuidV4(),
                        component: DrawerHomeScreen,
                        name: 'DrawerHome',
                        path: 'home',
                        navigatorType: 'drawer',
                        authRequired: false
                    },
                    {
                        key: uuidV4(),
                        component: DrawerSettingsScreen,
                        name: 'DrawerSettings',
                        path: 'settings/:item',
                        initialParams: {'item': 'item-001'},
                        parse: {
                            item: (item: string) => `${item}`,
                        },
                        navigatorType: 'drawer',
                        authRequired: false
                    }
                ]
            },
            {
                key: uuidV4(),
                stack: Stacks.DemoNestedLv1Stack,
                name: 'DemoNestedLv0',
                path: 'demo-nested',
                options: {
                    ...optionsHeaderAndAnimation,
                    headerShown: true
                },
                screenOptions: optionsHeaderAndAnimation,
                navigatorType: 'stack',
                authRequired: false,
                childrenNode: [
                    {
                        key: uuidV4(),
                        component: NestedLv1HomeScreen,
                        name: 'NestedLv1Home',
                        path: 'home',
                        navigatorType: 'stack',
                        authRequired: false
                    },
                    {
                        key: uuidV4(),
                        stack: Stacks.DemoNestedLv2Stack,
                        name: 'NestedLv1Settings',
                        path: 'settings/:item',
                        options: {headerShown: true},
                        screenOptions: optionsHeaderAndAnimation,
                        navigatorType: 'stack',
                        authRequired: false,
                        // initialRouteName:'NestedLv2HomeScreen',
                        childrenNode: [
                            {
                                key: uuidV4(),
                                component: NestedLv2HomeScreen,
                                name: 'NestedLv2Home',
                                path: 'lv2-home',
                                navigatorType: 'stack',
                                authRequired: false,
                            },
                            {
                                key: uuidV4(),
                                component: NestedLv2SettingsScreen,
                                name: 'NestedLv2Settings',
                                path: 'lv2-settings/:itemlv2',
                                parse: {
                                    itemlv2: (itemlv2: string) => `${itemlv2}`,
                                },
                                navigatorType: 'stack',
                                authRequired: false,
                            }
                        ]
                    }
                ]
            },
            {
                key: uuidV4(),
                name: 'DemoRNComponents',
                path: 'demo-tab-rn-components',
                stack: Stacks.DemoTabRNComponentsStack,
                screenOptions: screenOptionsTabBarIcon,
                tabBarOptions: tabBarOptions,
                navigatorType: 'tab',
                authRequired: false,
                childrenNode: [
                    {
                        key: uuidV4(),
                        component: RNHome,
                        name: 'RNHome',
                        path: 'home',
                        navigatorType: 'tab',
                        authRequired: false,

                    },
                    {
                        key: uuidV4(),
                        component: RNFlatListScreen,
                        name: 'RNFlatList',
                        path: 'flat-list',
                        navigatorType: 'tab',
                        authRequired: false,

                    },
                    {
                        key: uuidV4(),
                        component: RNSectionListScreen,
                        name: 'RNSectionList',
                        path: 'section-list',
                        navigatorType: 'tab',
                        authRequired: false,
                    },
                    {
                        key: uuidV4(),
                        component: RNVirtualizedListScreen,
                        name: 'RNVirtualizedList',
                        path: 'virtualized-list',
                        navigatorType: 'tab',
                        authRequired: false,
                    },
                    {
                        key: uuidV4(),
                        component: RNKeyboardAvoidingScreen,
                        name: 'RNNoKeyboard',
                        path: 'keyboard-avoiding',
                        navigatorType: 'tab',
                        authRequired: false,
                    },
                    {
                        key: uuidV4(),
                        component: RNSafeAreaScreen,
                        name: 'RNSafeArea',
                        path: 'safe-area',
                        navigatorType: 'tab',
                        authRequired: false,
                    }
                ]
            },
            {
                key: uuidV4(),
                name: 'DemoCryptoCurrency',
                stack: Stacks.DemoCryptoCurrencyStack,
                path: 'demo-crypto-currency',
                screenOptions: screenOptionsTabBarIcon,
                tabBarOptions: tabBarOptions,
                navigatorType: 'tab',
                authRequired: false,
                childrenNode: [
                    {
                        key: uuidV4(),
                        component: CryptoCurrencyHomeScreen,
                        name: 'CryptoCurrencyHome',
                        path: 'home',
                        navigatorType: 'top',
                        authRequired: false,
                    },
                    {
                        key: uuidV4(),
                        component: Platform.OS !== 'web'
                            ? CryptoCurrencyAlertScreen
                            : () => <NotSupport text="Not supported on web"/>,
                        name: 'CryptoCurrencyAlert',
                        path: 'alert/:isPush',
                        initialParams: {isPush: true},
                        navigatorType: 'tab',
                        authRequired: false,
                    }
                ]
            },
            {
                key: uuidV4(),
                component: SettingsScreen,
                name: 'Settings',
                path: 'settings',
                options: optionsHeaderAndAnimation,
                navigatorType: 'stack',
                authRequired: false,
            },
            {
                key: uuidV4(),
                component: DemoSuspenseScreen,
                name: 'DemoSuspense',
                path: 'demo-suspense',
                options: optionsHeaderAndAnimation,
                navigatorType: 'stack',
                authRequired: false,

            },
            {
                key: uuidV4(),
                component: DemoThemeScreen,
                name: 'DemoTheme',
                path: 'demo-theme',
                options: optionsHeaderAndAnimation,
                navigatorType: 'stack',
                authRequired: false,

            },
        ]
    }

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
                    screens: (child.childrenNode && child.childrenNode.length)
                        ? recursiveConfig(child.childrenNode)
                        : undefined,
                }
            } else {
                obj = {}
            }
        })
        return obj;
    };

    const getLinkingConfigScreens = (): PathConfigMap => {
        const config = recursiveConfig([node]) as JSONSerializable;
        return (config[Object.keys(config)[0]] as unknown as LinkingConfig).screens as unknown as PathConfigMap;
    }

    const linking = {
        prefixes: [basePath],
        config: {initialRouteName: 'Home', screens: getLinkingConfigScreens()},
    };

    const navigationRef = React.useRef<NavigationContainerRef>(null);

    useReduxDevToolsExtension(navigationRef);
    return <NavigationContainer
        documentTitle={{
            formatter: (options, route) => `${options?.title ?? route?.name} - ${t('titleFormat')}`,
        }}
        {...props}
        linking={linking}
        ref={navigationRef}>
        <RecursiveNavigator node={node}/>
    </NavigationContainer>
};

const RecursiveNavigator: React.FC<RecursiveNavigatorProps> = ({node}) => {
    const {t} = useTranslation();
    const {stack} = node;
    const Navigator = stack?.Navigator;
    const props = navigatorPropsExtract(node);
    const ScreenComponent: React.ElementType = (stack && stack.Screen) ? stack.Screen : View;
    const {authResult} = useAuthLabor()
    return Navigator
        ? <Navigator {...props}>
            {authResult && !authResult.accessToken
                ? <ScreenComponent component={AuthScreen} name="Auth" options={{
                    title: t(`screens.Auth.title`)
                }}/>
                : <>
                    {node.childrenNode && node.childrenNode.map((childScreen) => {
                        return <ScreenComponent {...childScreen}
                                                options={{
                                                    ...childScreen.options,
                                                    title: t(`screens.${childScreen.name}.title`)
                                                }} key={childScreen.key}>
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

export default NavigatorTree;
