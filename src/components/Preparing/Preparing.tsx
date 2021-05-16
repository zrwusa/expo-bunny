import React from "react";
import {getStyles} from "./styles";
import {ActivityIndicator, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../providers/i18n-labor";

export interface PreparingProps {
    text?: string
}

export const Preparing = (props: PreparingProps) => {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'sys')
    const {text = st('loadingData')} = props;

    const styles = getStyles();
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
            {text
                ? <Text style={styles.text}>
                    {text}
                </Text>
                : null
            }
        </View>
    )
}
