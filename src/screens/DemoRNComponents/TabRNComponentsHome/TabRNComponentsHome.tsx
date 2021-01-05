import React, {useState} from "react";
import {
    ActivityIndicator,
    Button,
    FlatList,
    SafeAreaView,
    Switch,
    View,
    Text,
    ScrollView,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    Modal,
    TouchableHighlight,
    Alert,
    Pressable,
    SectionList,
    StatusBar,
    StatusBarStyle
} from "react-native";
import {
    screenStyles,
    activityIndicatorStyles,
    switchStyles,
    flatListStyles,
    imageStyles,imageBackgroundStyles,keyboardAvoidingViewStyles,
    modalStyles, pressableStyles, safeAreaViewStyles, sectionListStyles, statusBarStyles
} from "./styles";


export const TabRNComponentsHomeScreen: React.FC = () => {
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
    type IFlatListItem = {
        id: string;
        title: string;
    }
    const FLAT_LIST_DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
    ];

    const SECTION_LIST_DATA = [
        {
            title: "Main dishes",
            data: ["Pizza", "Burger", "Risotto"]
        },
        {
            title: "Sides",
            data: ["French Fries", "Onion Rings", "Fried Shrimps"]
        },
        {
            title: "Drinks",
            data: ["Water", "Coke", "Beer"]
        },
        {
            title: "Desserts",
            data: ["Cheese Cake", "Ice Cream"]
        }
    ];

    const imageBackgroundImage = {uri: "https://reactjs.org/logo-og.png"};
    const FlatListItem = ({title}: any) => (
        <View style={flatListStyles.item}>
            <Text style={flatListStyles.title}>{title}</Text>
        </View>
    );

    const SectionListItem = ({title}: any) => (
        <View style={sectionListStyles.item}>
            <Text style={sectionListStyles.title}>{title}</Text>
        </View>
    );
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
    };
    return (
        <ScrollView contentContainerStyle={screenStyles.container}>
            <Text>ScrollView Missing momentum scroll events (#1021).</Text>
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
            {/*<SafeAreaView style={flatListStyles.container}>*/}
            {/*    <FlatList*/}
            {/*        data={FLAT_LIST_DATA}*/}
            {/*        renderItem={({item}: any) => (*/}
            {/*            <FlatListItem title={item.title}/>*/}
            {/*        )}*/}
            {/*        keyExtractor={(item: IFlatListItem) => item.id}*/}
            {/*    />*/}
            {/*</SafeAreaView>*/}
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
                <Text>Missing multiple sources (#515) and HTTP headers (#1019).</Text>
            </View>
            <View style={imageBackgroundStyles.container}>
                <ImageBackground source={imageBackgroundImage} style={imageBackgroundStyles.image}>
                    <Text style={imageBackgroundStyles.text}>Inside</Text>
                </ImageBackground>
            </View>
            {/*<KeyboardAvoidingView*/}
            {/*    behavior={Platform.OS === "ios" ? "padding" : "height"}*/}
            {/*    style={styles.container}*/}
            {/*>*/}
            {/*    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>*/}
            {/*        <View style={keyboardAvoidingViewStyles.inner}>*/}
            {/*            <Text style={keyboardAvoidingViewStyles.header}>Header</Text>*/}
            {/*            <TextInput placeholder="Username" style={keyboardAvoidingViewStyles.textInput} />*/}
            {/*            <View style={keyboardAvoidingViewStyles.btnContainer}>*/}
            {/*                <Button title="Submit" onPress={() => null} />*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*    </TouchableWithoutFeedback>*/}
            {/*    <Text>Mock. No equivalent web APIs.</Text>*/}
            {/*</KeyboardAvoidingView>*/}
            <View style={modalStyles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={modalStyles.centeredView}>
                        <View style={modalStyles.modalView}>
                            <Text style={modalStyles.modalText}>Hello World!</Text>

                            <TouchableHighlight
                                style={{...modalStyles.openButton, backgroundColor: "#2196F3"}}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={modalStyles.textStyle}>Hide Modal</Text>
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
                    <Text style={modalStyles.textStyle}>Show Modal</Text>
                </TouchableHighlight>
            </View>
            <View>
                <Text>Picker ???</Text>
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
            <View>
                <Text>RefreshControl Not started (#1027).</Text>
            </View>
            <SafeAreaView style={safeAreaViewStyles.container}>
                <Text>Safe Area View</Text>
            </SafeAreaView>
            {/*<SafeAreaView style={sectionListStyles.container}>*/}
            {/*    <SectionList*/}
            {/*        sections={SECTION_LIST_DATA}*/}
            {/*        keyExtractor={(item, index) => item + index}*/}
            {/*        renderItem={({ item }) => <SectionListItem title={item} />}*/}
            {/*        renderSectionHeader={({ section: { title } }) => (*/}
            {/*            <Text style={sectionListStyles.header}>{title}</Text>*/}
            {/*        )}*/}
            {/*    />*/}
            {/*</SafeAreaView>*/}
        </ScrollView>);
}

export default  TabRNComponentsHomeScreen;
