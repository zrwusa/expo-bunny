import {
    RootStack,
    DemoModalStack,
    DemoTabStack,
    DemoDrawerStack,
    DemoCryptoCurrencyStack,
    DemoNestedLv1Stack,
    DemoNestedLv2Stack,
    DemoTabRNComponentsStack
} from "../stacks";
import HomeScreen from "../../screens/Home";
import * as React from "react";
import {AuthScreen} from "../../screens/Auth";
import ProfileScreen from "../../screens/Profile";
import DemoFCReduxHookScreen from "../../screens/DemoFCReduxHook";
import DemoCollectionScreen from "../../screens/DemoCollection";
import DemoRouteScreen from "../../screens/DemoRoute";
import DemoThirdPartScreen from "../../screens/DemoThirdPart";
import DemoThunkCCScreen from "../../screens/DemoThunkCC/DemoThunkCC";
import DemoSagaScreen from "../../screens/DemoSaga";
import DemoMapScreen from "../../screens/DemoMap/DemoMap";
import DemoChatScreen from "../../screens/DemoChat";
import DemoShareScreen from "../../screens/DemoShare";
import {Platform, TouchableOpacity, View} from "react-native";
import DemoNotificationScreen from "../../screens/DemoNotification/DemoNotification";
import {NotSupport} from "../../components/NotSupport";
import TabHomeScreen from "../../screens/DemoTab/Home";
import TabSettingsScreen from "../../screens/DemoTab/Settings";
import {DrawerActions, NavigationContainer, NavigationContainerProps, NavigationContainerRef, RouteProp} from "@react-navigation/native";
import * as Linking from "expo-linking";
import {DocumentTitleOptions, LinkingOptions, Theme} from "@react-navigation/native/lib/typescript/src/types";
import DrawerHomeScreen from "../../screens/DemoDrawer/Home";
import DrawerSettingsScreen from "../../screens/DemoDrawer/Settings";
import NestedLv1HomeScreen from "../../screens/DemoLv0Nested/NestedLv1Home";
import NestedLv2HomeScreen from "../../screens/DemoLv0Nested/NestedLv1Settings/NestedLv2Home";
import NestedLv2SettingsScreen from "../../screens/DemoLv0Nested/NestedLv1Settings/NestedLv2Settings";
import RNHome from "../../screens/DemoRNComponents/RNHome";
import RNFlatListScreen from "../../screens/DemoRNComponents/RNFlatList";
import RNSectionListScreen from "../../screens/DemoRNComponents/RNSectionList/SectionList";
import RNVirtualizedListScreen from "../../screens/DemoRNComponents/RNVirtualizedList";
import RNKeyboardAvoidingScreen from "../../screens/DemoRNComponents/RNKeyboardAvoiding";
import RNSafeAreaScreen from "../../screens/DemoRNComponents/RNSafeArea/SafeArea";
import CryptoCurrencyHomeScreen from "../../screens/DemoCryptoCurrency/Home";
import CryptoCurrencyAlertScreen from "../../screens/DemoCryptoCurrency/Alert/Alert";
import SettingsScreen from "../../screens/Settings/Settings";
import {DemoSuspenseScreen} from "../../screens/DemoSuspense";
import DemoThemeScreen from "../../screens/DemoTheme";
import {useTranslation} from "react-i18next";
import {StackNavigationOptions} from "@react-navigation/stack";
import {IcoMoon} from "../../components/UI";
import {useSizeLabor} from "../../providers/size-labor";
import {createStyles} from "./styles";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useThemeLabor} from "../../providers/theme-labor";
import SettingsItem from "../../screens/Settings/Item/Item";
import {ThemeName} from "../../types";
import {EThemes} from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BunnyConstants from "../../constants/constants";
import {BottomTabBarOptions, BottomTabNavigationOptions} from "react-navigation-bottom-tabs-no-warnings/lib/typescript/src/types";
import {DefaultNavigatorOptions} from "@react-navigation/core/src/types";
import {blError, blSuccess, getIconNameByRoute} from "../../helpers";
import {useAuthLabor} from "../../providers/auth-labor";
import {useEffect} from "react";
import {collectBLResult} from "../../store/actions";
import {useDispatch} from "react-redux";

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
    const dispatch = useDispatch();
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

    const linking = {
        prefixes: [basePath],
        config: {
            initialRouteName: 'Home',
            screens: {
                Home: {
                    name: 'Home',
                    path: 'home',
                },
                Auth: {
                    name: 'Auth',
                    path: 'auth',
                },
                Profile: {
                    name: 'Profile',
                    path: 'profile/:id',
                    initialParams: {'id': '1'},
                    parse: {
                        id: (id: string) => `${id}`,
                    },
                },
                DemoFCReduxHook: {
                    name: 'DemoFCReduxHook',
                    path: 'demo-fc-redux-hook',
                },
                DemoCollection: {
                    name: 'DemoCollection',
                    path: 'demo-collection',
                },
                DemoRoute: {
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
                },
                DemoThirdPart: {
                    name: 'DemoThirdPart',
                    path: 'demo-third-part',
                },
                DemoThunkCC: {
                    name: 'DemoThunkCC',
                    path: 'demo-thunk-cc',
                },
                DemoSaga: {
                    name: 'DemoSaga',
                    path: 'demo-saga',
                },
                DemoMap: {
                    name: 'DemoMap',
                    path: 'demo-map',
                },
                DemoChat: {
                    name: 'DemoChat',
                    path: 'demo-chat',
                },
                DemoShare: {
                    name: 'DemoShare',
                    path: 'demo-share',
                },
                DemoNotification: {
                    name: 'DemoNotification',
                    path: 'demo-notification',
                },
                // {
                //     path: 'demo-modal',
                //     screens: [
                //         {
                //             name: 'ModalHome',
                //             path: 'home',
                //         }
                //     ]
                // },
                DemoTab: {
                    name: 'DemoTab',
                    path: 'demo-tab',
                    screens: {
                        TabHome: {
                            name: 'TabHome',
                            path: 'home',
                        },
                        TabSettings: {
                            name: 'TabSettings',
                            path: 'settings/:item',
                            parse: {
                                item: (item: string) => `${item}`,
                            },
                        }
                    }
                },
                DemoDrawer: {
                    name: 'DemoDrawer',
                    path: 'demo-drawer',
                    screens: {
                        DrawerHome: {
                            name: 'DrawerHome',
                            path: 'home',
                        },
                        DrawerSettings: {
                            name: 'DrawerSettings',
                            path: 'settings/:item',
                            parse: {
                                item: (item: string) => `${item}`,
                            },
                        }
                    }
                },
                DemoNestedLv0: {
                    name: 'DemoNestedLv0',
                    path: 'demo-nested',
                    screens: {
                        NestedLv1Home: {
                            name: 'NestedLv1Home',
                            path: 'home',
                        },
                        NestedLv1Settings: {
                            name: 'NestedLv1Settings',
                            path: 'settings/:item',
                            screens: {
                                NestedLv2Home: {
                                    name: 'NestedLv2Home',
                                    path: 'lv2-home',
                                },
                                NestedLv2Settings: {
                                    name: 'NestedLv2Settings',
                                    path: 'lv2-settings/:itemlv2',
                                    parse: {
                                        itemlv2: (itemlv2: string) => `${itemlv2}`,
                                    },
                                }
                            }
                        }
                    }
                },
                DemoRNComponents: {
                    name: 'DemoRNComponents',
                    path: 'demo-tab-rn-components',
                    screens: {
                        RNHome: {
                            name: 'RNHome',
                            path: 'home',
                        },
                        RNFlatList: {
                            name: 'RNFlatList',
                            path: 'flat-list',
                        },
                        RNSectionList: {
                            name: 'RNSectionList',
                            path: 'section-list',
                        },
                        RNVirtualizedList: {
                            name: 'RNVirtualizedList',
                            path: 'virtualized-list',
                        },
                        RNNoKeyboard: {
                            name: 'RNNoKeyboard',
                            path: 'keyboard-avoiding',
                        },
                        RNSafeArea: {
                            name: 'RNSafeArea',
                            path: 'safe-area',
                        }
                    }
                },
                DemoCryptoCurrency: {
                    name: 'DemoCryptoCurrency',
                    path: 'demo-crypto-currency',
                    screens: {
                        CryptoCurrencyHome: {
                            name: 'CryptoCurrencyHome',
                            path: 'home',
                        },
                        CryptoCurrencyAlert: {
                            name: 'CryptoCurrencyAlert',
                            path: 'alert/:isPush',
                        }
                    }
                },
                Settings: {
                    name: 'Settings',
                    path: 'settings',
                },
                DemoSuspense: {
                    name: 'DemoSuspense',
                    path: 'demo-suspense',

                },
                DemoTheme: {
                    name: 'DemoTheme',
                    path: 'demo-theme',
                },
            }
        },
    };
    const {authResult, authFunctions} = useAuthLabor()
    const needAuth = {
        listeners: () => {
            return {
                focus: function () {
                    authFunctions.authTrigger('SCREEN')
                },
            }
        }
    }


    const optionsTitle = {
        options: function ({route}: any) {
            return {
                title: t(`screens.${route.name}.title`)
            }
        }
    }


    const navigateToAuth = () => {
        if (authResult.isSignedIn) {
            return
        }
        if (navigationRef.current) {
            const curRoute = navigationRef.current.getCurrentRoute()
            if (!curRoute) {
                navigationRef.current.navigate('Auth')
                return
            }
            if (curRoute.name !== 'Auth') {
                navigationRef.current.navigate('Auth', {reference: JSON.stringify(curRoute)})
            } else {
                return
            }
        }
    }

    useEffect(() => {
        console.log('---authResult.triggerType',authResult.triggerType)
        switch (authResult.triggerType) {
            case "API":
                dispatch(collectBLResult(blError(t('sys.apiNeedSignIn'))))
                break;
            case "SCREEN":
                navigateToAuth()
                break;
            case "MANUAL":
                dispatch(collectBLResult(blSuccess(undefined,t('sys.signOutSuccess'))))
                break;
            case "AUTO":
                navigateToAuth()
                break;
            case "OTHERS":
                navigateToAuth()
                break;
        }
    }, [authResult.triggerUUID])

    const navigationRef = React.useRef<NavigationContainerRef>(null);
    return <NavigationContainer
        documentTitle={{
            formatter: (options, route) => `${options?.title ?? route?.name} - ${t('titleFormat')}`,
        }}
        {...props}
        linking={linking}
        ref={navigationRef}>
        <RootStack.Navigator headerMode="float" screenOptions={optionsHeaderAndAnimation}>
            <RootStack.Screen name="Home" component={HomeScreen} {...optionsTitle}/>
            <RootStack.Screen name="Auth" component={AuthScreen} {...optionsTitle} options={{headerLeft: () => null}}/>
            <RootStack.Screen name="Profile" component={ProfileScreen} {...optionsTitle} {...needAuth}/>
            <RootStack.Screen name="DemoFCReduxHook" component={DemoFCReduxHookScreen} {...optionsTitle}/>
            <RootStack.Screen name="DemoCollection" component={DemoCollectionScreen} {...optionsTitle}/>
            <RootStack.Screen name="DemoRoute" component={DemoRouteScreen} {...optionsTitle}/>
            <RootStack.Screen name="DemoThirdPart" component={DemoThirdPartScreen} {...optionsTitle}/>
            <RootStack.Screen name="DemoThunkCC" component={DemoThunkCCScreen} {...optionsTitle}/>
            <RootStack.Screen name="DemoSaga" component={DemoSagaScreen} {...optionsTitle}/>
            <RootStack.Screen name="DemoMap" component={DemoMapScreen} {...optionsTitle}/>
            <RootStack.Screen name="DemoChat" component={DemoChatScreen} {...optionsTitle}/>
            <RootStack.Screen name="DemoShare" component={DemoShareScreen} {...optionsTitle}/>
            <RootStack.Screen name="DemoNotification" component={
                Platform.OS !== 'web'
                    ? DemoNotificationScreen
                    : () => <NotSupport text='Not supported on web'/>} {...optionsTitle}/>
            <RootStack.Screen name="DemoTab">
                {
                    (props) => {
                        return <DemoTabStack.Navigator {...props} screenOptions={screenOptionsTabBarIcon} tabBarOptions={tabBarOptions}>
                            <DemoTabStack.Screen name="TabHome" component={TabHomeScreen} {...optionsTitle}/>
                            <DemoTabStack.Screen name="TabSettings" component={TabSettingsScreen}
                                                 initialParams={{'item': 'item-001'}} {...optionsTitle}/>
                        </DemoTabStack.Navigator>
                    }
                }
            </RootStack.Screen>
            <RootStack.Screen name="DemoDrawer">
                {(props) => {
                    //todo not sure if the props is passed correctly
                    return <DemoDrawerStack.Navigator {...props} screenOptions={optionsDraw}>
                        <DemoDrawerStack.Screen name="DrawerHome" component={DrawerHomeScreen} {...optionsTitle}/>
                        <DemoDrawerStack.Screen name="DrawerSettings" component={DrawerSettingsScreen}
                                                initialParams={{'item': 'item-001'}} {...optionsTitle}/>
                    </DemoDrawerStack.Navigator>
                }}
            </RootStack.Screen>
            <RootStack.Screen name="DemoNestedLv0">
                {(props) => {
                    return <DemoNestedLv1Stack.Navigator {...props} screenOptions={optionsHeaderAndAnimation}>
                        <DemoNestedLv1Stack.Screen name="NestedLv1Home" component={NestedLv1HomeScreen} {...optionsTitle}/>
                        <DemoNestedLv1Stack.Screen name="NestedLv1Settings" {...optionsTitle}>
                            {(props) => {
                                return <DemoNestedLv2Stack.Navigator {...props} screenOptions={optionsHeaderAndAnimation}>
                                    <DemoNestedLv2Stack.Screen name="NestedLv2Home" component={NestedLv2HomeScreen} {...optionsTitle}/>
                                    <DemoNestedLv2Stack.Screen name="NestedLv2Settings" component={NestedLv2SettingsScreen} {...optionsTitle}/>
                                </DemoNestedLv2Stack.Navigator>
                            }}
                        </DemoNestedLv1Stack.Screen>
                    </DemoNestedLv1Stack.Navigator>
                }}
            </RootStack.Screen>
            <RootStack.Screen name="DemoRNComponents">
                {
                    (props) => {
                        return <DemoTabRNComponentsStack.Navigator {...props} screenOptions={screenOptionsTabBarIcon} tabBarOptions={tabBarOptions}>
                            <DemoTabRNComponentsStack.Screen name="RNHome" component={RNHome} {...optionsTitle}/>
                            <DemoTabRNComponentsStack.Screen name="RNFlatList" component={RNFlatListScreen} {...optionsTitle}/>
                            <DemoTabRNComponentsStack.Screen name="RNSectionList" component={RNSectionListScreen} {...optionsTitle}/>
                            <DemoTabRNComponentsStack.Screen name="RNVirtualizedList" component={RNVirtualizedListScreen} {...optionsTitle}/>
                            <DemoTabRNComponentsStack.Screen name="RNNoKeyboard" component={RNKeyboardAvoidingScreen} {...optionsTitle}/>
                            <DemoTabRNComponentsStack.Screen name="RNSafeArea" component={RNSafeAreaScreen} {...optionsTitle}/>
                        </DemoTabRNComponentsStack.Navigator>
                    }
                }
            </RootStack.Screen>
            <RootStack.Screen name="DemoCryptoCurrency">
                {
                    (props) => {
                        return <DemoCryptoCurrencyStack.Navigator {...props} screenOptions={screenOptionsTabBarIcon} tabBarOptions={tabBarOptions}>
                            <DemoCryptoCurrencyStack.Screen name="CryptoCurrencyHome" component={CryptoCurrencyHomeScreen} {...optionsTitle}/>
                            <DemoCryptoCurrencyStack.Screen name="CryptoCurrencyAlert" component={Platform.OS !== 'web'
                                ? CryptoCurrencyAlertScreen
                                : () => <NotSupport text="Not supported on web"/>} initialParams={{isPush: true}} {...optionsTitle}/>
                        </DemoCryptoCurrencyStack.Navigator>
                    }
                }
            </RootStack.Screen>
            <RootStack.Screen name="Settings" component={SettingsScreen} {...optionsTitle}/>
            <RootStack.Screen name="DemoSuspense" component={DemoSuspenseScreen} {...optionsTitle}/>
            <RootStack.Screen name="DemoTheme" component={DemoThemeScreen} {...optionsTitle}/>
        </RootStack.Navigator>
    </NavigationContainer>
}

export default NavigatorTree
