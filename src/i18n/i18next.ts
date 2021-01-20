import en from "./en.json";
import zh from "./zh.json";
import zhHansCN from "./zh-Hans-CN.json";
import he from "./he.json";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import * as Localization from "expo-localization";

const init = async () => {
    return await i18n
        .use(initReactI18next)
        .init({
            resources: {
                "en": {
                    translation: en
                },
                "zh": {
                    translation: zh
                },
                "zh-Hans": {
                    translation: zhHansCN
                },
                "zh-Hans-CN": {
                    translation: zhHansCN
                },
                "he": {
                    translation: he
                }
            },
            lng: Localization.locale,
            fallbackLng: "en",
            interpolation: {
                escapeValue: false
            }
        });
}

init()
    .then(() => {
        console.log('Initialed i18n')
    })

export default i18n
