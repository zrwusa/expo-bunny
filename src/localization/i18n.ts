import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from "./en.json";
import zhHansCN from "./zh-Hans-CN.json";
import he from "./he.json"
// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
    "en": en,
    "zh": zhHansCN,
    "zh-Hans": zhHansCN,
    "zh-Hans-CN": zhHansCN,
    "he": he
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;
export default i18n
