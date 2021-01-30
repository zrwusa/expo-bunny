import en from "./languages/en.json";
import zhHansCN from "./languages/zh-Hans-CN.json";
import he from "./languages/he.json";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const init = async () => {
    return await i18n
        .use(initReactI18next)
        .init({
            resources: {
                "en": {
                    translation: en
                },
                "zh": {
                    translation: zhHansCN
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
            lng: "en",
            fallbackLng: "en",
            interpolation: {
                escapeValue: false
            }
        });
}

init()
    .then(() => {
    })

export default i18n
