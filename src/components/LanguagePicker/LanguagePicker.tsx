import * as React from 'react';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BunnyConstants from '../../constants/constants';
import {PickerSelect} from '../UI';

export function LanguagePicker() {
    const {i18n} = useTranslation();
    const languageLabels = i18n.languages.map(language => {
        return {label: language, value: language};
    });
    return <PickerSelect
        value={i18n.language}
        placeholder={{label: 'Select ', value: ''}}
        onValueChange={async (itemValue) => {
            if (itemValue) {
                await i18n.changeLanguage(itemValue);
                await AsyncStorage.setItem(BunnyConstants.LANGUAGE_TYPE_PERSISTENCE_KEY, itemValue);
            }
        }}
        items={languageLabels}
    />;
}

