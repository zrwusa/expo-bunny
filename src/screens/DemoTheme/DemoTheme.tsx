import React from "react";
import {ScrollView} from "react-native";
import {Button, ButtonTO, InButtonText, LinearGradientButton, Text, View} from "../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {getStyles} from "./styles";
import BunnyConstants from "../../constants/constants";
import {Card, getContainerStyles, Row} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {getSharedStyles} from "../../utils";
// import {LinearGradient} from "expo-linear-gradient";
import Svg, {Defs, Ellipse, RadialGradient, Rect, Stop,} from 'react-native-svg';

const DemoThemeScreen = () => {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.DemoTheme');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);
    const lineProps = {
        strokeOpacity: 1,
        strokeWidth: 1,
        strokeLinecap: "round",
        strokeLinejoin: "round",
    };
    return (
        <ScrollView>
            <View style={[containerStyles.Screen, sharedStyles.centralized]}>
                <Card title="Buttons" style={styles.demoCard}>
                    <Row size="l">
                        <ButtonTO style={sharedStyles.button}>
                            <InButtonText style={sharedStyles.buttonText}>{st(`demoButton`)}</InButtonText>
                        </ButtonTO>
                    </Row>
                    <Row size="l">
                        <ButtonTO style={sharedStyles.button2}>
                            <InButtonText style={sharedStyles.buttonText2}>{st(`demoButtonSec`)}</InButtonText>
                        </ButtonTO>
                    </Row>
                    <Row size="l">
                        <ButtonTO style={sharedStyles.buttonDisabled}>
                            <InButtonText>{st(`demoButtonDisabled`)}</InButtonText></ButtonTO>
                    </Row>
                    <Row size="l">
                        <Button title={st(`btnCustom`)} onPress={BunnyConstants.fnNoop}/>
                    </Row>
                    <Row size="l">
                        <ButtonTO><InButtonText>{st(`btnFromPaper`)}</InButtonText></ButtonTO>
                    </Row>
                    <Row size="l">
                        <LinearGradientButton>
                            <InButtonText>xxx</InButtonText>
                        </LinearGradientButton>
                    </Row>
                    <Row size="l">
                        <View style={{width: 300, height: 150}}>
                            <Svg height={150} width={300}>
                                <Defs>
                                    <RadialGradient
                                        id="grad"
                                        cx="150"
                                        cy="75"
                                        rx="105"
                                        ry="100"
                                        fx="150"
                                        fy="75"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <Stop offset="0" stopColor="#ff0" stopOpacity="1"/>
                                        <Stop offset="1" stopColor="#83a" stopOpacity="1"/>
                                    </RadialGradient>
                                </Defs>
                                <Rect x={0} y={0} rx={5} height={150} width={300} fill="url(#grad)"/>
                            </Svg>
                            <Svg height="150" width="300">
                                <Defs>
                                    <RadialGradient
                                        id="grad"
                                        cx="150"
                                        cy="75"
                                        rx="85"
                                        ry="55"
                                        fx="150"
                                        fy="75"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <Stop offset="0" stopColor="#ff0" stopOpacity="1"/>
                                        <Stop offset="1" stopColor="#83a" stopOpacity="1"/>
                                    </RadialGradient>
                                </Defs>
                                <Ellipse cx="150" cy="75" rx="85" ry="55" fill="url(#grad)"/>
                            </Svg>
                        </View>

                    </Row>
                </Card>
                <Card title="Texts" style={styles.demoCard}>
                    <Row size="l">
                        <Text style={sharedStyles.h1}>H1</Text>
                    </Row>
                    <Row size="l">

                        <Text style={sharedStyles.h2}>h2</Text>
                    </Row>
                    <Row size="l">
                        <Text style={sharedStyles.h3}>h3</Text>
                    </Row>
                    <Row size="l">
                        <Text style={sharedStyles.h4}>h4</Text>
                    </Row>
                    <Row size="l">
                        <Text style={sharedStyles.h5}>h5</Text>
                    </Row>
                    <Row size="l">
                        <Text style={sharedStyles.h6}>h6</Text>
                    </Row>
                    <Row size="l">
                        <Text style={sharedStyles.text}>{st(`demoText`)}</Text>
                    </Row>
                    <Row size="l">
                        <Text style={sharedStyles.text2}>{st(`demoTextSec`)}</Text>
                    </Row>
                    <Row size="l">
                        <Text style={sharedStyles.title}>{st(`demoTitle`)}</Text>
                    </Row>
                    <Row size="l">
                        <Text style={sharedStyles.title2}>{st(`demoTitleSec`)}</Text>
                    </Row>
                    <Row size="l">
                        <Text style={sharedStyles.caption}>{st(`demoCaption`)}</Text>
                    </Row>
                    <Row size="l">
                        <Text style={sharedStyles.caption2}>{st(`demoCaptionSec`)}</Text>
                    </Row>
                    <Row size="l">
                        <Text style={sharedStyles.paragraph}>
                            {st(`demoParagraph`)}{'\n'}
                            1.Don’t repeat yourself (DRY){'\n'}
                            2.Do one thing (DOT) (from Unix philosophy){'\n'}
                            3.Separation of concerns{'\n'}
                            4.The principle of least knowledge (Law of Demeter)
                        </Text>
                    </Row>
                    <Row size="l">
                        <Text style={sharedStyles.paragraph2}>
                            {st(`demoParagraphSec`)}{'\n'}
                            1.Don’t repeat yourself (DRY){'\n'}
                            2.Do one thing (DOT) (from Unix philosophy){'\n'}
                            3.Separation of concerns{'\n'}
                            4.The principle of least knowledge (Law of Demeter)
                        </Text>
                    </Row>
                </Card>

                <Card title="Surfaces" style={styles.demoCard}>
                    <Row size="l">
                        <View style={[styles.demoShadow, sharedStyles.shadow]}>
                            <Text>{st(`demoShadow`)}</Text>
                        </View>
                    </Row>
                    <Row size="l">
                        <View style={[sharedStyles.card, styles.demoSurface]}>
                            <Text style={sharedStyles.h3}>{st(`demoSurface`)}</Text>
                        </View>
                    </Row>
                    <Row size="l">
                        <View style={[sharedStyles.card2, styles.demoSurface]}>
                            <Text style={sharedStyles.h3}>{st(`demoSurfaceSec`)}</Text>
                        </View>
                    </Row>
                </Card>
            </View>
        </ScrollView>
    );
}

export default DemoThemeScreen;
