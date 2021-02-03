import {Traversable, TraversableNested} from "../types/utils";
import {NavigatorTreeNode} from "../types/utils";
import glyphMap from "@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json";
import {IcoMoonKeys, MaterialCommunityIconsProps} from "../types/styles";
import icomoonSelection from "../assets/fonts/icomoon/selection.json";

export const propsExtract = (node: NavigatorTreeNode) => {
    const {
        name, stack, component, childrenNode, signInComponent, navigatorType,
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

    const propsMap: Traversable = {"stack": stackProps, "tab": tabProps, "drawer": drawerProps};
    return propsMap[navigatorType];
}

export const iconCustomConfig: TraversableNested = {
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
export const icoMoonConfig: TraversableNested = {
    TabHome: {
        default: 'home',
        focused: 'home',
    },
    TabSettings: {
        default: 'settings',
        focused: 'settings',
    },
    BitcoinHome: {
        default: 'attach_money',
        focused: 'attach_money',
    },
    BitcoinAlert: {
        default: 'add_alert',
        focused: 'add_alert',
    },
    RNFlatList: {
        default: 'format_list_bulleted',
        focused: 'format_list_bulleted',
    },
    RNHome: {
        default: 'subject',
        focused: 'subject',
    },
    RNNoKeyboard: {
        default: 'keyboard_hide',
        focused: 'keyboard_hide',
    },
    RNSafeArea: {
        default: 'subject',
        focused: 'subject',
    },
    RNSectionList: {
        default: 'list_alt',
        focused: 'list_alt',
    },
    RNVirtualizedList: {
        default: 'view_list',
        focused: 'view_list',
    }
}

const getIconMCCustomMap = (iconConfig:any) => {
    let map: TraversableNested = {};
    let glyphMapT: TraversableNested = glyphMap;
    Object.keys(iconConfig).forEach((key) => {
        const defaultKey = iconConfig[key]['default'];
        const focusedKey = iconConfig[key]['focused'];
        map[defaultKey] = glyphMapT[defaultKey];
        map[focusedKey] = glyphMapT[focusedKey];
    })
    return map as object;
}

export const glyphMCCustomMap = getIconMCCustomMap(icoMoonConfig)
export const getIcoMoonMap = () => {
    let map: TraversableNested = {};
    const {icons} = icomoonSelection;
    for (const i in icons) {
        const iconProperties = icons[i].properties
        const {name, code} = iconProperties;
        map[name.toString()] = code;
    }

    return map as object;
}

export const glyphIcoMoonMap = getIcoMoonMap()

type IconName = MaterialCommunityIconsProps['name'];

export const getIconName = (routeName: string, focused: boolean): IcoMoonKeys => {
    type IconFontConfig = {
        default: string,
        focused: string,
    }

    const key = focused ? 'focused' : 'default';
    const routeIconObj = icoMoonConfig[routeName] as IconFontConfig;
    let iconName = '';
    if (routeIconObj && routeIconObj[key]) {
        iconName = routeIconObj[key];
    } else {
        iconName = '';
    }
    return iconName as IcoMoonKeys
}
