import React from "react";
import {
    Button, View, Text, KeyboardAvoidingView,
    Platform, TouchableWithoutFeedback, Keyboard, TextInput
} from "react-native";
import {keyboardAvoidingViewStyles} from "./styles";

export const KeyboardAvoidingScreen: React.FC = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={keyboardAvoidingViewStyles.container}
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

export default KeyboardAvoidingScreen;
