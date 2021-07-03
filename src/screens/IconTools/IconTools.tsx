import React, {useState} from "react";
import {ButtonTO, InButtonText, Text, View} from "../../components/UI";
import {ScrollView} from "react-native";
import {getStyles} from "./styles";
import {Card, Row} from "../../containers";
import {useDispatch} from "react-redux";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {glyphIcoMoonMap} from "../../helpers";
import {CopyableText} from "../../components/CopyableText";
import {useBunnyKit} from "../../hooks/bunny-kit";


export function IconToolsScreen() {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.IconTools')
    const dispatch = useDispatch()
    const {themes} = themeLabor;
    const styles = getStyles(sizeLabor, themeLabor)

    const [glyph, setGlyph] = useState('')
    const handleGenerate = () => {
        setGlyph(JSON.stringify(glyphIcoMoonMap))
    }
    const [inputHeight, setInputHeight] = useState(0)
    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.container}>

                <Card title={st('generateIcoMoonConfigTitle')}>
                    <Row paddingVertical="l" align="center">
                        <ButtonTO
                            onPress={handleGenerate}><InButtonText>{st('generate')}</InButtonText></ButtonTO>
                    </Row>
                    <Row>
                        <Text>{st(`copyTip`)}</Text>
                    </Row>
                    <Row>
                        <Text>{st(`icoMoonConfigPath`)}</Text>
                    </Row>
                    {/*<TextInput style={{height: Math.max(35, inputHeight), overflow: 'hidden'}}*/}
                    {/*           multiline*/}
                    {/*           editable={false}*/}
                    {/*           onContentSizeChange={(event) => {*/}
                    {/*               setInputHeight(event.nativeEvent.contentSize.height)*/}
                    {/*           }}*/}
                    {/*           value={glyph}/>*/}
                    <CopyableText>{glyph}</CopyableText>

                </Card>
            </View>
        </ScrollView>
    )
}
