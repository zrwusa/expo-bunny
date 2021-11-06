import React from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View,} from 'react-native';
import {Button, Text, TextInput} from '../../../components/UI';
import {makeStyles} from './styles';
import {makeContainerStyles} from '../../../containers';
import {useBunnyKit} from '../../../hooks/bunny-kit';

function RNKeyboardAvoidingScreen() {
    const {sizeLabor, themeLabor} = useBunnyKit();
    const containerStyles = makeContainerStyles(sizeLabor, themeLabor);
    const styles = makeStyles(sizeLabor, themeLabor);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={containerStyles.Screen}
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
