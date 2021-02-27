// todo description this provider
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BunnyConstants from "../../constants/constants";
import {sysError} from "../../actions/sys";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {ReactNode} from "react";
import * as localization from "expo-localization";
import {I18nLaborContext} from "./I18nLaborContext";
import i18next from "./i18next";
import {i18n as I18n} from "i18next";
import {Preparing} from "../../components/Preparing";
import {useTranslation} from "react-i18next";
import {stFactory} from "./short-t";

export type I18nProviderProps = {
    children: ReactNode,
    i18n?: I18n,
    defaultNS?: string
};

function I18nLaborProvider(props: I18nProviderProps): JSX.Element {
    const dispatch = useDispatch();
    const [isReady, setIsReady] = useState(false);
    const {t} = useTranslation();
    const st = stFactory(t, `sys`)
    const {children, i18n} = props;
    const i18nValue = i18n || i18next;

    useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                const language = await AsyncStorage.getItem(BunnyConstants.LANGUAGE_TYPE_PERSISTENCE_KEY);
                const lang = language || localization.locale.substring(0, 2);
                lang && await i18nValue.changeLanguage(lang);
            } catch (err) {
                dispatch(sysError(err.toString()));
            }
        }
        bootstrapAsync().then(() => {
            setIsReady(true)
        })
    }, [])

    return (
        isReady
            ? <I18nLaborContext.Provider value={i18next}>
                {children}
            </I18nLaborContext.Provider>
            : <Preparing text={st(`I18nProviderLoading`)}/>
    );
}

export {I18nLaborProvider};
