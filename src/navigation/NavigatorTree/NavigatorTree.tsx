import {
    DemoCryptoCurrencyStack,
    DemoDrawerStack,
    DemoHealthTabStack,
    DemoIGStack,
    DemoNestedLv1Stack,
    DemoNestedLv2Stack,
    DemoTabRNComponentsStack,
    DemoTabStack,
    RootStack
} from "../stacks";
import HomeScreen from "../../screens/Home";
import * as React from "react";
import {useEffect} from "react";
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
import {Image, Platform, TouchableOpacity, View} from "react-native";
import DemoNotificationScreen from "../../screens/DemoNotification/DemoNotification";
import {NotSupport} from "../../components/NotSupport";
import TabHomeScreen from "../../screens/DemoTab/Home";
import TabSettingsScreen from "../../screens/DemoTab/Settings";
import {DrawerActions, NavigationContainer, NavigationContainerProps, NavigationContainerRef} from "@react-navigation/native";
import {DocumentTitleOptions, LinkingOptions, Theme} from "@react-navigation/native/lib/typescript/src/types";
import DrawerHomeScreen from "../../screens/DemoDrawer/Home";
import DrawerSettingsScreen from "../../screens/DemoDrawer/Settings";
import NestedLv1HomeScreen from "../../screens/DemoNestedLv0/NestedLv1Home";
import NestedLv2HomeScreen from "../../screens/DemoNestedLv0/NestedLv1Settings/NestedLv2Home";
import NestedLv2SettingsScreen from "../../screens/DemoNestedLv0/NestedLv1Settings/NestedLv2Settings";
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
import {getStyles} from "./styles";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useThemeLabor} from "../../providers/theme-labor";
import {DefaultNavigatorOptions} from "@react-navigation/core/src/types";
import {blError, blSuccess, getIconNameByRoute} from "../../helpers";
import {useAuthLabor} from "../../providers/auth-labor";
import {collectBLResult} from "../../store/actions";
import {useDispatch} from "react-redux";
import {IGHomeScreen} from "../../screens/DemoIG/Home";
import {IGSettingsScreen} from "../../screens/DemoIG/Settings";
import {IGSearchScreen} from "../../screens/DemoIG/Search";
import {DemoSearchScreen} from "../../screens/DemoSearch";
import {linking} from "./linking";
import {IGMediaScreen} from "../../screens/DemoIG/Media";
import {PlaygroundScreen} from "../../screens/Playground";
import {ColorFinderScreen} from "../../screens/ColorFinder";
import {AuthScreen} from "../../screens/Auth";
import {HealthHomeScreen} from "../../screens/DemoHealth/Home";
import {HealthSettingsScreen} from "../../screens/DemoHealth/Settings";
import {IconToolsScreen} from "../../screens/IconTools";
import {DrawerNavigationOptions} from "@react-navigation/drawer";
import {BottomTabBarOptions, BottomTabNavigationOptions} from "@react-navigation/bottom-tabs";
import {DemoSagaFirebaseScreen} from "../../screens/DemoSagaFirebase";
import {Row} from "../../containers";
import {ThemePicker} from "../../components/ThemePicker";

type DrawerScreenOptions = DefaultNavigatorOptions<DrawerNavigationOptions>["screenOptions"]
type TabBarScreenOptions = DefaultNavigatorOptions<BottomTabNavigationOptions>["screenOptions"]

export type NavigatorTreeProps = Omit<NavigationContainerProps, 'children'> & {
    theme?: Theme | undefined;
    linking?: LinkingOptions | undefined;
    fallback?: React.ReactNode;
    documentTitle?: DocumentTitleOptions | undefined;
    onReady?: (() => void) | undefined;
}

// Explicitly define a navigation tree, the navigation of the entire App is clear at a glance
const NavigatorTree: React.FC<NavigatorTreeProps> = (props) => {
    const sizeLabor = useSizeLabor();
    const {ms, designsBasedOn} = sizeLabor;
    const {authResult, authFunctions} = useAuthLabor()
    const dispatch = useDispatch();
    const {wp} = designsBasedOn.iphoneX;
    const themeLabor = useThemeLabor();
    const {theme} = themeLabor;
    const {colors} = theme;
    const {t} = useTranslation();
    const styles = getStyles(sizeLabor, themeLabor);
    const insets = useSafeAreaInsets();

    // --- options start ---
    const screenOptionsStackCommonHeaderRight = () => {
        return (<Row style={styles.settingBox}>
            <ThemePicker/>
            {/*<LanguagePicker/>*/}
        </Row>)
    }

    const screenOptionsStackCommon: StackNavigationOptions = {
        animationEnabled: true,
        headerRight: screenOptionsStackCommonHeaderRight,
        headerTitleContainerStyle: {
            // left:Platform.select({
            //     web:wp(40),
            //     android:wp(13)
            // })
        },
        headerTitleStyle: {
            fontSize: ms.fs.m
        },
        headerRightContainerStyle: {
            // width:wp(100)
        },
        headerLeftContainerStyle: {},
        headerBackTitleStyle: {
            fontSize: ms.fs.l,
        },
        headerBackImage: ({tintColor}) => <IcoMoon
            name="chevron-left1"
            style={{
                fontSize: ms.fs.xxl,
                color: tintColor,
            }}/>,
        // headerStyle: {
        //     height: Platform.select({
        //         web: wp(50),
        //     })
        // }
    }

    const optionsMergeWithTitle = function (needMerged?: any) {
        return function ({route}: any) {
            const finalOptions = {
                title: t(`screens.${route.name}.title`),
                ...(needMerged && needMerged),
            }
            return finalOptions;
        }
    }
    const optionsAuth: StackNavigationOptions = {
        ...screenOptionsStackCommon,
        animationEnabled: false,
        headerShown: true,
        headerLeft: () => null
    }
    const optionsIG: StackNavigationOptions = {
        ...screenOptionsStackCommon,
        animationEnabled: true,
        headerShown: true,
        headerRight: function () {
            return <View style={{flexDirection: 'row', alignItems: 'center', marginRight: wp(10)}}>
                <IcoMoon
                    name="heart"
                    style={{
                        color: colors.primary,
                        fontSize: ms.fs.l,
                        marginRight: wp(10)
                    }}/>
                <IcoMoon
                    name="star"
                    style={{
                        color: colors.primary,
                        fontSize: ms.fs.l,
                        marginRight: wp(10)
                    }}/>
                <IcoMoon
                    name="paperplane1"
                    style={{
                        color: colors.primary,
                        fontSize: ms.fs.l,
                        marginRight: wp(10)
                    }}/></View>
        },
        headerTitle: () => <Image style={{width: wp(100), height: wp(30)}}
                                  source={theme.dark
                                      ? require('../../assets/images/art-font-bunny-white.png')
                                      : require('../../assets/images/art-font-bunny.png')}/>,
    }

    const optionsHealth: StackNavigationOptions = {
        ...screenOptionsStackCommon,
        animationEnabled: true,
        headerShown: true,
    }

    const screenOptionsTabBarIcon: TabBarScreenOptions = ({route}) => {
        return {
            tabBarIcon: ({focused, color, size}) => {
                const name = getIconNameByRoute(route.name, focused)
                return <IcoMoon name={name} style={{color: color}} size={wp(size / 1.25)}/>;
            },
        }
    }

    const screenOptionsDrawer: DrawerScreenOptions = ({navigation}) => {
        return {
            headerStyle: {
                height: wp(50)
            },
            headerTitleStyle: {
                fontSize: ms.fs.m
            },
            headerShown: true,
            headerLeft: () => {
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

    const tabBarOptionsCommon: BottomTabBarOptions = {
        tabStyle: {
            justifyContent: 'center'
        },
        labelStyle: {
            fontSize: ms.fs.xxs,
        },
        style: {
            height: wp(46) + insets.bottom
        },
        labelPosition: 'below-icon'
    }

    const tabBarOptionsIG: BottomTabBarOptions = {
        ...tabBarOptionsCommon,
        showLabel: false,
    }

    const tabBarOptionsHealth: BottomTabBarOptions = {
        ...tabBarOptionsCommon,
        showLabel: false,
    }
    // --- options end ---

    const listenersNeedAuth = () => {
        return {
            focus: function () {
                authFunctions.authTrigger('SCREEN')
            },
        }
    }

    const navigateToAuth = () => {
        if (authResult.isLogin) {
            return
        }
        if (navigationRef.current) {
            const curRoute = navigationRef.current.getCurrentRoute()
            if (!curRoute) {
                navigationRef.current.navigate('Auth', {screen: 'Login'})
                return
            }
            if (!['Login', 'SignUp'].includes(curRoute.name)) {
                navigationRef.current.navigate('Auth', {screen: 'Login', params: {reference: JSON.stringify(curRoute)}})
            } else {
                return
            }
        }
    }

    useEffect(() => {
        switch (authResult.triggerType) {
            case "API":
                dispatch(collectBLResult(blError(t('sys.apiNeedLogin'))))
                break;
            case "SCREEN":
                navigateToAuth()
                break;
            case "MANUAL":
                navigateToAuth()
                break;
            case "AUTO":
                dispatch(collectBLResult(blSuccess(true, t('sys.LogOutSuccess'))))
                break;
            case "OTHERS":
                navigateToAuth()
                break;
            default:
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
        <RootStack.Navigator headerMode="float" screenOptions={{
            ...screenOptionsStackCommon, headerStyle: {
                height: Platform.select({
                    web: wp(50),
                    ios: wp(42) + insets.top
                })
            }
        }}>
            <RootStack.Screen name="Home" component={HomeScreen} options={optionsMergeWithTitle()}/>
            <RootStack.Screen name="Auth" component={AuthScreen} options={optionsMergeWithTitle(optionsAuth)}/>
            <RootStack.Screen name="Profile" component={ProfileScreen} options={optionsMergeWithTitle()} listeners={listenersNeedAuth}/>
            <RootStack.Screen name="DemoFCReduxHook" component={DemoFCReduxHookScreen} options={optionsMergeWithTitle()}/>
            <RootStack.Screen name="DemoCollection" component={DemoCollectionScreen} options={optionsMergeWithTitle()}/>
            <RootStack.Screen name="DemoRoute" component={DemoRouteScreen} options={optionsMergeWithTitle()}/>
            <RootStack.Screen name="DemoThirdPart" component={DemoThirdPartScreen} options={optionsMergeWithTitle()}/>
            <RootStack.Screen name="DemoThunkCC" component={DemoThunkCCScreen} options={optionsMergeWithTitle()}/>
            <RootStack.Screen name="DemoSaga" component={DemoSagaScreen} options={optionsMergeWithTitle()}/>
            <RootStack.Screen name="DemoSagaFirebase" component={DemoSagaFirebaseScreen} options={optionsMergeWithTitle()}/>
            <RootStack.Screen name="DemoMap" component={DemoMapScreen} options={optionsMergeWithTitle()}/>
            <RootStack.Screen name="DemoChat" component={DemoChatScreen} options={optionsMergeWithTitle()}/>
            <RootStack.Screen name="DemoShare" component={DemoShareScreen} options={optionsMergeWithTitle()}/>
            <RootStack.Screen name="DemoSearch" component={DemoSearchScreen} options={optionsMergeWithTitle()}/>
            <RootStack.Screen name="DemoNotification" component={
                Platform.OS !== 'web'
                    ? DemoNotificationScreen
                    : () => <NotSupport text='Not supported on web'/>} options={optionsMergeWithTitle()}/>
            <RootStack.Screen name="DemoTab" options={optionsMergeWithTitle()}>
                {
                    (props) => {
                        return <DemoTabStack.Navigator {...props} screenOptions={screenOptionsTabBarIcon} tabBarOptions={tabBarOptionsCommon}>
                            <DemoTabStack.Screen name="TabHome" component={TabHomeScreen} options={optionsMergeWithTitle()}/>
                            <DemoTabStack.Screen name="TabSettings" component={TabSettingsScreen}
                                                 initialParams={{'item': 'item-001'}} options={optionsMergeWithTitle()}/>
                        </DemoTabStack.Navigator>
                    }
                }
            </RootStack.Screen>
            <RootStack.Screen name="DemoDrawer" options={optionsMergeWithTitle()}>
                {(props) => {
                    //todo not sure if the props is passed correctly
                    return <DemoDrawerStack.Navigator {...props} drawerContentOptions={{labelStyle: {fontSize: ms.fs.m}}}
                                                      screenOptions={screenOptionsDrawer}>
                        <DemoDrawerStack.Screen name="DrawerHome" component={DrawerHomeScreen} options={optionsMergeWithTitle()}/>
                        <DemoDrawerStack.Screen name="DrawerSettings" component={DrawerSettingsScreen}
                                                initialParams={{'item': 'item-001'}} options={optionsMergeWithTitle()}/>
                    </DemoDrawerStack.Navigator>
                }}
            </RootStack.Screen>
            <RootStack.Screen name="DemoNestedLv0" options={optionsMergeWithTitle()}>
                {(props) => {
                    return <DemoNestedLv1Stack.Navigator {...props} screenOptions={screenOptionsStackCommon}>
                        <DemoNestedLv1Stack.Screen name="NestedLv1Home" component={NestedLv1HomeScreen} options={optionsMergeWithTitle()}/>
                        <DemoNestedLv1Stack.Screen name="NestedLv1Settings" options={optionsMergeWithTitle()}>
                            {(props) => {
                                return <DemoNestedLv2Stack.Navigator {...props} screenOptions={screenOptionsStackCommon}>
                                    <DemoNestedLv2Stack.Screen name="NestedLv2Home" component={NestedLv2HomeScreen}
                                                               options={optionsMergeWithTitle()}/>
                                    <DemoNestedLv2Stack.Screen name="NestedLv2Settings" component={NestedLv2SettingsScreen}
                                                               options={optionsMergeWithTitle()}/>
                                </DemoNestedLv2Stack.Navigator>
                            }}
                        </DemoNestedLv1Stack.Screen>
                    </DemoNestedLv1Stack.Navigator>
                }}
            </RootStack.Screen>
            <RootStack.Screen name="DemoRNComponents" options={optionsMergeWithTitle()}>
                {
                    (props) => {
                        return <DemoTabRNComponentsStack.Navigator {...props} screenOptions={screenOptionsTabBarIcon}
                                                                   tabBarOptions={tabBarOptionsCommon}>
                            <DemoTabRNComponentsStack.Screen name="RNHome" component={RNHome} options={optionsMergeWithTitle()}/>
                            <DemoTabRNComponentsStack.Screen name="RNFlatList" component={RNFlatListScreen} options={optionsMergeWithTitle()}/>
                            <DemoTabRNComponentsStack.Screen name="RNSectionList" component={RNSectionListScreen} options={optionsMergeWithTitle()}/>
                            <DemoTabRNComponentsStack.Screen name="RNVirtualizedList" component={RNVirtualizedListScreen}
                                                             options={optionsMergeWithTitle()}/>
                            <DemoTabRNComponentsStack.Screen name="RNNoKeyboard" component={RNKeyboardAvoidingScreen}
                                                             options={optionsMergeWithTitle()}/>
                            <DemoTabRNComponentsStack.Screen name="RNSafeArea" component={RNSafeAreaScreen} options={optionsMergeWithTitle()}/>
                        </DemoTabRNComponentsStack.Navigator>
                    }
                }
            </RootStack.Screen>
            <RootStack.Screen name="DemoCryptoCurrency" options={optionsMergeWithTitle()}>
                {
                    (props) => {
                        return <DemoCryptoCurrencyStack.Navigator {...props} screenOptions={screenOptionsTabBarIcon}
                                                                  tabBarOptions={tabBarOptionsCommon}>
                            <DemoCryptoCurrencyStack.Screen name="CryptoCurrencyHome" component={CryptoCurrencyHomeScreen}
                                                            options={optionsMergeWithTitle()}/>
                            <DemoCryptoCurrencyStack.Screen name="CryptoCurrencyAlert" component={Platform.OS !== 'web'
                                ? CryptoCurrencyAlertScreen
                                : () => <NotSupport text="Not supported on web"/>} initialParams={{isPush: true}} options={optionsMergeWithTitle()}/>
                        </DemoCryptoCurrencyStack.Navigator>
                    }
                }
            </RootStack.Screen>
            <RootStack.Screen name="DemoIG" options={optionsMergeWithTitle(optionsIG)}>
                {
                    (props) => {
                        return <DemoIGStack.Navigator {...props}
                                                      screenOptions={screenOptionsTabBarIcon}
                                                      tabBarOptions={tabBarOptionsIG}>
                            <DemoIGStack.Screen name="IGHome" component={IGHomeScreen} options={optionsMergeWithTitle()}/>
                            <DemoIGStack.Screen name="IGSearch" component={IGSearchScreen}
                                                initialParams={{'keyword': 'keyword-001'}} options={optionsMergeWithTitle()}/>
                            <DemoIGStack.Screen name="IGMedia" component={IGMediaScreen} options={optionsMergeWithTitle()}/>
                            <DemoIGStack.Screen name="IGSettings" component={IGSettingsScreen}
                                                initialParams={{'item': 'item-001'}}/>
                        </DemoIGStack.Navigator>
                    }
                }
            </RootStack.Screen>
            <RootStack.Screen name="Playground" component={PlaygroundScreen} options={optionsMergeWithTitle()}/>
            <RootStack.Screen name="ColorFinder" component={ColorFinderScreen} options={optionsMergeWithTitle()}/>
            <RootStack.Screen name="IconTools" component={IconToolsScreen} options={optionsMergeWithTitle()}/>
            <RootStack.Screen name="DemoHealth" options={optionsMergeWithTitle(optionsHealth)}>
                {
                    (props) => {
                        return <DemoHealthTabStack.Navigator {...props}
                                                             screenOptions={screenOptionsTabBarIcon}
                                                             tabBarOptions={tabBarOptionsHealth}>
                            <DemoHealthTabStack.Screen name="HealthHome"
                                                       component={HealthHomeScreen}
                                                       options={optionsMergeWithTitle()}/>
                            <DemoHealthTabStack.Screen name="HealthSettings"
                                                       component={HealthSettingsScreen}
                                                       options={optionsMergeWithTitle()}/>
                        </DemoHealthTabStack.Navigator>
                    }
                }
            </RootStack.Screen>
            <RootStack.Screen name="Settings" component={SettingsScreen} options={optionsMergeWithTitle()}/>
            <RootStack.Screen name="DemoSuspense" component={DemoSuspenseScreen} options={optionsMergeWithTitle()}/>
            <RootStack.Screen name="DemoTheme" component={DemoThemeScreen} options={optionsMergeWithTitle()}/>
        </RootStack.Navigator>
    </NavigationContainer>
}

export default NavigatorTree
