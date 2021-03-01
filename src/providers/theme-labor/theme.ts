import {fontsWarehouse} from "./fonts";
import {Themes, ThemeWarehouse, TraversableNested} from "../../types";
import color from "color";
import {EThemes} from "../../constants/constants";
import {pl} from "../../utils";

export const getThemeWareHouse = () => {
    const themeWarehouse: ThemeWarehouse = {
        dark: {
            light: false,
            dark: true
        },
        roundness: {
            light: 4,
            dark: 4,
        },
        mode: {
            light: 'exact',
            dark: 'adaptive'
        },
        colors: {
            primary: {
                light: pl.teal400,
                dark: pl.orange800,
            },
            secondary: {
                light: pl.teal200,
                dark: pl.orange600
            },
            btnText: {
                light: pl.white,
                dark: pl.orange50,
            },
            btnActive: {
                light: pl.lightBlue100,
                dark: pl.lightBlue100
            },
            btnTextSecondary: {
                light: pl.red100,
                dark: pl.indigo100
            },
            btnActiveSecondary: {
                light: pl.lightBlue600,
                dark: pl.deepPurple700
            },
            title: {
                light: pl.grey800,
                dark: pl.white
            },
            titleSecondary: {
                light: pl.grey700,
                dark: pl.grey300
            },
            text: {
                light: pl.black,
                dark: pl.white
            },
            textSecondary: {
                light: pl.grey800,
                dark: pl.grey600
            },
            caption: {
                light: pl.grey900,
                dark: pl.grey500
            },
            captionSecondary: {
                light: pl.grey800,
                dark: pl.grey600
            },
            paragraph: {
                light: pl.grey900,
                dark: pl.grey200
            },
            paragraphSecondary: {
                light: pl.grey700,
                dark: pl.grey400
            },
            border: {
                light: pl.grey350,
                dark: pl.grey850
            },
            borderSecondary: {
                light: pl.grey600,
                dark: pl.amber500
            },
            surface: {
                light: pl.white,
                dark: pl.black900
            },
            surfaceSecondary: {
                light: pl.grey100,
                dark: pl.grey900
            },
            background: {
                light: pl.grey100,
                dark: pl.black900
            },
            backgroundSecondary: {
                light: pl.grey200,
                dark: pl.grey800
            },
            accent: {
                light: pl.blue400,
                dark: pl.tealA700
            },
            accentSecondary: {
                light: pl.blue300,
                dark: pl.teal600
            },
            success: {
                light: pl.lightGreenA720,
                dark: pl.green610
            },
            error: {
                light: pl.redA420,
                dark: pl.red910
            },
            errorSecondary: {
                light: pl.red500,
                dark: pl.pink200
            },
            warning: {
                light: pl.yellow780,
                dark: pl.yellow720
            },
            warningSecondary: {
                light: pl.yellow600,
                dark: pl.yellow800
            },
            notification: {
                light: pl.pinkA400,
                dark: pl.pinkA100,
            },
            notificationSecondary: {
                light: pl.pinkA200,
                dark: pl.pinkA400,
            },
            info: {
                light: pl.blue300,
                dark: pl.blue500,
            },
            infoSecondary: {
                light: pl.blue200,
                dark: pl.blue400,
            },

            onSurface: {
                light: pl.black,
                dark: pl.white
            },
            onSurfaceSecondary: {
                light: pl.black,
                dark: pl.white
            },
            onBackground: {
                light: pl.black,
                dark: pl.white
            },
            onBackgroundSecondary: {
                light: pl.black,
                dark: pl.white
            },
            disabled: {
                light: color(pl.black).alpha(0.26).rgb().string(),
                dark: color(pl.white).alpha(0.38).rgb().string(),
            },
            placeholder: {
                light: color(pl.black).alpha(0.54).rgb().string(),
                dark: color(pl.white).alpha(0.54).rgb().string(),
            },
            backdrop: {
                light: color(pl.black).alpha(0.5).rgb().string(),
                dark: color(pl.black).alpha(0.5).rgb().string(),
            },
            backdropSecondary: {
                light: color(pl.black).alpha(0.5).rgb().string(),
                dark: color(pl.black).alpha(0.5).rgb().string(),
            },
            transparent: {
                light: pl.transparent,
                dark: pl.transparent,
            },
            paper: {
                light: pl.yellow50,
                dark: pl.amber50
            },
            paperSecondary: {
                light: pl.lightGreen50,
                dark: pl.green50
            },
            card: {
                light: pl.white,
                dark: pl.black900
            },
            divider: {
                light: pl.grey390,
                dark: pl.blueGrey320
            },

            // ---start---  react-native-elements
            // Not a best practice, for compatibility with react-native-elements.
            // Obviously, the color variables defined in the react-native-elements theme is not standardized.
            // In the theme, we should care about the role of these color variables rather than the specific values,
            // such as 'primary success', not 'grey0, black'. The specific values should be named in the palette.
            white: {
                light: pl.white,
                dark: pl.black900
            },
            black: {
                light: pl.black800,
                dark: pl.black900
            },
            grey0: {
                light: pl.grey810,
                dark: pl.grey290
            },
            grey1: {
                light: pl.grey790,
                dark: pl.grey390
            },
            grey2: {
                light: pl.grey750,
                dark: pl.grey550
            },
            grey3: {
                light: pl.grey550,
                dark: pl.grey750
            },
            grey4: {
                light: pl.grey390,
                dark: pl.grey790
            },
            grey5: {
                light: pl.grey290,
                dark: pl.grey810
            },
            greyOutline: {
                light: pl.grey410,
                dark: pl.grey410
            },
            searchBg: {
                light: pl.blueGrey850,
                dark: pl.blueGrey850
            },
            // ---end---  react-native-elements
        },
        fonts: {
            ...fontsWarehouse,
        },
        animation: {
            scale: {
                light: 1.0,
                dark: 1.0
            },
        },
        typography: {
            header: {
                fontFamily: {
                    light: fontsWarehouse.regular.fontFamily.light,
                    dark: fontsWarehouse.regular.fontFamily.dark,
                },
                fontWeight: {
                    light: 'bold',
                    dark: 'bold'
                },
            },
            body: {
                fontFamily: {
                    light: fontsWarehouse.regular.fontFamily.light,
                    dark: fontsWarehouse.regular.fontFamily.dark,
                },
            }
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
    const themeNames = Object.values(EThemes)
    themeNames.forEach((name: string) => {
        themes[name] = extractThemesFromWarehouse(getThemeWareHouse(), name)
    })
    return themes as Themes;
}

export const themes = getThemes();

const firstTheme = themes.light;

export const defaultTheme = firstTheme;
