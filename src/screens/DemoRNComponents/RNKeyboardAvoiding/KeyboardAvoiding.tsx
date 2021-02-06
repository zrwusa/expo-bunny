import React from "react";
import {
    View, KeyboardAvoidingView,
    Platform, TouchableWithoutFeedback, Keyboard,
} from "react-native";
import {Text, Button, TextInput} from "../../../components/base-ui";
import {keyboardAvoidingViewStyles} from "./styles";
import getContainerStyles from "../../../containers";
import {useSmartStyle} from "../../../styles/smart-style";

const RNKeyboardAvoidingScreen: React.FC = () => {
    const smartStyle = useSmartStyle();
    const containerStyles = getContainerStyles(smartStyle);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={containerStyles.screen}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={keyboardAvoidingViewStyles.inner}>
                    <Text style={keyboardAvoidingViewStyles.header}>Header</Text>
                    <TextInput placeholder="Username" style={keyboardAvoidingViewStyles.textInput}/>
                    <View style={keyboardAvoidingViewStyles.btnContainer}>
                        <Button title="Submit" onPress={() => null}/>
                    </View>
                    <Text>Mock. No equivalent web APIs.</Text>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default RNKeyboardAvoidingScreen;
