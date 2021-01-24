import {Traversable, TraversableNested} from "../types/helpers";
import {Screen} from "../types/common";

export const propsExtract = (node: Screen) => {
    const {
        name, stack, component, screens, signInComponent,
        path, exact, parse, stringify,
        initialParams, screenOptions, detachInactiveScreens, initialRouteName,
        statusBarAnimation, sceneContainerStyle,
        overlayColor, openByDefault, mode, minSwipeDistance,
        lazy, tabBarOptions, tabBar, keyboardHandlingEnabled,
        keyboardDismissMode, hideStatusBar,
        headerMode, gestureHandlerProps, edgeWidth, drawerType,
        drawerStyle, drawerContentOptions, drawerPosition, drawerContent,
        backBehavior, options,
        ...rest
    } = node;

    const tabProps = {
        initialRouteName, screenOptions, backBehavior, lazy,
        detachInactiveScreens, sceneContainerStyle, tabBar, tabBarOptions
    };
    const stackProps = {
        initialRouteName, screenOptions, keyboardHandlingEnabled,
        mode, headerMode, detachInactiveScreens
    };
    const drawerProps = {
        initialRouteName, screenOptions, backBehavior, openByDefault,
        drawerPosition, drawerType, edgeWidth, hideStatusBar, statusBarAnimation,
        keyboardDismissMode, minSwipeDistance, overlayColor, lazy, detachInactiveScreens,
        gestureHandlerProps, sceneContainerStyle, drawerStyle, drawerContent, drawerContentOptions
    };
    const Navigator = stack?.Navigator;

    const propsMap: Traversable = {StackNavigator: stackProps, BottomTabNavigator: tabProps, DrawerNavigator: drawerProps};
    return Navigator?.name ? propsMap[Navigator.name] : null;
}

export const getIconName = (routeName: string, focused: boolean) => {
    type IconFontConfig = {
        default: string,
        focused: string,
    }
    const iconConfig: TraversableNested = {
        TabHome: {
            default: 'home',
            focused: 'home',
        },
        TabSettings: {
            default: 'account-settings',
            focused: 'account-settings',
        },
        BitcoinHome: {
            default: 'bitcoin',
            focused: 'bitcoin',
        },
        BitcoinAlert: {
            default: 'table-clock',
            focused: 'table-clock',
        },
        RNFlatList: {
            default: 'view-sequential',
            focused: 'view-sequential',
        },
        RNHome: {
            default: 'home-assistant',
            focused: 'home-assistant',
        },
        RNNoKeyboard: {
            default: 'keyboard-off',
            focused: 'keyboard-off',
        },
        RNSafeArea: {
            default: 'safe-square',
            focused: 'safe-square',
        },
        RNSectionList: {
            default: 'view-list',
            focused: 'view-list',
        },
        RNVirtualizedList: {
            default: 'playlist-plus',
            focused: 'playlist-plus',
        }
    }
    const key = focused ? 'focused' : 'default';
    const routeIconObj = iconConfig[routeName] as IconFontConfig;
    if (routeIconObj && routeIconObj[key]) {
        return routeIconObj[key]
    } else {
        return ''
    }
}
