import {fontsWarehouse} from "./fonts";
import {JSONSerializable, Themes, ThemeWarehouse} from "../../types";
import color from "color";
import {EThemes} from "../../constants";
import {isLeafParent, isSameStructure, pl} from "../../utils";
import getSizeLabor from "../size-labor/sizeLabor";
import {getVictoryTheme} from "./victoryTheme";

export const getThemeWareHouse = () => {
    const {wp} = getSizeLabor().designsBasedOn.iphoneX


    const commonFontFamily = {
        light: fontsWarehouse.regular.fontFamily.light,
        dark: fontsWarehouse.regular.fontFamily.dark,
        indigo: fontsWarehouse.regular.fontFamily.dark,
    }


    const themeWarehouse: ThemeWarehouse = {
        dark: {
            light: false,
            dark: true,
            indigo: true
        },
        roundness: {
            light: wp(4),
            dark: wp(4),
            indigo: wp(10)
        },
        borderRadius: {
            button: {
                light: wp(4),
                dark: wp(4),
                indigo: wp(17)
            },
            input: {
                light: wp(4),
                dark: wp(4),
                indigo: wp(20)
            },
            surface: {
                light: wp(10),
                dark: wp(10),
                indigo: wp(10)
            }
        },
        mode: {
            light: 'exact',
            dark: 'adaptive',
            indigo: 'exact'
        },
        colors: {
            // ---start main
            // [ReactNativePaper]primary color for your app, usually your brand color.
            // [ReactNavigation]The primary color of the app used to tint various elements. Usually you'll want to use your brand color for this.
            primary: {
                light: pl.teal400,
                dark: pl.orange800,
                indigo: pl.tealA500
            },
            secondary: {
                light: pl.purple500,
                dark: pl.greenIOS2,
                indigo: pl.lightBlue630,
            },
            // [ReactNativePaper]secondary color for your app which complements the primary color.
            accent: {
                light: pl.purple500,
                dark: pl.greenIOS2,
                indigo: pl.lightBlue630,
            },
            // [ReactNavigation]The color of borders, e.g. header border, tab bar border etc.
            border: {
                light: pl.grey300,
                dark: pl.grey850,
                indigo: pl.blueIndigo900
            },
            border2: {
                light: pl.grey600,
                dark: pl.amber500,
                indigo: pl.amber500
            },
            divider: {
                light: pl.grey300,
                dark: pl.grey800,
                indigo: pl.blueIndigo900
            },
            // ---end main


            // ---start text
            // [ReactNativePaper]text color for content.
            // [ReactNavigation]The text color of various elements.
            text: {
                light: pl.black,
                dark: pl.white,
                indigo: pl.blueIndigo50
            },
            text2: {
                light: pl.grey800,
                dark: pl.grey200,
                indigo: pl.blueIndigo100
            },
            text3: {
                light: pl.grey800,
                dark: pl.grey400,
                indigo: pl.blueIndigo150
            },
            buttonText: {
                light: pl.white,
                dark: pl.orange50,
                indigo: pl.blueIndigoA700,
            },
            buttonText2: {
                light: pl.red100,
                dark: pl.white,
                indigo: pl.indigo100
            },
            caption: {
                light: pl.grey900,
                dark: pl.grey500,
                indigo: pl.grey500
            },
            caption2: {
                light: pl.grey800,
                dark: pl.grey600,
                indigo: pl.grey600
            },
            paragraph: {
                light: pl.grey900,
                dark: pl.grey200,
                indigo: pl.grey200
            },
            paragraph2: {
                light: pl.grey700,
                dark: pl.grey400,
                indigo: pl.grey400
            },
            // ---end text


            // ---start background
            // [ReactNativePaper]background color for pages, such as lists.
            // [ReactNavigation]The color of various backgrounds, such as background color for the screens.
            background: {
                light: pl.white,
                dark: pl.black,
                indigo: pl.blueIndigoA400
            },
            // [ReactNativePaper]background color for elements containing content, such as cards.
            surface: {
                light: pl.grey100,
                dark: pl.black,
                indigo: pl.blueIndigoA100
            },
            surface2: {
                light: pl.grey100,
                dark: pl.grey5IOS3,
                indigo: pl.blueIndigo300
            },
            surface3: {
                light: pl.grey100,
                dark: pl.grey4IOS3,
                indigo: pl.blueGrey870
            },
            // [ReactNavigation]The background color of card-like elements, such as headers, tab bars etc.
            card: {
                light: pl.white,
                dark: pl.black,
                indigo: pl.blueIndigoA700
            },
            btnBackground: {
                light: pl.teal400,
                dark: pl.orange800,
                indigo: pl.tealA500
            },
            btnBackground2: {
                light: pl.purple500,
                dark: pl.redIOS3,
                indigo: pl.lightBlue630,
            },
            // [ReactNativePaper]background color for snackbars
            onSurface: {
                light: pl.black,
                dark: pl.white,
                indigo: pl.white
            },
            onBackground: {
                light: pl.black,
                dark: pl.white,
                indigo: pl.white
            },
            paper: {
                light: pl.yellow50,
                dark: pl.amber50,
                indigo: pl.amber50
            },
            paper2: {
                light: pl.lightGreen50,
                dark: pl.green50,
                indigo: pl.green50,
            },
            // ---end background


            // ---start tip
            success: {
                light: pl.lightGreenA720,
                dark: pl.green610,
                indigo: pl.green610
            },
            error: {
                light: pl.redA420,
                dark: pl.red910,
                indigo: pl.red910
            },
            warning: {
                light: pl.yellow780,
                dark: pl.yellow720,
                indigo: pl.yellow720
            },
            // [ReactNativePaper]background color for badges
            // [ReactNavigation]The color of Tab Navigator badge.
            notification: {
                light: pl.pinkA400,
                dark: pl.pinkA100,
                indigo: pl.pinkA100,
            },
            info: {
                light: pl.blue300,
                dark: pl.blue500,
                indigo: pl.blue500,
            },
            // --- end tip


            // --- start functional
            // [ReactNativePaper]color for disabled elements.
            disabled: {
                light: color(pl.black).alpha(0.26).rgb().string(),
                dark: color(pl.white).alpha(0.38).rgb().string(),
                indigo: color(pl.white).alpha(0.38).rgb().string(),
            },
            // [ReactNativePaper]color for placeholder text, such as input placeholder.
            placeholder: {
                light: color(pl.black).alpha(0.54).rgb().string(),
                dark: color(pl.white).alpha(0.54).rgb().string(),
                indigo: pl.blueIndigo150,
            },
            // [ReactNativePaper]color for backdrops of various components such as modals.
            backdrop: {
                light: color(pl.black).alpha(0.5).rgb().string(),
                dark: color(pl.white).alpha(0.6).rgb().string(),
                indigo: color(pl.black).alpha(0.9).rgb().string(),
            },
            transparent: {
                light: pl.transparent,
                dark: pl.transparent,
                indigo: pl.transparent,
            },
            // --- end functional
        },
        fonts: {
            ...fontsWarehouse,
        },
        animation: {
            scale: {
                light: 1.0,
                dark: 1.0,
                indigo: 1.0
            },
        },
        typography: {
            header: {
                fontFamily: commonFontFamily,
                fontWeight: {
                    light: 'bold',
                    dark: 'bold',
                    indigo: 'bold'
                },
            },
            body: {
                fontFamily: commonFontFamily,
            }
        },
        victory: getVictoryTheme()
    }
    return themeWarehouse;
}

const extractThemesFromWarehouse = (arg: unknown, themeName: string) => {
    let themeWarehouseNode = arg as JSONSerializable;
    let themeNode: JSONSerializable = {}
    const nodeKeys = Object.keys(themeWarehouseNode)
    nodeKeys.forEach(k => {
        if (!isSameStructure(themeWarehouseNode[k], EThemes)) {
            themeNode[k] = extractThemesFromWarehouse(themeWarehouseNode[k], themeName)
        } else if (isLeafParent(themeWarehouseNode[k])) {
            themeNode[k] = themeWarehouseNode[k][themeName]
        } else {
            themeNode[k] = {}
        }
    })
    return themeNode;
}

export const getThemes = () => {
    let themes: JSONSerializable = {};
    const themeNames = Object.values(EThemes)
    themeNames.forEach((name: string) => {
        themes[name] = extractThemesFromWarehouse(getThemeWareHouse(), name)
    })
    return themes as Themes;
}

export const themes = getThemes();

const firstTheme = themes.light;

export const defaultTheme = firstTheme;
