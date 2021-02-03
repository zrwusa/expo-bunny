import {Platform, PlatformOSType} from "react-native";
import {FontConfigPlatform, Fonts, FontsWrapped} from "../../types/styles";
import {EThemes} from "../../utils/constants";
import {TraversableNested} from "../../types/utils";

const fontConfig: FontConfigPlatform = {
    web: {
        regular: {
            fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: '400' as '400',
        },
        medium: {
            fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: '500' as '500',
        },
        light: {
            fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: '300' as '300',
        },
        thin: {
            fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: '100' as '100',
        },
    },
    ios: {
        regular: {
            fontFamily: 'System',
            fontWeight: '400' as '400',
        },
        medium: {
            fontFamily: 'System',
            fontWeight: '500' as '500',
        },
        light: {
            fontFamily: 'System',
            fontWeight: '300' as '300',
        },
        thin: {
            fontFamily: 'System',
            fontWeight: '100' as '100',
        },
    },
    default: {
        regular: {
            fontFamily: 'sans-serif',
            fontWeight: 'normal' as 'normal',
        },
        medium: {
            fontFamily: 'sans-serif-medium',
            fontWeight: 'normal' as 'normal',
        },
        light: {
            fontFamily: 'sans-serif-light',
            fontWeight: 'normal' as 'normal',
        },
        thin: {
            fontFamily: 'sans-serif-thin',
            fontWeight: 'normal' as 'normal',
        },
    },
};

const getFontConfigLeavesWrappedWithThemeNames = () => {
    let configWithThemeName: TraversableNested = {};
    // Todo as unknown as is not a safe method
    let fontConfigAlias = fontConfig as unknown as TraversableNested;
    Object.keys(fontConfig).forEach(platformName => {
        configWithThemeName[platformName] = {}
        Object.keys(fontConfigAlias[platformName]).forEach(fontName => {
            configWithThemeName[platformName][fontName] = {}
            Object.keys(fontConfigAlias[platformName][fontName]).forEach(fontProperty => {
                configWithThemeName[platformName][fontName][fontProperty] = {}
                Object.keys(EThemes).forEach(themeName => {
                    configWithThemeName[platformName][fontName][fontProperty][EThemes[themeName]] = fontConfigAlias[platformName][fontName][fontProperty];
                })
            })

        })
    })
    return configWithThemeName;
}

export function configureFonts(
    config?: { [platform in PlatformOSType | 'default']?: Fonts }
): Fonts {
    return Platform.select({...fontConfig, ...config}) as Fonts;
}

export const fonts = configureFonts();

export function configureFontsWarehouse(
    config?: { [platform in PlatformOSType | 'default']?: FontsWrapped }
): FontsWrapped {
    return Platform.select({...getFontConfigLeavesWrappedWithThemeNames(), ...config}) as FontsWrapped;
}

export const fontsWarehouse = configureFontsWarehouse();
