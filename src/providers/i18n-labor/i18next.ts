import en from "../../lang/en.json";
import zhHansCN from "../../lang/zh-Hans-CN.json";
import he from "../../lang/he.json";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";

i18n
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
        fallbackLng: ["en", "zh", "zh-Hans-CN", "he"],
        interpolation: {
            escapeValue: false
        }
    }).then();


export default i18n
