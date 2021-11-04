import {ELanguage} from '../../constants';
import * as React from 'react';
import {SwitchP} from '../UI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BunnyConstants from '../../constants/constants';
import {useTranslation} from 'react-i18next';

export function LanguageSwitch() {
    const {i18n} = useTranslation();
    const {language} = i18n;
    return <SwitchP
        value={language === ELanguage.en}
        onValueChange={async (value) => {
            const lang = value ? ELanguage.zh : ELanguage.en;
            await i18n.changeLanguage(lang);
            await AsyncStorage.setItem(BunnyConstants.LANGUAGE_TYPE_PERSISTENCE_KEY, lang);
        }}/>;
}
