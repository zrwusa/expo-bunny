import {fontsWarehouse} from "./fonts";
import {ThemeWarehouse} from "../../types/styles";
import color from "color";
import {TraversableNested} from "../../types/utils";
import {EThemes} from "../../utils/constants";
import {pl} from "../utils";

export const getThemeWareHouse = () => {
    const themeWarehouse: ThemeWarehouse = {
        dark: {
            default: false,
            dark: true
        },
        colors: {
            primary: {
                default: pl.teal400,
                dark: pl.orange800,
            },
            secondary: {
                default: pl.teal200,
                dark: pl.orange600
            },
            btnText: {
                default: pl.white,
                dark: pl.orange50,
            },
            btnActive: {
                default: pl.lightBlue100,
                dark: pl.lightBlue100
            },
            btnTextSecondary: {
                default: pl.red100,
                dark: pl.indigo100
            },
            btnActiveSecondary: {
                default: pl.lightBlue600,
                dark: pl.deepPurple700
            },
            title: {
                default: pl.grey800,
                dark: pl.white
            },
            titleSecondary: {
                default: pl.grey700,
                dark: pl.grey300
            },
            text: {
                default: pl.black,
                dark: pl.white
            },
            textSecondary: {
                default: pl.grey800,
                dark: pl.grey600
            },
            caption: {
                default: pl.grey900,
                dark: pl.grey500
            },
            captionSecondary: {
                default: pl.grey800,
                dark: pl.grey600
            },
            paragraph: {
                default: pl.grey900,
                dark: pl.grey200
            },
            paragraphSecondary: {
                default: pl.grey700,
                dark: pl.grey400
            },
            border: {
                default: pl.grey500,
                dark: pl.orange900
            },
            borderSecondary: {
                default: pl.grey600,
                dark: pl.amber500
            },
            surface: {
                default: pl.grey50,
                dark: pl.grey800
            },
            surfaceSecondary: {
                default: pl.grey100,
                dark: pl.grey900
            },
            background: {
                default: pl.grey200,
                dark: pl.black900
            },
            backgroundSecondary: {
                default: pl.grey100,
                dark: pl.grey800
            },
            accent: {
                default: pl.blue400,
                dark: pl.tealA700
            },
            accentSecondary: {
                default: pl.blue300,
                dark: pl.teal600
            },

            error: {
                default: pl.red600,
                dark: pl.pink300
            },
            errorSecondary: {
                default: pl.red500,
                dark: pl.pink200
            },
            warn: {
                default: pl.yellow700,
                dark: pl.yellow900
            },
            warnSecondary: {
                default: pl.yellow600,
                dark: pl.yellow800
            },
            notification: {
                default: pl.pinkA400,
                dark: pl.pinkA100,
            },
            notificationSecondary: {
                default: pl.pinkA200,
                dark: pl.pinkA400,
            },
            info: {
                default: pl.blue300,
                dark: pl.blue500,
            },
            infoSecondary: {
                default: pl.blue200,
                dark: pl.blue400,
            },

            onSurface: {
                default: pl.black,
                dark: pl.white
            },
            onSurfaceSecondary: {
                default: pl.black,
                dark: pl.white
            },
            onBackground: {
                default: pl.black,
                dark: pl.white
            },
            onBackgroundSecondary: {
                default: pl.black,
                dark: pl.white
            },
            disabled: {
                default: color(pl.black).alpha(0.26).rgb().string(),
                dark: color(pl.white).alpha(0.38).rgb().string(),
            },
            placeholder: {
                default: color(pl.black).alpha(0.54).rgb().string(),
                dark: color(pl.white).alpha(0.54).rgb().string(),
            },
            backdrop: {
                default: color(pl.black).alpha(0.5).rgb().string(),
                dark: color(pl.black).alpha(0.5).rgb().string(),
            },
            backdropSecondary: {
                default: color(pl.black).alpha(0.5).rgb().string(),
                dark: color(pl.black).alpha(0.5).rgb().string(),
            },
            transparent: {
                default: pl.transparent,
                dark: pl.transparent,
            },
            paper: {
                default: pl.yellow50,
                dark: pl.amber50
            },
            paperSecondary: {
                default: pl.lightGreen50,
                dark: pl.green50
            },
        },
        fonts: {
            ...fontsWarehouse,
        },
    }
    return themeWarehouse;
}

const isLeafParent = (obj: object) => {
    let isLeaf: boolean = true
    Object.values(obj).forEach(value => {
        if (!['string', 'boolean', 'number', 'undefined', 'function'].includes(typeof value) && (value !== null)) {
            return isLeaf = false
        }
    })
    return isLeaf;
}

const isSameStructure = (objA: unknown, objB: unknown) => {
    let objATraversable = objA as TraversableNested;
    let objBTraversable = objB as TraversableNested;
    const objAKeys = Object.keys(objATraversable)
    const objBKeys = Object.keys(objBTraversable)
    let isSame = true
    if (objAKeys.length !== objBKeys.length) {
        return isSame = false
    } else {
        objAKeys.forEach((i) => {
            if (!objBKeys.includes(i)) {
                return isSame = false
            }
        })
        return isSame;
    }
}

const extractThemesFromWarehouse = (arg: unknown, themeName: string) => {
    let themeWarehouseNode = arg as TraversableNested;
    let themeNode: TraversableNested = {}
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
    let themes: TraversableNested = {};
    const themeNames = Object.values(EThemes) as TraversableNested
    themeNames.forEach((name: string) => {
        themes[name] = extractThemesFromWarehouse(getThemeWareHouse(), name)
    })
    return themes;
}

export const themes = getThemes();

const firstTheme = themes[Object.keys(themes)[0]];

export const defaultTheme = firstTheme || undefined;
