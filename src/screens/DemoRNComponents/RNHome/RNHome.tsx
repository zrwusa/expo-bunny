import React, {useState} from "react";
import {
    ActivityIndicator, Switch, View, ScrollView,
    Image, ImageBackground, TouchableHighlight, Alert,
    StatusBar, StatusBarStyle, TouchableWithoutFeedback,
    Modal
} from "react-native";
import {Button, Text, TextInput, TouchableOpacity, Pressable} from "../../../components/base-ui";
import {
    imageStyles, imageBackgroundStyles, modalStyles, pressableStyles, statusBarStyles,
    touchableHighlightStyles, touchableOpacityStyles, touchableWithoutFeedbackStyles
} from "./styles";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../lang/short-t";
import getContainerStyles from "../../../containers";
import {useSmartStyle} from "../../../styles/smart-style";

const RNHome: React.FC = () => {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.RNHome');
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [modalVisible, setModalVisible] = useState(false);
    const [timesPressed, setTimesPressed] = useState(0);
    let textLog = '';
    if (timesPressed > 1) {
        textLog = timesPressed + st(`xOnPress`);
    } else if (timesPressed > 0) {
        textLog = st(`onPress`);
    }

    const imageBackgroundImage = {uri: "https://reactjs.org/logo-og.png"};
    const styleTypes: Array<StatusBarStyle> = ['default', 'dark-content', 'light-content'];
    const [visibleStatusBar, setVisibleStatusBar] = useState(false);
    const [styleStatusBar, setStyleStatusBar] = useState(styleTypes[0]);
    const smartStyle = useSmartStyle();
    const containerStyles = getContainerStyles(smartStyle);


    const changeVisibilityStatusBar = () => {
        setVisibleStatusBar(!visibleStatusBar);
    };

    const changeStyleStatusBar = () => {
        const styleId = styleTypes.indexOf(styleStatusBar) + 1;
        if (styleId === styleTypes.length) {
            return setStyleStatusBar(styleTypes[0]);
        }
        return setStyleStatusBar(styleTypes[styleId]);
    }
    const uselessPlaceholder = st(`uselessPlaceholder`)
    const [textInputValue, onChangeText] = React.useState(uselessPlaceholder);
    const [touchableHighlightCount, setTouchableHighlightCount] = useState(0);
    const onTouchableHighlightPress = () => setTouchableHighlightCount(touchableHighlightCount + 1);

    const [touchableOpacityCount, setTouchableOpacityCount] = useState(0);
    const onTouchableOpacityPress = () => setTouchableOpacityCount(prevCount => prevCount + 1);

    const [touchableWithoutFeedbackCount, setTouchableWithoutFeedbackCount] = useState(0);

    const onTouchableWithoutFeedbackPress = () => {
        setTouchableWithoutFeedbackCount(touchableWithoutFeedbackCount + 1);
    };
    return (
        <ScrollView>
            <View style={containerStyles.screen}>
                <View style={containerStyles.card}>
                    <ActivityIndicator/>
                    <ActivityIndicator size="large"/>
                    <ActivityIndicator size="small" color="#0000ff"/>
                    <ActivityIndicator size="large" color="#00ff00"/>
                </View>
                <View style={containerStyles.card}>
                    <Button
                        onPress={() => null}
                        title={st(`btnAccessibility`)}
                        color="#841584"
                        accessibilityLabel={st(`lbAccessibility`)}
                    />
                </View>
                <View style={containerStyles.card}>
                    <Switch
                        trackColor={{false: "#767577", true: "#81b0ff"}}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={containerStyles.card}>
                    <Image
                        style={imageStyles.tinyLogo}
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                    <Image
                        style={imageStyles.logo}
                        source={{
                            uri:
                                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                        }}
                    />
                </View>
                <View style={containerStyles.card}>
                    <ImageBackground source={imageBackgroundImage} style={imageBackgroundStyles.image}>
                        <Text style={imageBackgroundStyles.text}>Inside</Text>
                    </ImageBackground>
                </View>


                <View style={containerStyles.card}>
                    <Pressable
                        onPress={() => {
                            setTimesPressed((current) => current + 1);
                        }}
                        style={({pressed}) => [
                            {
                                backgroundColor: pressed
                                    ? 'rgb(210, 230, 255)'
                                    : 'white'
                            },
                            pressableStyles.wrapperCustom
                        ]}>
                        {({pressed}) => (
                            <Text style={pressableStyles.text}>
                                {pressed ? st(`pressed`) : st(`pressMe`)}
                            </Text>
                        )}
                    </Pressable>
                    <View style={pressableStyles.logBox}>
                        <Text testID="pressable_press_console">{textLog}</Text>
                    </View>
                </View>

                <View style={modalStyles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert(st(`modalClosed`));
                        }}
                    >
                        <View style={modalStyles.centeredView}>
                            <View style={modalStyles.modalView}>
                                <Text style={modalStyles.modalText}>{st(`helloWorld`)}</Text>

                                <TouchableHighlight
                                    style={{...modalStyles.openButton, backgroundColor: "#2196F3"}}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                    }}
                                >
                                    <Text style={modalStyles.textStyle}>{st(`hideModal`)}</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>

                    <TouchableHighlight
                        style={modalStyles.openButton}
                        onPress={() => {
                            setModalVisible(true);
                        }}
                    >
                        <Text style={modalStyles.textStyle}>{st(`showModal`)}</Text>
                    </TouchableHighlight>
                </View>

                <View style={containerStyles.card}>
                    <Text>Picker ???</Text>
                </View>
                <View style={containerStyles.card}>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={text => onChangeText(text)}
                        value={textInputValue}
                    />
                </View>
                <View style={containerStyles.card}>
                    <TouchableHighlight onPress={onTouchableHighlightPress}>
                        <View style={touchableHighlightStyles.button}>
                            <Text>{st(`touchHere`)}</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={touchableHighlightStyles.countContainer}>
                        <Text style={touchableHighlightStyles.countText}>
                            {touchableHighlightCount ? touchableHighlightCount : null}
                        </Text>
                    </View>

                </View>
                <View style={containerStyles.card}>
                    <View style={touchableOpacityStyles.countContainer}>
                        <Text>{st(`count`)}{touchableOpacityCount}</Text>
                    </View>
                    <TouchableOpacity
                        style={touchableOpacityStyles.button}
                        onPress={onTouchableOpacityPress}
                    >
                        <Text>{st(`pressHere`)}</Text>
                    </TouchableOpacity>
                </View>
                <View style={containerStyles.card}>
                    <View style={touchableWithoutFeedbackStyles.countContainer}>
                        <Text style={touchableWithoutFeedbackStyles.countText}>Count: {touchableWithoutFeedbackCount}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={onTouchableWithoutFeedbackPress}>
                        <View style={touchableWithoutFeedbackStyles.button}>
                            <Text>{st(`touchHere`)}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={containerStyles.card}>
                    <View>
                        <Text style={statusBarStyles.textStyle}>StatusBar Style: {styleStatusBar}</Text>
                        <Text style={statusBarStyles.textStyle}>StatusBar Visibility: {!visibleStatusBar ? 'Visible' : 'Hidden'}</Text>
                    </View>
                    <StatusBar backgroundColor="blue" barStyle={styleStatusBar}/>
                    <View>
                        <StatusBar hidden={visibleStatusBar}/>
                    </View>
                    <View style={statusBarStyles.buttonContainer}>
                        <Button title={st(`toggleStatusBar`)} onPress={() => changeVisibilityStatusBar()}/>
                    </View>
                    <View style={statusBarStyles.buttonContainer}>
                        <Button title={st(`changeStatusBarStyle`)} onPress={() => changeStyleStatusBar()}/>
                    </View>
                </View>
            </View>
        </ScrollView>);
}

export default RNHome;
