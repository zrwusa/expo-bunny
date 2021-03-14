import {
    APIConfigName,
    APPConfig,
    BLResult,
    ErrorClass,
    IcoMoonKeys,
    IcoMoonSelection,
    IcoMoonSelectionIcon,
    NavigatorTreeNode,
    RouteIconFontConfig,
    Traversable,
    TraversableNested
} from "../types";
import glyphMaterialCommunityMap from "@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BunnyConstants, {EBLMsg} from "../constants/constants";
import {AuthAPIError, BunnyAPIError, NomicsAPIError, uuidV4} from "../utils";
import configORG from "../config.json";
import _ from "lodash";
import icoMoonSelection from "../assets/fonts/icomoon-cus/selection.json"

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

    const propsMap: Traversable = {"stack": stackProps, "tab": tabProps, "drawer": drawerProps, "top": tabProps};
    return propsMap[navigatorType];
}

export const tabBarIconNameConfig: TraversableNested = {
    TabHome: {
        default: 'home1',
        focused: 'home1',
    },
    TabSettings: {
        default: 'settings',
        focused: 'settings',
    },
    CryptoCurrencyHome: {
        default: 'bargraph',
        focused: 'bargraph',
    },
    CryptoCurrencyAlert: {
        default: 'alarmclock',
        focused: 'alarmclock',
    },
    RNHome: {
        default: 'barometer',
        focused: 'barometer',
    },
    RNFlatList: {
        default: 'layout4',
        focused: 'layout4',
    },
    RNSectionList: {
        default: 'layout7',
        focused: 'layout7',
    },
    RNVirtualizedList: {
        default: 'two-fingers-swipe-up',
        focused: 'two-fingers-swipe-up',
    },
    RNNoKeyboard: {
        default: 'keyboard1',
        focused: 'keyboard1',
    },
    RNSafeArea: {
        default: 'umbrella',
        focused: 'umbrella',
    },
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

export const blError = (blMsg: string, shouldShow?: boolean): BLResult => {
    const shouldShowParam = shouldShow !== undefined ? shouldShow : true
    return {
        id: uuidV4(),
        success: false,
        data: undefined,
        message: blMsg,
        shouldShow: shouldShowParam
    }
}

export const blSuccess = (data: any, message?: string, shouldShow?: boolean): BLResult => {
    const shouldShowParam = shouldShow !== undefined ? shouldShow : true
    return {
        id: uuidV4(),
        success: true,
        data: data,
        message: message || '',
        shouldShow: shouldShowParam
    }
}

export const checkCommonAPIProtocol = (data: any, PErrorClass: ErrorClass) => {
    const {businessLogic, httpExtra} = data;
    const dataKeys = Object.keys(data)
    const isDataKeysEqual = _.isEqual(dataKeys, ["timeSpent", "successData", "httpExtra", "businessLogic"])
    const {errorCode, errorMessage, errorStack} = businessLogic;
    const blKeys = Object.keys(businessLogic);
    const isBLKeysEqual = _.isEqual(blKeys, ["code", "message", "description", "errorCode", "errorMessage", "errorDescription", "errorStack"])
    const httpExtraKeys = Object.keys(httpExtra);
    const isHttpExtraKeysEqual = _.isEqual(httpExtraKeys, ["code", "message", "description", "errorCode", "errorMessage", "errorDescription", "errorStack"])
    if (!isDataKeysEqual || !isBLKeysEqual || !isHttpExtraKeysEqual) {
        throw new PErrorClass(EBLMsg.NOT_CONFORM_TO_API_RESPONSE_STRUCTURE)
    }
    if (errorCode) {
        throw new PErrorClass(errorMessage, errorCode, errorStack)
    }
    return true;
}

export const checkAuthAPIProtocol = (data: any) => {
    return checkCommonAPIProtocol(data, AuthAPIError)
}

export const checkBunnyAPIProtocol = (data: any) => {
    return checkCommonAPIProtocol(data, BunnyAPIError)
}

export const checkNomicsAPIProtocol = (data: any) => {
    return checkCommonAPIProtocol(data, NomicsAPIError)
}

export const getApiInstanceConfig = (apiConfigName: APIConfigName) => {
    const config = configORG as APPConfig
    const apiConfig = config[apiConfigName];

    if (apiConfig) {
        const {
            isHttps, isDevServerProxy, devServerProxy, devServer,
            isRemoteBackEnd, remoteBackEnd, localBackEnd, timeout
        } = apiConfig;
        const httpPrefix = isHttps ? 'https://' : 'http://';
        const devProxyPrefix = isDevServerProxy ? Object.keys(devServerProxy)[0] : '';
        return {
            baseURL: isDevServerProxy
                ? `${devServer.domain}${devServer.port}${devProxyPrefix}`
                : isRemoteBackEnd
                    ? `${httpPrefix}${remoteBackEnd.domain}:${remoteBackEnd.port}`
                    : `${httpPrefix}${localBackEnd.domain}:${localBackEnd.port}`,
            timeout
        }
    }

}
