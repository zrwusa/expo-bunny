import React from "react";
import {
    View, KeyboardAvoidingView,
    Platform, TouchableWithoutFeedback, Keyboard,
} from "react-native";
import {Text, Button, TextInput} from "../../../components/UI";
import {getStyles} from "./styles";
import getContainerStyles from "../../../containers";
import {useSizeLabor} from "../../../providers/sizeLabor";
import {useThemeLabor} from "../../../providers/themeLabor";

const RNKeyboardAvoidingScreen: React.FC = () => {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor)

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={containerStyles.screen}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.header}>Header</Text>
                    <TextInput placeholder="Username" style={styles.textInput}/>
                    <View style={styles.btnContainer}>
                        <Button title="Submit" onPress={() => null}/>
                    </View>
                    <Text>Mock. No equivalent web APIs.</Text>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default RNKeyboardAvoidingScreen;
