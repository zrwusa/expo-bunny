import {ThemeName} from "./styles";

export type ColorInputItem = { text: string, Hex: string, RGB: string, HSL: string }
export type ColorDiffWithThemeColorsItem = {
    themeName: ThemeName,
    keyInThemeColors: string,
    Hex: string,
    RGB: string,
    HSL: string,
    diff: number, diffDes: string,
}
export type ColorDiffWithPaletteItem = {
    keyInPalette: string,
    Hex: string,
    RGB: string,
    HSL: string,
    diff: number, diffDes: string,
}
