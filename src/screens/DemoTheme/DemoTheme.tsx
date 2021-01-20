import React from "react";
import {ScrollView} from "react-native";
import {DemoTextThemedRN, DemoTOButtonThemedRN} from "../../components/base-ui";
import {Button as ButtonP, Text as TextP} from "react-native-paper";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../i18n/short-t";

const DemoThemeScreen = () => {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.DemoTheme';
    const st = stFactory(t, i18nPrefix);
    return (
        <ScrollView>
            <DemoTOButtonThemedRN><DemoTextThemedRN>{st(`btnCustom`)}</DemoTextThemedRN></DemoTOButtonThemedRN>
            <ButtonP><TextP>{st(`btnFromPaper`)}</TextP></ButtonP>
        </ScrollView>
    );
}

export default DemoThemeScreen;
