import {configureFontsWarehouse} from "./fonts";
import {ThemeWarehouse} from "../../types/styles";
import color from "color";
import {palette} from "./palette";
import {TraversableNested} from "../../types/helpers";
import {EThemes} from "../../types/enums";

const fonts = configureFontsWarehouse();

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
            default: palette.teal800,
            dark: palette.purple400,
        },
        accent: {
            default: palette.blue400,
            dark: palette.tealA700
        },
        background: {
            default: palette.grey200,
            dark: palette.black900
        },
        surface: {
            default: palette.white,
            dark: palette.black900
        },
        error: {
            default: palette.red600,
            dark: palette.pink300
        },
        text: {
            default: palette.black,
            dark: palette.white
        },
        notification: {
            default: palette.pinkA400,
            dark: palette.pinkA100,
        },
        transparent: {
            default: palette.transparent,
            dark: palette.transparent,
        },
        onBackground: {
            default: palette.black,
            dark: palette.white
        },
        onSurface: {
            default: palette.black,
            dark: palette.white
        },
        backdrop: {
            default: color(palette.black).alpha(0.5).rgb().string(),
            dark: color(palette.black).alpha(0.5).rgb().string(),
        },
        disabled: {
            default: color(palette.black).alpha(0.26).rgb().string(),
            dark: color(palette.white).alpha(0.38).rgb().string(),
        },
        placeholder: {
            default: color(palette.black).alpha(0.54).rgb().string(),
            dark: color(palette.white).alpha(0.54).rgb().string(),
        },


        btnTextColor: {
            default: palette.white,
            dark: palette.white,
        },
        btnBgColor: {
            default: palette.teal400,
            dark: palette.orange800,
        },
        demoColor0: {
            default: palette.white,
            dark: palette.white,
        },
        demoColor1: {
            default: palette.teal400,
            dark: palette.orange800
        },
    },
    fonts: {
        ...fonts,
        demoFont0: {
            fontFamily: {
                default: fonts.demoFont0.fontFamily.default,
                dark: fonts.demoFont0.fontFamily.dark
            },
            fontWeight: {
                // Todo undefined should not occur
                default: fonts.demoFont0.fontWeight.default,
                dark: fonts.demoFont0.fontWeight.dark
            },

        },
        demoFont1: {
            fontFamily: {
                default: fonts.demoFont1.fontFamily.default,
                dark: fonts.light.fontFamily.dark
            },
            fontWeight: {
                default: fonts.demoFont1.fontWeight.default,
                dark: fonts.demoFont1.fontWeight.dark
            },
        },
    },
    animation: {
        scale: {
            default: 1.0,
            dark: 1.0
        },
        demoProperty0: {
            default: 0,
            dark: 0
        },
        demoProperty1: {
            default: 1,
            dark: 1
        },
    },
    typography: {
        header: {
            fontFamily: {
                default: fonts.regular.fontFamily.default,
                dark: fonts.regular.fontFamily.dark,
            },
            fontSize: {
                default: 24,
                dark: 24,
            },
            fontWeight: {
                default: 'bold',
                dark: 'bold'
            },
        },
        body: {
            fontFamily: {
                default: fonts.regular.fontFamily.default,
                dark: fonts.regular.fontFamily.dark,
            },
            fontSize: {
                default: 16,
                dark: 16
            },
        }
    },
    borderRadius: {
        xxs: {
            default: 2,
            dark: 2
        },
        xs: {
            default: 4,
            dark: 4
        },
        s: {
            default: 8,
            dark: 8
        },
        m: {
            default: 16,
            dark: 16
        },
        l: {
            default: 32,
            dark: 32
        },
        xl: {
            default: 64,
            dark: 64
        },
        xxl: {
            default: 128,
            dark: 128
        },
    },
    demoThemeProperty0: {
        default: '',
        dark: ''
    },
    demoThemeProperty1: {
        default: '',
        dark: ''
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
    const themeNames = Object.values(EThemes)
    themeNames.forEach(name => {
        themes[name] = extractThemesFromWarehouse(themeWarehouse, name)
    })
    return themes;
}
