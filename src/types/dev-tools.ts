import {ThemeName} from "./styles";

export type ColorInputItem = { text: string, hex: string, RGB: string, HSL: string }
export type ColorDiffWithThemeColorsItem = {
    themeName: ThemeName,
    keyInThemeColors: string,
    hex: string, RGB: string,
    HSL: string,
    diff: number, diffDes: string,
}
export type ColorDiffWithPaletteItem = {
    keyInPalette: string,
    hex: string, RGB: string,
    HSL: string,
    diff: number, diffDes: string,
}
