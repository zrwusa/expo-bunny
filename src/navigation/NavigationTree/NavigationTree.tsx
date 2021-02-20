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
import TabHomeScreen from "../../screens/DemoTab/TabHome";
import TabSettingsScreen from "../../screens/DemoTab/TabSettings";
import RNHome from "../../screens/DemoRNComponents/RNHome";
import RNSectionListScreen from "../../screens/DemoRNComponents/RNSectionList";
import RNFlatListScreen from "../../screens/DemoRNComponents/RNFlatList";
import RNKeyboardAvoidingScreen from "../../screens/DemoRNComponents/RNKeyboardAvoiding";
import RNSafeAreaScreen from "../../screens/DemoRNComponents/RNSafeArea";
import RNVirtualizedListScreen from "../../screens/DemoRNComponents/RNVirtualizedList";
import DemoShareScreen from "../../screens/DemoShare";
import {Platform, TouchableOpacity, View} from "react-native";
import BitcoinHomeScreen from "../../screens/DemoBitcoin/BitcoinHome";
import BitcoinAlertScreen from "../../screens/DemoBitcoin/BitcoinAlert";
import SettingsScreen from "../../screens/Settings";
import DemoThemeScreen from "../../screens/DemoTheme";
import {ELanguage, EThemes} from "../../utils/constants";
import {restoreAndSaveLanguage, restoreAndSaveTheme} from "../../stores/sys/actions";
import SettingsItem from "../../screens/Settings/SettingsItem/SettingsItem";
import {DemoSuspenseScreen} from "../../screens/DemoSuspense";
import {useTranslation} from "react-i18next";
import DrawerHomeScreen from "../../screens/DemoDrawer/DrawerHome/DrawerHome";
import DrawerSettingsScreen from "../../screens/DemoDrawer/DrawerSettings/DrawerSettings";
import {DefaultNavigatorOptions} from "@react-navigation/core/src/types";
import {BottomTabBarOptions, BottomTabNavigationOptions}
    from "react-navigation-bottom-tabs-no-warnings/lib/typescript/src/types";
import {StackNavigationOptions} from "@react-navigation/stack";
import {
    DrawerActions,
    NavigationContainer, NavigationContainerProps, NavigationContainerRef,
    PathConfigMap
} from "@react-navigation/native";
import {Traversable} from "../../types/utils";
import {IcoMoon} from "../../components/base-ui";
import {
    LinkingConfig, LinkingConfigTraversable,
    RecursiveNavigatorProps, NavigatorTreeNode
} from "../../types/utils"
import {getIconNameByRoute, navigatorPropsExtract} from "../../utils/helpers";
import DemoNotificationScreen from "../../screens/DemoNotification";
import NestedLv1HomeScreen from "../../screens/DemoLv0Nested/NestedLv1Home";
import NestedLv2HomeScreen from "../../screens/DemoLv0Nested/NestedLv1Settings/NestedLv2Home";
import NestedLv2SettingsScreen from "../../screens/DemoLv0Nested/NestedLv1Settings/NestedLv2Settings";
import ModalHomeScreen from "../../screens/DemoModal/ModalHome";
import {useTheme} from "../../styles/theme";
import DemoChatScreen from "../../screens/DemoChat";
import {useReduxDevToolsExtension} from "@react-navigation/devtools";
import * as Linking from "expo-linking";
import {DocumentTitleOptions, LinkingOptions, Theme} from "@react-navigation/native/lib/typescript/src/types";
import {useSizer} from "../../styles/sizer";
import {getStyles} from "./styles";

export const basePath = Linking.makeUrl('/');

export type NavigatorTreeProps = Omit<NavigationContainerProps, 'children'> & {
    theme?: Theme | undefined;
    linking?: LinkingOptions | undefined;
    fallback?: React.ReactNode;
    documentTitle?: DocumentTitleOptions | undefined;
    onReady?: (() => void) | undefined;
}

// Explicitly define a navigation tree, the navigation of the entire App is clear at a glance
const NavigationTree: React.FC<NavigatorTreeProps> = (props) => {
    const {ms, responsive} = useSizer();
    const {wp} = responsive.iphoneX;
    const {t, i18n} = useTranslation();
    const styles = getStyles();

    const headerRight = () => {
        const {themeName, language} = useSelector((rootState: RootState) => rootState.sysState)
        const dispatch = useDispatch()
        return (<View style={styles.settingBox}>
            <SettingsItem
                label=""
                value={themeName === EThemes.dark}
                onValueChange={(value) => {
                    dispatch(restoreAndSaveTheme({themeName: value ? EThemes.dark : EThemes.default}));
                }}
            />
            {/*<SettingsItem*/}
            {/*    label=""*/}
            {/*    value={language === ELanguage.zh}*/}
            {/*    onValueChange={(value) => {*/}
            {/*        const lang = value ? ELanguage.zh : ELanguage.en;*/}
            {/*        dispatch(restoreAndSaveLanguage({language: lang}));*/}
            {/*        i18n.changeLanguage(lang).then(() => undefined)*/}
            {/*    }}/>*/}
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
                const {colors} = useTheme()
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
        tabStyle: {justifyContent: 'center'},
        labelStyle: {
            fontSize: ms.fs.xxs,
        },
        style: {
            // height: wp(50)
        }
    }

    const screenOptionsTabBarIcon: DefaultNavigatorOptions<BottomTabNavigationOptions>["screenOptions"] = ({route}) => {
        return {
            tabBarIcon: ({focused, color, size}) => {
                const name = getIconNameByRoute(route.name, focused)
                return <IcoMoon name={name} style={{color: color}} size={size}/>;
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
            // {
            //     component: SignInScreen,
            //     name: "SignIn",
            //     path: "sign-in",
            //     navigatorType: "stack"
            // },
            {
                component: ProfileScreen,
                name: "Profile",
                path: "profile/:id",
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
                component: DemoChatScreen,
                name: "DemoChat",
                path: "demo-chat",
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
                name: "DemoModal",
                stack: Stacks.DemoModalStack,
                path: "demo-modal",
                navigatorType: "stack",
                mode: "modal",
                headerMode: "none",
                childrenNode: [
                    {
                        component: ModalHomeScreen,
                        name: "ModalHome",
                        path: "modal-home",
                        navigatorType: "stack",
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
                        }
                    }
                ]
            },
            {
                name: "DemoTab",
                stack: Stacks.DemoTabStack,
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
                options: {
                    ...optionsHeaderAndAnimation,
                    headerShown: true
                },
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
                stack: Stacks.DemoNestedLv1Stack,
                name: "DemoNestedLv0",
                path: "demo-nested",
                options: {
                    ...optionsHeaderAndAnimation,
                    headerShown: true
                },
                screenOptions: optionsHeaderAndAnimation,
                // initialRouteName:"NestedLv1Home",
                navigatorType: "stack",
                childrenNode: [
                    {
                        component: NestedLv1HomeScreen,
                        name: "NestedLv1Home",
                        path: "nested-home",
                        navigatorType: "stack",
                    },
                    {
                        stack: Stacks.DemoNestedLv2Stack,
                        name: "NestedLv1Settings",
                        path: "nested-settings/:item",
                        options: {headerShown: true},
                        screenOptions: optionsHeaderAndAnimation,
                        navigatorType: "stack",
                        // initialRouteName:"NestedLv2HomeScreen",
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

    const getLinkingConfigScreens = (): PathConfigMap => {
        const config = recursiveConfig([node]) as Traversable;
        return (config[Object.keys(config)[0]] as unknown as LinkingConfig).screens as unknown as PathConfigMap;
    }
    const linking = {
        prefixes: [basePath],
        config: {initialRouteName: "Home", screens: getLinkingConfigScreens()},
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
    const authState = (node.name === "RootStack") ? useSelector((store: RootState) => store.authState) : null;
    return Navigator
        ? <Navigator {...props}>
            {authState && authState.accessToken === undefined
                ? <ScreenComponent component={SignInScreen} name="SignIn" options={{
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

export default NavigationTree;
