import React, {useState} from "react";
import {ButtonTO, Text, TextInput, View, InButtonText} from "../../components/UI";
import {useThemeLabor} from "../../providers/theme-labor";
import {checkColor, colorFaultTolerance, deltaEDes, diffColors} from "../../utils/color";
import {ColorDiffWithPaletteItem, ColorDiffWithThemeColorsItem, ColorInputItem, PaletteKeys, ThemeColorKeys, ThemeName} from "../../types";
import {NativeSyntheticEvent, ScrollView, TextInputKeyPressEventData} from "react-native";
import {createStyles} from "./styles";
import {useSizeLabor} from "../../providers/size-labor";
import {palette} from "../../utils";
import {Card} from "../../containers";
import {collectBLResult} from "../../store/actions";
import {blError} from "../../helpers";
import {useDispatch} from "react-redux";
import {ColorTranslator} from "colortranslator";
import {CopyableText} from "../../components/CopyableText";
import {ColorValuesCard} from "../../components/ColorValuesCard";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../providers/i18n-labor";


export function ColorFinderScreen() {
    const {t} = useTranslation()
    const st = shortenTFunctionKey(t, 'screens.ColorFinder')
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const dispatch = useDispatch()
    const {themes} = themeLabor;
    const styles = createStyles(sizeLabor, themeLabor)
    const [inputText, setInputText] = useState('')
    const [colorInput, setColorInput] = useState<ColorInputItem>({text: '', hex: '', RGB: '', HSL: ''})
    const [similarColorsFromTheme, setSimilarColorsFromTheme] = useState<ColorDiffWithThemeColorsItem[]>([])
    const [similarColorsFromPalette, setSimilarColorsFromPalette] = useState<ColorDiffWithPaletteItem[]>([])


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
        let _text = colorFaultTolerance(text)
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
        <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
                <Card title={st('colorInput')}>
                    <TextInput style={styles.input} value={inputText}
                               placeholder={st('inputAColorString')}
                               onChangeText={handleChangeTextFrom}
                               onKeyPress={handleKeyPress}
                               autoCapitalize='none'
                    />
                    <ColorValuesCard item={colorInput}/>
                    <ButtonTO onPress={handleSimilarColor}><InButtonText>{st('findSimilarColors')}</InButtonText></ButtonTO>
                </Card>
                <Card title={st('similarColorFromPalette')}>
                    {
                        similarColorsFromPalette.map(similarColorItem => {
                            return <View key={similarColorItem.keyInPalette}>
                                <View style={styles.row}>
                                    <Text>Diff</Text>
                                    <Text>{similarColorItem.diff.toFixed(2)}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text>Diff Tip</Text>
                                    <Text>{similarColorItem.diffDes}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text>Key</Text><CopyableText>{similarColorItem.keyInPalette}</CopyableText>
                                </View>
                                <ColorValuesCard item={similarColorItem}/>
                            </View>
                        })
                    }
                </Card>
                <Card title={st('similarColorsFromThemes')}>
                    {
                        similarColorsFromTheme.map(similarColorItem => {
                            return <View key={similarColorItem.themeName}>
                                <View style={styles.row}>
                                    <Text>Diff</Text>
                                    <Text>{similarColorItem.diff.toFixed(2)}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text>Diff Tip</Text>
                                    <Text>{similarColorItem.diffDes}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text>Theme</Text><Text>{similarColorItem.themeName}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text>Key</Text><CopyableText>{similarColorItem.keyInThemeColors}</CopyableText>
                                </View>
                                <ColorValuesCard item={similarColorItem}/>
                            </View>
                        })
                    }
                </Card>
            </View>
        </ScrollView>
    )
}
