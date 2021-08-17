import {CheckColor, CheckColorResult, CheckResultType} from '../types';
import {EXCEPTIONAL_COLOR, STANDARD_COLOR_NAME_ALL} from '../constants';
import {ColorTranslator} from 'colortranslator'

export function isColor(colorString: string) {
    if (isColorName(colorString)) {
        return true
    }
    if (isExceptionalColor(colorString)) {
        return true
    }
    if (isHex(colorString)) {
        return true
    }
    if (isHexA(colorString)) {
        return true
    }
    if (isRGB(colorString)) {
        return true
    }
    if (isRGBA(colorString)) {
        return true
    }
    if (isHSL(colorString)) {
        return true
    }
    if (isHSLA(colorString)) {
        return true
    }

    return false
    // const RegExpColor = /^(?:#(?:[A-Fa-f0-9]{3}){1,2}|(?:rgb[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}|hsl[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*|(?:rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}|hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,)\s*0*(?:\.\d+|1(?:\.0*)?)\s*)[)])$/
    // return RegExpColor.test(colorString);
}

export function checkColor(colorString: string) {
    const checkResult: CheckColorResult = {
        isColor: isColor(colorString),
        isColorName: isColorName(colorString),
        isExceptional: isExceptionalColor(colorString),
        isHex: isHex(colorString),
        isHexA: isHexA(colorString),
        isRGB: isRGB(colorString),
        isRGBA: isRGBA(colorString),
        isHSL: isHSL(colorString),
        isHSLA: isHSLA(colorString),
    }
    const checkResultKeys = Object.keys(checkResult) as CheckColor[]
    let colorType: CheckResultType = ''
    for (let item of checkResultKeys) {
        if (item !== 'isColor') {
            colorType = (checkResult[item] ? item.substr(2, item.length - 2) : '') as CheckResultType
            if (colorType) {
                break;
            }
        }
    }
    return {...checkResult, type: colorType};
}


export function isHex(colorString: string) {
    const RegExpHex = /^#(?:[A-Fa-f0-9]{3}){1,2}$/
    return RegExpHex.test(colorString);
}

export function isHexA(colorString: string) {
    const RegExpHex = /^#(?:[A-Fa-f0-9]{4}){1,2}$/
    return RegExpHex.test(colorString);
}

export function isRGB(colorString: string) {
    const RegExpRGB = /^rgb[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}[)]$/;
    return RegExpRGB.test(colorString);
}

export function isRGBA(colorString: string) {
    const RegExpRGBA = /^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/
    return RegExpRGBA.test(colorString);
}

export function isHSL(colorString: string) {
    const RegExpHSL = /^hsl[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*[)]$/
    return RegExpHSL.test(colorString);
}

export function isHSLA(colorString: string) {
    const RegExpHSLA = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/
    return RegExpHSLA.test(colorString);
}

export function getColorByName(colorName: string) {
    const key = colorName.toLowerCase() as keyof typeof STANDARD_COLOR_NAME_ALL
    return STANDARD_COLOR_NAME_ALL[key]
}

export function isColorName(colorName: string) {
    return !!getColorByName(colorName)
}

export function getExceptionalColor(colorName: string) {
    const key = colorName.toLowerCase() as keyof typeof EXCEPTIONAL_COLOR
    return EXCEPTIONAL_COLOR[key]
}

export function isExceptionalColor(colorName: string) {
    return !!getExceptionalColor(colorName)
}

export function colorFaultTolerance(colorString: string) {
    if (!isColor(colorString)) {
        return ''
    }
    if (isExceptionalColor(colorString)) {
        return getExceptionalColor(colorString).RGBA
    }
    if (isColorName(colorString)) {
        return getColorByName(colorString).RGBA
    }
    return colorString
}


export function rgbaStringToRgbaArray(rgba: string) {
    return rgba.substring(5, rgba.length - 1)
        .replace(/ /g, '')
        .split(',').map(item => {
            return parseFloat(item)
        });
}

export function rgbArrayToLab(rgb: number[]) {
    let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
    x = (x > 0.008856) ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
    y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
    z = (z > 0.008856) ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116;
    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}


export function deltaEFromString(colorA: string, colorB: string, shouldDiffAlpha: boolean) {
    // todo some diff of colors are over 100,need ensure if that a bug
    const colorATolerance = colorFaultTolerance(colorA)
    const colorBTolerance = colorFaultTolerance(colorB)
    if (!colorATolerance || !colorBTolerance) {
        return 100
    }
    const rgbA = ColorTranslator.toRGBA(colorATolerance)
    const rgbB = ColorTranslator.toRGBA(colorBTolerance)
    const rgbaArrayA = rgbaStringToRgbaArray(rgbA)
    const rgbaArrayB = rgbaStringToRgbaArray(rgbB)
    let labA = rgbArrayToLab(rgbaArrayA);
    let labB = rgbArrayToLab(rgbaArrayB);
    let deltaL = labA[0] - labB[0];
    let deltaA = labA[1] - labB[1];
    let deltaB = labA[2] - labB[2];
    let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
    let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
    let deltaC = c1 - c2;
    let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
    deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
    let sc = 1.0 + 0.045 * c1;
    let sh = 1.0 + 0.015 * c1;
    let deltaLKlsl = deltaL / (1.0);
    let deltaCkcsc = deltaC / (sc);
    let deltaHkhsh = deltaH / (sh);
    let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;

    let deltaEDiff = i < 0 ? 0 : Math.sqrt(i)
    if (shouldDiffAlpha) {
        let alphaDiff = rgbaArrayA[3] - rgbaArrayB[3]
        let alphaDiffS = 100 * Math.sqrt(alphaDiff * alphaDiff)
        return deltaEDiff;
    } else {
        return deltaEDiff;
    }

    // Delta E	Perception
    // <= 1.0	Not perceptible by human eyes.
    // 1 - 2	Perceptible through close observation.
    // 2 - 10	Perceptible at a glance.
    // 11 - 49	Colors are more similar than opposite
    // 100	Colors are exact opposite
}


export function deltaEDes(similarityValue: number) {
    let des = ''
    if (similarityValue === 0) {
        des = 'Perception'
    } else if (similarityValue <= 1) {
        des = 'Not perceptible by human eyes'
    } else if (similarityValue <= 2) {
        des = 'Perceptible through close observation'
    } else if (similarityValue <= 10) {
        des = 'Perceptible at a glance'
    } else if (similarityValue <= 49) {
        des = 'Similar than opposite'
    } else if (similarityValue > 49) {
        des = 'Exact opposite'
    }
    return des
}

export function diffColors(colorA: string, colorB: string) {
    return deltaEFromString(colorA, colorB, false)
}

