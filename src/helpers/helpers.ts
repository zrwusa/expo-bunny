import {
    BusinessLogicReturn,
    IcoMoonKeys,
    IcoMoonSelection,
    IcoMoonSelectionIcon,
    NavigatorTreeNode,
    RouteIconFontConfig,
    Traversable,
    TraversableNested
} from "../types";
import glyphMaterialCommunityMap from "@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json";
import icoMoonSelection from "../assets/fonts/icomoon-cus/selection.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BunnyConstants, {EBusinessLogicInfo} from "../constants/constants";
import {AuthAPIError, BunnyAPIError} from "../utils";
import bunnyConfig from "../config.json";

export const navigatorPropsExtract = (node: NavigatorTreeNode) => {
    const {
        name, stack, component, childrenNode, authScreen, navigatorType,
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

export const tabBarIconNameConfigMC: TraversableNested = {
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

export const tabBarIconNameConfig: TraversableNested = {
    TabHome: {
        default: 'home',
        focused: 'home',
    },
    TabSettings: {
        default: 'settings',
        focused: 'settings',
    },
    BitcoinHome: {
        default: 'dollar',
        focused: 'dollar',
    },
    BitcoinAlert: {
        default: 'alarm',
        focused: 'alarm',
    },
    RNFlatList: {
        default: 'list',
        focused: 'list',
    },
    RNHome: {
        default: 'home1',
        focused: 'home1',
    },
    RNNoKeyboard: {
        default: 'keyboard1',
        focused: 'keyboard1',
    },
    RNSafeArea: {
        default: 'umbrella',
        focused: 'umbrella',
    },
    RNSectionList: {
        default: 'th-menu-outline',
        focused: 'th-menu-outline',
    },
    RNVirtualizedList: {
        default: 'two-fingers-swipe-up',
        focused: 'two-fingers-swipe-up',
    }
}

const getIconMCCustomMap = (iconConfig: any) => {
    let map: TraversableNested = {};
    let glyphMapT: TraversableNested = glyphMaterialCommunityMap;
    Object.keys(iconConfig).forEach((key) => {
        const defaultKey = iconConfig[key]['default'];
        const focusedKey = iconConfig[key]['focused'];
        map[defaultKey] = glyphMapT[defaultKey];
        map[focusedKey] = glyphMapT[focusedKey];
    })
    return map as object;
}

export const glyphMaterialCommunityCustomMap = getIconMCCustomMap(tabBarIconNameConfig)

export const icoMoonSelectionToGlyphMap = (icoMoonSelection: IcoMoonSelection) => {
    let map: TraversableNested = {};
    const {icons} = icoMoonSelection;
    for (const i in icons as IcoMoonSelectionIcon[]) {
        const iconProperties = icons[i].properties
        const {name, code} = iconProperties;
        map[name.toString()] = code;
    }
    return map as object;
}
export const glyphIcoMoonMap = icoMoonSelectionToGlyphMap(icoMoonSelection as IcoMoonSelection)

export const getIconNameByRoute = (routeName: string, focused: boolean): IcoMoonKeys => {
    const key = focused ? 'focused' : 'default';
    const routeIconObj = tabBarIconNameConfig[routeName] as RouteIconFontConfig;
    let iconName;
    if (routeIconObj && routeIconObj[key]) {
        iconName = routeIconObj[key];
    } else {
        iconName = '';
    }
    return iconName as IcoMoonKeys
}
export const checkAuthStatus = async () => {
    try {
        const accessToken = await AsyncStorage.getItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY);
        if (accessToken) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

export const businessLogicInfo = (businessLogicMsg: string): BusinessLogicReturn => {
    return {
        success: false,
        data: undefined,
        message: businessLogicMsg
    }
}

export const businessSuccess = (data: any): BusinessLogicReturn => {
    return {
        success: true,
        data: data,
        message: ''
    }
}

export const checkBunnyAPIProtocol = (data: any) => {
    let isValid = false;
    const {success_data, business_logic} = data;
    const {error_code, error_message, error_stack} = business_logic;
    if (error_code) {
        throw new BunnyAPIError(error_message, error_code, error_stack)
    }
    if (!success_data) {
        throw new BunnyAPIError(EBusinessLogicInfo.NOT_CONFORM_TO_API_RESPONSE_STRUCTURE)
    }
    isValid = true
    return isValid;
}

export const checkAuthAPIProtocol = (data: any) => {
    let isValid = false;
    const {success_data, business_logic} = data;
    const {error_code, error_message, error_stack} = business_logic;
    if (error_code) {
        throw new AuthAPIError(error_message, error_code, error_stack)
    }
    if (!success_data) {
        throw new AuthAPIError(EBusinessLogicInfo.NOT_CONFORM_TO_API_RESPONSE_STRUCTURE)
    }
    isValid = true
    return isValid;
}

export const getApiInstanceConfig = () => {
    const httpPrefix = bunnyConfig.isHttps ? 'https://' : 'http://';
    const devProxyPrefix = bunnyConfig.isDevServerProxy ? Object.keys(bunnyConfig.devServerProxy)[0] : '';
    return {
        baseURL: bunnyConfig.isDevServerProxy
            ? `${bunnyConfig.devServer.domain}${bunnyConfig.devServer.port}${devProxyPrefix}`
            : bunnyConfig.isRemoteBackEnd
                ? `${httpPrefix}${bunnyConfig.remoteBackEnd.domain}:${bunnyConfig.remoteBackEnd.port}`
                : `${httpPrefix}${bunnyConfig.localBackEnd.domain}:${bunnyConfig.localBackEnd.port}`,
        timeout: 2000
    }
}
