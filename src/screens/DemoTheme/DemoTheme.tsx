import React from "react";
import {ScrollView} from "react-native";
import {Button, ButtonRNE, ButtonTO, Text, TextBtn, View} from "../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../providers/i18n-labor";
import {createStyles} from "./styles";
import BunnyConstants from "../../constants/constants";
import {getContainerStyles} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {Card} from "../../containers";
import {createSmartStyles} from "../../utils";

const DemoThemeScreen = () => {
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.DemoTheme');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const smartStyle = createSmartStyles(sizeLabor, themeLabor);
    const styles = createStyles(sizeLabor, themeLabor);

    return (
        <ScrollView>
            <View style={[containerStyles.screen, containerStyles.centralized]}>
                <Card>
                    <ButtonTO style={smartStyle.btn}>
                        <TextBtn>{st(`demoButton`)}</TextBtn></ButtonTO>
                    <ButtonTO style={smartStyle.btnSecondary}>
                        <TextBtn>{st(`demoButtonSec`)}</TextBtn></ButtonTO>
                    <Text style={smartStyle.text}>{st(`demoText`)}</Text>
                    <Text style={smartStyle.textSecondary}>{st(`demoTextSec`)}</Text>
                    <ButtonTO style={smartStyle.btnDisabled}>
                        <TextBtn>{st(`demoButtonDisabled`)}</TextBtn></ButtonTO>
                    <Button title={st(`btnCustom`)} onPress={BunnyConstants.fnNoop}/>
                    <ButtonTO><TextBtn>{st(`btnFromPaper`)}</TextBtn></ButtonTO>
                    <ButtonRNE title={st(`demoButtonThemedRNE`)}/>
                    <View style={[styles.demoShadow, smartStyle.shadow]}>
                        <Text>{st(`demoShadow`)}</Text>
                    </View>
                    <Text style={smartStyle.h1}>H1</Text>
                    <Text style={smartStyle.h2}>h2</Text>
                    <Text style={smartStyle.h3}>h3</Text>
                    <Text style={smartStyle.h4}>h4</Text>
                    <Text style={smartStyle.h5}>h5</Text>
                    <Text style={smartStyle.h6}>h6</Text>
                    <Text style={smartStyle.title}>{st(`demoTitle`)}</Text>
                    <Text style={smartStyle.titleSecondary}>{st(`demoTitleSec`)}</Text>
                    <Text style={smartStyle.caption}>{st(`demoCaption`)}</Text>
                    <Text style={smartStyle.captionSecondary}>{st(`demoCaptionSec`)}</Text>
                    <View style={smartStyle.box}>
                        <Text style={smartStyle.h3}>{st(`demoParagraph`)}</Text>
                        <Text style={smartStyle.paragraph}>
                            1.Don’t repeat yourself (DRY){'\n'}
                            2.Do one thing (DOT) (from Unix philosophy){'\n'}
                            3.Separation of concerns{'\n'}
                            4.The principle of least knowledge (Law of Demeter)
                        </Text>
                    </View>
                    <View style={smartStyle.box}>
                        <Text style={smartStyle.h3}>{st(`demoParagraphSec`)}</Text>
                        <Text style={smartStyle.paragraphSecondary}>
                            1.Don’t repeat yourself (DRY){'\n'}
                            2.Do one thing (DOT) (from Unix philosophy){'\n'}
                            3.Separation of concerns{'\n'}
                            4.The principle of least knowledge (Law of Demeter)
                        </Text>
                    </View>
                    <View style={[smartStyle.surface, styles.demoSurface]}>
                        <Text style={smartStyle.h3}>{st(`demoSurface`)}</Text>
                    </View>
                    <View style={[smartStyle.surfaceSecondary, styles.demoSurface]}>
                        <Text style={smartStyle.h3}>{st(`demoSurfaceSec`)}</Text>
                    </View>
                </Card>
            </View>
        </ScrollView>
    );
}

export default DemoThemeScreen;
