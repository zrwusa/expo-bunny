import React, {useState} from "react";
import {
    ActivityIndicator,
    Button,
    Switch,
    View,
    Text,
    ScrollView,
    Image,
    ImageBackground,
    Modal,
    TouchableHighlight,
    Alert,
    Pressable,
    StatusBar,
    StatusBarStyle,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import {
    screenStyles,
    activityIndicatorStyles,
    switchStyles,
    imageStyles,
    imageBackgroundStyles,
    modalStyles,
    pressableStyles,
    statusBarStyles,
    touchableHighlightStyles,
    touchableOpacityStyles,
    touchableWithoutFeedbackStyles,
} from "./styles";

const RNHome: React.FC = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [modalVisible, setModalVisible] = useState(false);
    const [timesPressed, setTimesPressed] = useState(0);
    let textLog = '';
    if (timesPressed > 1) {
        textLog = timesPressed + 'x onPress';
    } else if (timesPressed > 0) {
        textLog = 'onPress';
    }

    const imageBackgroundImage = {uri: "https://reactjs.org/logo-og.png"};

    const styleTypes: Array<StatusBarStyle> = ['default', 'dark-content', 'light-content'];
    const [visibleStatusBar, setVisibleStatusBar] = useState(false);
    const [styleStatusBar, setStyleStatusBar] = useState(styleTypes[0]);

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

    const [textInputValue, onChangeText] = React.useState('Useless Placeholder');
    const [touchableHighlightCount, setTouchableHighlightCount] = useState(0);
    const onTouchableHighlightPress = () => setTouchableHighlightCount(touchableHighlightCount + 1);

    const [touchableOpacityCount, setTouchableOpacityCount] = useState(0);
    const onTouchableOpacityPress = () => setTouchableOpacityCount(prevCount => prevCount + 1);

    const [touchableWithoutFeedbackCount, setTouchableWithoutFeedbackCount] = useState(0);

    const onTouchableWithoutFeedbackPress = () => {
        setTouchableWithoutFeedbackCount(touchableWithoutFeedbackCount + 1);
    };
    return (
        <ScrollView contentContainerStyle={screenStyles.container}>

            <View style={statusBarStyles.container}>
                <View>
                    <Text style={statusBarStyles.textStyle}>StatusBar Style: {styleStatusBar}</Text>
                    <Text style={statusBarStyles.textStyle}>StatusBar Visibility: {!visibleStatusBar ? 'Visible' : 'Hidden'}</Text>
                </View>
                <StatusBar backgroundColor="blue" barStyle={styleStatusBar}/>
                <View>
                    <StatusBar hidden={visibleStatusBar}/>
                </View>
                <View style={statusBarStyles.buttonContainer}>
                    <Button title="Toggle StatusBar" onPress={() => changeVisibilityStatusBar()}/>
                </View>
                <View style={statusBarStyles.buttonContainer}>
                    <Button title="Change StatusBar Style" onPress={() => changeStyleStatusBar()}/>
                </View>
            </View>
            <View style={[activityIndicatorStyles.container, activityIndicatorStyles.horizontal]}>
                <ActivityIndicator/>
                <ActivityIndicator size="large"/>
                <ActivityIndicator size="small" color="#0000ff"/>
                <ActivityIndicator size="large" color="#00ff00"/>
            </View>
            <View>
                <Button
                    onPress={() => null}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
            <View style={switchStyles.container}>
                <Switch
                    trackColor={{false: "#767577", true: "#81b0ff"}}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View style={imageStyles.container}>
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
            <View style={imageBackgroundStyles.container}>
                <ImageBackground source={imageBackgroundImage} style={imageBackgroundStyles.image}>
                    <Text style={imageBackgroundStyles.text}>Inside</Text>
                </ImageBackground>
            </View>


            <View style={pressableStyles.container}>
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
                            {pressed ? 'Pressed!' : 'Press Me'}
                        </Text>
                    )}
                </Pressable>
                <View style={pressableStyles.logBox}>
                    <Text testID="pressable_press_console">{textLog}</Text>
                </View>
            </View>

            {/*<View style={modalStyles.centeredView}>*/}
            {/*    <Modal*/}
            {/*        animationType="slide"*/}
            {/*        transparent={true}*/}
            {/*        visible={modalVisible}*/}
            {/*        onRequestClose={() => {*/}
            {/*            Alert.alert("Modal has been closed.");*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <View style={modalStyles.centeredView}>*/}
            {/*            <View style={modalStyles.modalView}>*/}
            {/*                <Text style={modalStyles.modalText}>Hello World!</Text>*/}

            {/*                <TouchableHighlight*/}
            {/*                    style={{...modalStyles.openButton, backgroundColor: "#2196F3"}}*/}
            {/*                    onPress={() => {*/}
            {/*                        setModalVisible(!modalVisible);*/}
            {/*                    }}*/}
            {/*                >*/}
            {/*                    <Text style={modalStyles.textStyle}>Hide Modal</Text>*/}
            {/*                </TouchableHighlight>*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*    </Modal>*/}

            {/*    <TouchableHighlight*/}
            {/*        style={modalStyles.openButton}*/}
            {/*        onPress={() => {*/}
            {/*            setModalVisible(true);*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <Text style={modalStyles.textStyle}>Show Modal</Text>*/}
            {/*    </TouchableHighlight>*/}
            {/*</View>*/}

            <View>
                <Text>Picker ???</Text>
            </View>
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeText(text)}
                    value={textInputValue}
                />
            </View>
            <View style={touchableHighlightStyles.container}>
                <TouchableHighlight onPress={onTouchableHighlightPress}>
                    <View style={touchableHighlightStyles.button}>
                        <Text>Touch Here</Text>
                    </View>
                </TouchableHighlight>
                <View style={touchableHighlightStyles.countContainer}>
                    <Text style={touchableHighlightStyles.countText}>
                        {touchableHighlightCount ? touchableHighlightCount : null}
                    </Text>
                </View>

            </View>
            <View style={touchableOpacityStyles.container}>
                <View style={touchableOpacityStyles.countContainer}>
                    <Text>Count: {touchableOpacityCount}</Text>
                </View>
                <TouchableOpacity
                    style={touchableOpacityStyles.button}
                    onPress={onTouchableOpacityPress}
                >
                    <Text>Press Here</Text>
                </TouchableOpacity>
            </View>
            <View style={touchableWithoutFeedbackStyles.container}>
                <View style={touchableWithoutFeedbackStyles.countContainer}>
                    <Text style={touchableWithoutFeedbackStyles.countText}>Count: {touchableWithoutFeedbackCount}</Text>
                </View>
                <TouchableWithoutFeedback onPress={onTouchableWithoutFeedbackPress}>
                    <View style={touchableWithoutFeedbackStyles.button}>
                        <Text>Touch Here</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </ScrollView>);
}

export default RNHome;