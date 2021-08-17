import {useEffect, useState} from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';

export interface UseKeyboardHeight {
    currentHeight: number
}

export const useKeyboardHeight = (): UseKeyboardHeight => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    function onKeyboardDidShow(e: KeyboardEvent): void {
        setKeyboardHeight(e.endCoordinates.height);
    }

    function onKeyboardDidHide(): void {
        setKeyboardHeight(0);
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
        return (): void => {
            Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
        };
    }, []);

    return {currentHeight: keyboardHeight};
};
