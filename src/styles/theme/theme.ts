import {fontsWarehouse} from "./fonts";
import {ThemeWarehouse} from "../../types/styles";
import color from "color";
import {TraversableNested} from "../../types/utils";
import {EThemes} from "../../utils/constants";
import {ms, pl} from "../utils";

export const themeWarehouse: ThemeWarehouse = {
    dark: {
        default: false,
        dark: true
    },
    roundness: {
        default: 4,
        dark: 4,
    },
    mode: {
        default: '',
        dark: 'adaptive'
    },
    colors: {
        primary: {
            default: pl.teal400,
            dark: pl.orange800,
        },
        accent: {
            default: pl.blue400,
            dark: pl.tealA700
        },
        background: {
            default: pl.grey200,
            dark: pl.black900
        },
        surface: {
            default: pl.white,
            dark: pl.black900
        },
        error: {
            default: pl.red600,
            dark: pl.pink300
        },
        text: {
            default: pl.black,
            dark: pl.white
        },
        notification: {
            default: pl.pinkA400,
            dark: pl.pinkA100,
        },
        transparent: {
            default: pl.transparent,
            dark: pl.transparent,
        },
        onBackground: {
            default: pl.black,
            dark: pl.white
        },
        onSurface: {
            default: pl.black,
            dark: pl.white
        },
        backdrop: {
            default: color(pl.black).alpha(0.5).rgb().string(),
            dark: color(pl.black).alpha(0.5).rgb().string(),
        },
        disabled: {
            default: color(pl.black).alpha(0.26).rgb().string(),
            dark: color(pl.white).alpha(0.38).rgb().string(),
        },
        placeholder: {
            default: color(pl.black).alpha(0.54).rgb().string(),
            dark: color(pl.white).alpha(0.54).rgb().string(),
        },


        btnText: {
            default: pl.white,
            dark: pl.white,
        },
        btnBg: {
            default: pl.teal400,
            dark: pl.orange800,
        },
    },
    fonts: {
        ...fontsWarehouse,
    },
    animation: {
        scale: {
            default: 1.0,
            dark: 1.0
        },
    },
    typography: {
        header: {
            fontFamily: {
                default: fontsWarehouse.regular.fontFamily.default,
                dark: fontsWarehouse.regular.fontFamily.dark,
            },
            fontSize: {
                default: ms.fs.xl,
                dark: ms.fs.xl,
            },
            fontWeight: {
                default: 'bold',
                dark: 'bold'
            },
        },
        body: {
            fontFamily: {
                default: fontsWarehouse.regular.fontFamily.default,
                dark: fontsWarehouse.regular.fontFamily.dark,
            },
            fontSize: {
                default: ms.fs.m,
                dark: ms.fs.m,
            },
        }
    },
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
        themes[name] = extractThemesFromWarehouse(themeWarehouse, name)
    })
    return themes;
}

export const themes = getThemes();

const firstTheme = themes[Object.keys(themes)[0]];

export const defaultTheme = firstTheme || undefined;
