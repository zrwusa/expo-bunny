import React from "react";
import {
    View, KeyboardAvoidingView,
    Platform, TouchableWithoutFeedback, Keyboard,
} from "react-native";
import {Text, Button, TextInput} from "../../../components/base-ui";
import {keyboardAvoidingViewStyles} from "./styles";
import containerStyle from "../../../containers";

const RNKeyboardAvoidingScreen: React.FC = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={containerStyle.screen}
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
