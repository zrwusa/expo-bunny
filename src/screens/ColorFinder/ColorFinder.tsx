import React, {useState} from "react";
import {ButtonTO, InButtonText, Text, TextInput, View} from "../../components/UI";
import {useThemeLabor} from "../../providers/theme-labor";
import {checkColor, colorFaultTolerance, deltaEDes, diffColors} from "../../utils/color";
import {ColorDiffWithPaletteItem, ColorDiffWithThemeColorsItem, ColorInputItem, PaletteKeys, ThemeColorKeys, ThemeName} from "../../types";
import {NativeSyntheticEvent, ScrollView, TextInputKeyPressEventData} from "react-native";
import {getStyles} from "./styles";
import {useSizeLabor} from "../../providers/size-labor";
import {palette} from "../../utils";
import {Card, Row} from "../../containers";
import {collectBLResult} from "../../store/actions";
import {blError} from "../../helpers";
import {useDispatch} from "react-redux";
import {ColorTranslator} from "colortranslator";
import {CopyableText} from "../../components/CopyableText";
import {ColorValuesCard} from "../../components/ColorValuesCard";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {Tab} from "../../components";

export type UglyColorType = '' | 'RGB' | 'Hex' | 'HSL';

export function ColorFinderScreen() {
    const {t} = useTranslation()
    const st = shortenTFunctionKey(t, 'screens.ColorFinder')
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const dispatch = useDispatch()
    const {themes} = themeLabor;
    const styles = getStyles(sizeLabor, themeLabor)
    const [inputText, setInputText] = useState('')
    const [colorInput, setColorInput] = useState<ColorInputItem>({text: '', hex: '', RGB: '', HSL: ''})
    const [similarColorsFromTheme, setSimilarColorsFromTheme] = useState<ColorDiffWithThemeColorsItem[]>([])
    const [similarColorsFromPalette, setSimilarColorsFromPalette] = useState<ColorDiffWithPaletteItem[]>([])

    const [uglyType, setUglyType] = useState<UglyColorType>('RGB')

    const formatUglyStringToRGB = (colorString: string) => {
        if (colorString && colorString.substring(0, 3).toLowerCase() !== 'rgb') {
            const escaped09 = escape(colorString).replaceAll('%09', ',');
            const escaped20 = escaped09.replaceAll('%20', ',');
            const truncated = escaped20.split(',').slice(0, 3).join(',')
            return `rgb(${truncated})`
        } else {
            return colorString
        }
    }
    const getSimilarColor = () => {

        const inputColorText = colorFaultTolerance(colorInput.text)
        const checkColorResult = checkColor(inputColorText)
        if (!checkColorResult.isColor) {
            dispatch(collectBLResult(blError('Not a color string', true)))
            return
        }
        const themesKeys = Object.keys(themes) as ThemeName []
        let _similarColorsFromTheme: ColorDiffWithThemeColorsItem[] = []
        let _similarColorsFromPalette: ColorDiffWithPaletteItem[] = []

        themesKeys.forEach((themeName) => {
            const theme = themes[themeName]
            const {colors} = theme;
            const similarIndexed: ColorDiffWithThemeColorsItem[] = []
            const colorKeys = Object.keys(colors) as ThemeColorKeys[];
            colorKeys.forEach((colorKey) => {
                const themeColor = colorFaultTolerance(colors[colorKey])
                if (themeColor && inputColorText) {
                    const diff = diffColors(themeColor, inputColorText)
                    const indexedColor = {
                        keyInThemeColors: colorKey,
                        hex: ColorTranslator.toHEX(themeColor),
                        RGB: ColorTranslator.toRGB(themeColor),
                        HSL: ColorTranslator.toHSL(themeColor),
                        diff: diff,
                        diffDes: deltaEDes(diff),
                        themeName
                    };
                    similarIndexed.push(indexedColor)
                }
            })
            const sortedSimilarIndexed = similarIndexed.sort((a, b) => {
                return a.diff - b.diff
            })
            const similarObj = sortedSimilarIndexed[0];
            _similarColorsFromTheme.push(similarObj);

        })
        setSimilarColorsFromTheme(_similarColorsFromTheme)

        const similarIndexedPalette: ColorDiffWithPaletteItem[] = []
        const colorPaletteKeys = Object.keys(palette) as PaletteKeys[];
        colorPaletteKeys.forEach((colorKey) => {
            const paletteColor = colorFaultTolerance(palette[colorKey])
            if (paletteColor && inputColorText) {
                const diff = diffColors(paletteColor, inputColorText)
                const indexedColor = {
                    keyInPalette: colorKey,
                    hex: ColorTranslator.toHEX(paletteColor),
                    RGB: ColorTranslator.toRGB(paletteColor),
                    HSL: ColorTranslator.toHSL(paletteColor),
                    diff: diff,
                    diffDes: deltaEDes(diff),
                };
                similarIndexedPalette.push(indexedColor)
            }
        })
        const sortedSimilarIndexedPalette = similarIndexedPalette.sort((a, b) => {
            return a.diff - b.diff
        })
        const similarObjPalette = sortedSimilarIndexedPalette[0];
        _similarColorsFromPalette.push(similarObjPalette);
        _similarColorsFromPalette.push(sortedSimilarIndexedPalette[1]);
        _similarColorsFromPalette.push(sortedSimilarIndexedPalette[3]);
        _similarColorsFromPalette.push(sortedSimilarIndexedPalette[4]);
        _similarColorsFromPalette.push(sortedSimilarIndexedPalette[5]);
        _similarColorsFromPalette.push(sortedSimilarIndexedPalette[6]);
        setSimilarColorsFromPalette(_similarColorsFromPalette)
    }
    const handleSimilarColor = () => {
        getSimilarColor()
    }
    const handleChangeTextFrom = (text: string) => {
        setInputText(text)
        let beautiful = '';
        switch (uglyType) {
            case "RGB":
                beautiful = formatUglyStringToRGB(text)
                break;
            default:
                beautiful = text
                break;
        }
        let _text = colorFaultTolerance(beautiful)
        if (_text) {
            setColorInput({
                text: _text,
                hex: ColorTranslator.toHEX(_text),
                RGB: ColorTranslator.toRGB(_text),
                HSL: ColorTranslator.toHSL(_text),
            })
        } else {
            setColorInput({
                text: '',
                hex: '',
                RGB: '',
                HSL: ''
            })
        }
    }

    const handleKeyPress = ({nativeEvent}: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (nativeEvent.key === 'Enter') {
            getSimilarColor()
        }
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <Card titleMode="OUT" title={st('colorInput')}>
                    <Tab items={['Beautiful', 'RGB', 'Hex', 'HSL']}
                         value={uglyType}
                         onChange={(item) => {
                             setUglyType(item)
                         }}/>
                    <TextInput style={styles.input} value={inputText}
                               placeholder={st('inputAColorString')}
                               onChangeText={handleChangeTextFrom}
                               onKeyPress={handleKeyPress}
                               autoCapitalize='none'
                    />
                    <ColorValuesCard item={colorInput}/>
                    <Row size="l">
                        <ButtonTO style={styles.button} onPress={handleSimilarColor}>
                            <InButtonText>{st('findSimilarColors')}</InButtonText>
                        </ButtonTO>
                    </Row>
                </Card>
                <Card titleMode="OUT" title={st('similarColorFromPalette')}>
                    {
                        similarColorsFromPalette.map(similarColorItem => {
                            return <View key={similarColorItem.keyInPalette}>
                                <Row size="xs" style={styles.row}>
                                    <Text>Diff</Text>
                                    <Text>{similarColorItem.diff.toFixed(2)}</Text>
                                </Row>
                                <Row size="xs" style={styles.row}>
                                    <Text>Diff Tip</Text>
                                    <Text>{similarColorItem.diffDes}</Text>
                                </Row>
                                <Row size="xs" style={styles.row}>
                                    <Text>Key</Text><CopyableText>{similarColorItem.keyInPalette}</CopyableText>
                                </Row>
                                <ColorValuesCard item={similarColorItem}/>
                            </View>
                        })
                    }
                </Card>
                <Card titleMode="OUT" title={st('similarColorsFromThemes')}>
                    {
                        similarColorsFromTheme.map(similarColorItem => {
                            return <View key={similarColorItem.themeName}>
                                <Row size="m" style={styles.row}>
                                    <Text>Diff</Text>
                                    <Text>{similarColorItem.diff.toFixed(2)}</Text>
                                </Row>
                                <Row size="m" style={styles.row}>
                                    <Text>Diff Tip</Text>
                                    <Text>{similarColorItem.diffDes}</Text>
                                </Row>
                                <Row size="m" style={styles.row}>
                                    <Text>Theme</Text><Text>{similarColorItem.themeName}</Text>
                                </Row>
                                <Row size="m" style={styles.row}>
                                    <Text>Key</Text><CopyableText>{similarColorItem.keyInThemeColors}</CopyableText>
                                </Row>
                                <ColorValuesCard item={similarColorItem}/>
                            </View>
                        })
                    }
                </Card>
            </View>
        </ScrollView>
    )
}
