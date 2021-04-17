import {fontsWarehouse} from "./fonts";
import {JSONSerializable, Themes, ThemeWarehouse} from "../../types";
import color from "color";
import {EThemes} from "../../constants";
import {isLeafParent, isSameStructure, pl} from "../../utils";
import getSizeLabor from "../size-labor/sizeLabor";
import {getVictoryTheme} from "./themeVictory";

export const getThemeWareHouse = () => {
    const {wp} = getSizeLabor().designsBasedOn.iphoneX


    const commonFontFamily = {
        light: fontsWarehouse.regular.fontFamily.light,
        dark: fontsWarehouse.regular.fontFamily.dark,
        gradient: fontsWarehouse.regular.fontFamily.dark,
    }


    const themeWarehouse: ThemeWarehouse = {
        dark: {
            light: false,
            dark: true,
            gradient: true
        },
        roundness: {
            light: wp(4),
            dark: wp(4),
            gradient: wp(10)
        },
        borderRadius: {
            button: {
                light: wp(4),
                dark: wp(4),
                gradient: wp(17)
            },
            input: {
                light: wp(4),
                dark: wp(4),
                gradient: wp(100)
            },
            surface: {
                light: wp(10),
                dark: wp(10),
                gradient: wp(10)
            }
        },
        mode: {
            light: 'exact',
            dark: 'adaptive',
            gradient: 'exact'
        },
        colors: {
            // ---start main
            // [ReactNativePaper]primary color for your app, usually your brand color.
            // [ReactNavigation]The primary color of the app used to tint various elements. Usually you'll want to use your brand color for this.
            primary: {
                light: pl.teal400,
                dark: pl.orange800,
                gradient: pl.tealA500
            },
            secondary: {
                light: pl.teal300,
                dark: pl.orange700,
                gradient: pl.lightBlue630,
            },
            // [ReactNativePaper]secondary color for your app which complements the primary color.
            accent: {
                light: pl.purple500,
                dark: pl.blue600,
                gradient: pl.lightBlue630
            },
            // [ReactNavigation]The color of borders, e.g. header border, tab bar border etc.
            border: {
                light: pl.grey350,
                dark: pl.grey850,
                gradient: pl.blueIndigo900
            },
            border2: {
                light: pl.grey600,
                dark: pl.amber500,
                gradient: pl.amber500
            },
            divider: {
                light: pl.grey390,
                dark: pl.grey800,
                gradient: pl.blueIndigo900
            },
            // ---end main


            // ---start text
            // [ReactNativePaper]text color for content.
            // [ReactNavigation]The text color of various elements.
            text: {
                light: pl.black,
                dark: pl.grey400,
                gradient: pl.blueIndigo50
            },
            text2: {
                light: pl.grey800,
                dark: pl.grey600,
                gradient: pl.blueIndigo100
            },
            text3: {
                light: pl.grey800,
                dark: pl.grey600,
                gradient: pl.blueIndigo150
            },
            btnText: {
                light: pl.white,
                dark: pl.orange50,
                gradient: pl.blueIndigoA700,
            },
            btnText2: {
                light: pl.red100,
                dark: pl.indigo100,
                gradient: pl.indigo100
            },
            caption: {
                light: pl.grey900,
                dark: pl.grey500,
                gradient: pl.grey500
            },
            caption2: {
                light: pl.grey800,
                dark: pl.grey600,
                gradient: pl.grey600
            },
            paragraph: {
                light: pl.grey900,
                dark: pl.grey200,
                gradient: pl.grey200
            },
            paragraph2: {
                light: pl.grey700,
                dark: pl.grey400,
                gradient: pl.grey400
            },
            // ---end text


            // ---start background
            // [ReactNativePaper]background color for pages, such as lists.
            // [ReactNavigation]The color of various backgrounds, such as background color for the screens.
            background: {
                light: pl.grey100,
                dark: pl.black900,
                gradient: pl.blueIndigoA400
            },
            background2: {
                light: pl.grey200,
                dark: pl.grey800,
                gradient: pl.blueIndigoA700
            },
            background3: {
                light: pl.white,
                dark: pl.black,
                gradient: pl.blueIndigoA100
            },
            btnBackground: {
                light: pl.teal400,
                dark: pl.orange800,
                gradient: pl.tealA500
            },
            btnBackground2: {
                light: pl.teal300,
                dark: pl.orange800,
                gradient: pl.lightBlue630,
            },
            // [ReactNavigation]The background color of card-like elements, such as headers, tab bars etc.
            card: {
                light: pl.white,
                dark: pl.black900,
                gradient: pl.blueIndigoA700
            },
            // [ReactNativePaper]background color for elements containing content, such as cards.
            surface: {
                light: pl.white,
                dark: pl.black900,
                gradient: pl.blueGrey870
            },
            surface2: {
                light: pl.grey100,
                dark: pl.grey900,
                gradient: pl.blueIndigo900
            },
            // [ReactNativePaper]background color for snackbars
            onSurface: {
                light: pl.black,
                dark: pl.white,
                gradient: pl.white
            },
            onBackground:{
                light: pl.black,
                dark: pl.white,
                gradient: pl.white
            },
            paper: {
                light: pl.yellow50,
                dark: pl.amber50,
                gradient: pl.amber50
            },
            paper2: {
                light: pl.lightGreen50,
                dark: pl.green50,
                gradient: pl.green50,
            },
            // ---end background


            // ---start tip
            success: {
                light: pl.lightGreenA720,
                dark: pl.green610,
                gradient: pl.green610
            },
            error: {
                light: pl.redA420,
                dark: pl.red910,
                gradient: pl.red910
            },
            warning: {
                light: pl.yellow780,
                dark: pl.yellow720,
                gradient: pl.yellow720
            },
            // [ReactNativePaper]background color for badges
            // [ReactNavigation]The color of Tab Navigator badge.
            notification: {
                light: pl.pinkA400,
                dark: pl.pinkA100,
                gradient: pl.pinkA100,
            },
            info: {
                light: pl.blue300,
                dark: pl.blue500,
                gradient: pl.blue500,
            },
            // --- end tip


            // --- start functional
            // [ReactNativePaper]color for disabled elements.
            disabled: {
                light: color(pl.black).alpha(0.26).rgb().string(),
                dark: color(pl.white).alpha(0.38).rgb().string(),
                gradient: color(pl.white).alpha(0.38).rgb().string(),
            },
            // [ReactNativePaper]color for placeholder text, such as input placeholder.
            placeholder: {
                light: color(pl.black).alpha(0.54).rgb().string(),
                dark: color(pl.white).alpha(0.54).rgb().string(),
                gradient: pl.blueIndigo150,
            },
            // [ReactNativePaper]color for backdrops of various components such as modals.
            backdrop: {
                light: color(pl.black).alpha(0.5).rgb().string(),
                dark: color(pl.black).alpha(0.9).rgb().string(),
                gradient: color(pl.black).alpha(0.9).rgb().string(),
            },
            transparent: {
                light: pl.transparent,
                dark: pl.transparent,
                gradient: pl.transparent,
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
                gradient: 1.0
            },
        },
        typography: {
            header: {
                fontFamily: commonFontFamily,
                fontWeight: {
                    light: 'bold',
                    dark: 'bold',
                    gradient: 'bold'
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
