import {
    APIConfigName,
    APPConfig,
    AuthTopStackParam,
    BLResult,
    ErrorClass,
    IcoMoonKeys,
    IcoMoonSelection,
    IcoMoonSelectionIcon,
    JSONSerializable,
    NavigatorTreeNode,
    RootStackParam,
    RouteIconFontConfig
} from "../types";
import glyphMaterialCommunityMap from "@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json";
import {EBLMsg} from "../constants";
import {AuthAPIError, BunnyAPIError, NomicsAPIError, uuidV4} from "../utils";
import configORG from "../config";
import _ from "lodash";
import icoMoonSelection from "../assets/fonts/icomoon/selection.json"
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {firebase} from "../firebase/firebase";
import * as ImagePicker from "expo-image-picker";

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

    const propsMap: JSONSerializable = {"stack": stackProps, "tab": tabProps, "drawer": drawerProps, "top": tabProps};
    return propsMap[navigatorType];
}

export const tabBarIconNameConfig: JSONSerializable = {
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
    SocialMediaHome: {
        default: 'home3',
        focused: 'home3',
    },
    SocialMediaSearch: {
        default: 'search',
        focused: 'search',
    },
    SocialMediaVideo: {
        default: 'tv',
        focused: 'tv',
    },
    SocialMediaShopping: {
        default: 'shopping-bag',
        focused: 'shopping-bag',
    },
    SocialMediaSettings: {
        default: 'settings',
        focused: 'settings',
    },
    HealthHome: {
        default: 'presentation',
        focused: 'presentation',
    },
    HealthSettings: {
        default: 'settings',
        focused: 'settings',
    },
    DatingHome: {
        default: 'heart',
        focused: 'heart',
    },
    DatingChat: {
        default: 'chat3',
        focused: 'chat3',
    },
    DatingSettings: {
        default: 'user-o',
        focused: 'user-o',
    },

}

const getIconMCCustomMap = (iconConfig: any) => {
    let map: JSONSerializable = {};
    let glyphMapT: JSONSerializable = glyphMaterialCommunityMap;
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
    let map: JSONSerializable = {};
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

export const blSuccess = <TData extends any>(data: TData, message?: string, shouldShow?: boolean): BLResult => {
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
    let dataKeys
    try {
        dataKeys = Object.keys(data)
    } catch (err) {
        throw new PErrorClass(err.message, err.stack)
    }
    const isDataKeysEqual = _.isEqual(dataKeys, ["timeSpent", "successData", "httpExtra", "businessLogic"])
    if (!isDataKeysEqual) {
        throw new PErrorClass(EBLMsg.NOT_CONFORM_TO_API_RESPONSE_ROOT_STRUCTURE)
    }
    const {businessLogic, httpExtra} = data;
    const blKeys = Object.keys(businessLogic);
    const isBLKeysEqual = _.isEqual(blKeys, ["code", "message", "description", "errorCode", "errorMessage", "errorDescription", "errorStack"])
    if (!isBLKeysEqual) {
        throw new PErrorClass(EBLMsg.NOT_CONFORM_TO_API_RESPONSE_BL_STRUCTURE)
    }
    const httpExtraKeys = Object.keys(httpExtra);
    const isHttpExtraKeysEqual = _.isEqual(httpExtraKeys, ["code", "message", "description", "errorCode", "errorMessage", "errorDescription", "errorStack"])
    if (!isHttpExtraKeysEqual) {
        throw new PErrorClass(EBLMsg.NOT_CONFORM_TO_API_RESPONSE_EXTRA_STRUCTURE)
    }
    const {errorCode, errorMessage, errorStack} = businessLogic;
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
            isDevServer, isDevServerProxy, devServerProxy, devServer,
            timeout
        } = apiConfig;

        let port;
        let httpPrefix;
        let defaultPort;

        let finalBaseUrl = ''
        if (isDevServer) {
            const devServerHost = `${devServer.domain}${devServer.port}`;
            const devProxyPrefix = isDevServerProxy ? Object.keys(devServerProxy)[0] : '';
            finalBaseUrl = `${devServerHost}${devProxyPrefix}`
        } else {
            const env = process.env.NODE_ENV === 'production' ? 'prod' : apiConfig.env;
            const envObj = apiConfig[env]
            if (envObj) {
                httpPrefix = envObj.isHttps ? 'https://' : 'http://';
                defaultPort = envObj.isHttps ? 443 : 80;
                port = envObj.port || defaultPort
                finalBaseUrl = `${httpPrefix}${envObj.domain}:${port}`
            } else {
                throw (`${env} config not available,check the config`)
            }

        }
        return {
            baseURL: finalBaseUrl,
            timeout
        }
    }

}

// todo be compatible to all StackParam
export type NavToRoute = RouteProp<AuthTopStackParam, 'Login' | 'SignUp'> ;
export type NavToNavigation = StackNavigationProp<RootStackParam, 'Auth'>;

export const navToReference = (route: NavToRoute, navigation: NavToNavigation) => {
    let referenceRoute;
    // todo maybe nested reference
    if (route.params && route.params.reference) {
        referenceRoute = JSON.parse(route.params.reference)
        navigation.navigate(referenceRoute)
    } else {
        navigation.navigate('Home')
    }
}

export const navToLogin = (route: NavToRoute, navigation: NavToNavigation) => {
    if (route.params && route.params.reference) {
        navigation.navigate('Auth', {screen: 'Login', params: {reference: route.params.reference}})
    } else {
        navigation.navigate('Auth', {screen: 'Login'})
    }
}

export const navToSignUp = (route: NavToRoute, navigation: NavToNavigation) => {
    if (route.params && route.params.reference) {
        navigation.navigate('Auth', {screen: 'SignUp', params: {reference: route.params.reference}})
    } else {
        navigation.navigate('Auth', {screen: 'SignUp'})
    }
}

export const uploadFileToFirebase = async function (uri: string, path?: string) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise<Blob>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const ref = firebase
        .storage()
        .ref(path)
        .child(uuidV4());

    const snapshot = await ref.put(blob);

    // // We're done with the blob, close and release it
    // blob.close();

    return await snapshot.ref.getDownloadURL();
}

export const removeFileFromFirebaseByURL = async function (uri: string) {
    try {
        const imageRef = firebase.storage().refFromURL(uri);
        return await imageRef.delete()
    } catch (e) {
        if (['storage/invalid-argument', 'storage/object-not-found'].includes(e.code)) {
            return
        } else {
            throw e
        }
    }
}

export const Permissions = {
    mediaLibrary: {
        get: async () => {
            // if (Platform.OS !== 'web') {
            const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            return mediaLibraryPermission.status === 'granted';

            // }
        }
    },
    camera: {
        get: async () => {
            // if (Platform.OS !== 'web') {
            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync()
            return cameraPermission.status === 'granted';
            // }
        }
    }
}

