import {Text, View} from "../../components/UI";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";

export interface InputCardProps {
    title: string,
    children: React.ReactNode
}

export function InputCard({title, children}: InputCardProps) {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.Auth');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {ms, designsBasedOn} = sizeLabor;
    const {wp} = designsBasedOn.iphoneX

    const {theme} = useThemeLabor();
    const {colors} = theme
    return <View style={{marginTop: wp(20)}}>
        <Text style={{color: colors.text2, marginBottom: wp(10)}}>{title}</Text>
        {children}
    </View>
}
