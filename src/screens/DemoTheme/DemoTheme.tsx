import React from "react";
import {ScrollView} from "react-native";
import {Button, ButtonTO, Text, TextBtn, View} from "../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../providers/i18n-labor";
import {createStyles} from "./styles";
import BunnyConstants from "../../constants/constants";
import {Card, createContainerStyles} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {createSmartStyles} from "../../utils";

const DemoThemeScreen = () => {
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.DemoTheme');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = createContainerStyles(sizeLabor, themeLabor);
    const {smartStyles} = createSmartStyles(sizeLabor, themeLabor);

    const styles = createStyles(sizeLabor, themeLabor);

    return (
        <ScrollView>
            <View style={[containerStyles.Screen, smartStyles.centralized]}>
                <Card>
                    <ButtonTO style={smartStyles.btn}>
                        <TextBtn>{st(`demoButton`)}</TextBtn></ButtonTO>
                    <ButtonTO style={smartStyles.btnSecondary}>
                        <TextBtn>{st(`demoButtonSec`)}</TextBtn></ButtonTO>
                    <Text style={smartStyles.text}>{st(`demoText`)}</Text>
                    <Text style={smartStyles.textSecondary}>{st(`demoTextSec`)}</Text>
                    <ButtonTO style={smartStyles.btnDisabled}>
                        <TextBtn>{st(`demoButtonDisabled`)}</TextBtn></ButtonTO>
                    <Button title={st(`btnCustom`)} onPress={BunnyConstants.fnNoop}/>
                    <ButtonTO><TextBtn>{st(`btnFromPaper`)}</TextBtn></ButtonTO>
                    <View style={[styles.demoShadow, smartStyles.shadow]}>
                        <Text>{st(`demoShadow`)}</Text>
                    </View>
                    <Text style={smartStyles.h1}>H1</Text>
                    <Text style={smartStyles.h2}>h2</Text>
                    <Text style={smartStyles.h3}>h3</Text>
                    <Text style={smartStyles.h4}>h4</Text>
                    <Text style={smartStyles.h5}>h5</Text>
                    <Text style={smartStyles.h6}>h6</Text>
                    <Text style={smartStyles.title}>{st(`demoTitle`)}</Text>
                    <Text style={smartStyles.titleSecondary}>{st(`demoTitleSec`)}</Text>
                    <Text style={smartStyles.caption}>{st(`demoCaption`)}</Text>
                    <Text style={smartStyles.captionSecondary}>{st(`demoCaptionSec`)}</Text>
                    <View style={smartStyles.box}>
                        <Text style={smartStyles.h3}>{st(`demoParagraph`)}</Text>
                        <Text style={smartStyles.paragraph}>
                            1.Don’t repeat yourself (DRY){'\n'}
                            2.Do one thing (DOT) (from Unix philosophy){'\n'}
                            3.Separation of concerns{'\n'}
                            4.The principle of least knowledge (Law of Demeter)
                        </Text>
                    </View>
                    <View style={smartStyles.box}>
                        <Text style={smartStyles.h3}>{st(`demoParagraphSec`)}</Text>
                        <Text style={smartStyles.paragraphSecondary}>
                            1.Don’t repeat yourself (DRY){'\n'}
                            2.Do one thing (DOT) (from Unix philosophy){'\n'}
                            3.Separation of concerns{'\n'}
                            4.The principle of least knowledge (Law of Demeter)
                        </Text>
                    </View>
                    <View style={[smartStyles.surface, styles.demoSurface]}>
                        <Text style={smartStyles.h3}>{st(`demoSurface`)}</Text>
                    </View>
                    <View style={[smartStyles.surfaceSecondary, styles.demoSurface]}>
                        <Text style={smartStyles.h3}>{st(`demoSurfaceSec`)}</Text>
                    </View>
                </Card>
            </View>
        </ScrollView>
    );
}

export default DemoThemeScreen;
