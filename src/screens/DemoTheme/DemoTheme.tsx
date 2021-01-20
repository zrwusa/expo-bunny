import React from "react";
import {ScrollView} from "react-native";
import {DemoTextThemedRN, DemoTOButtonThemedRN} from "../../components/base-ui";
import {Button as ButtonP, Text as TextP} from "react-native-paper";
import {useTranslation} from "react-i18next";

const DemoThemeScreen = () => {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.DemoTheme';
    return (
        <ScrollView>
            <DemoTOButtonThemedRN><DemoTextThemedRN>{t(`${i18nPrefix}.buttons.btnCustom`)}</DemoTextThemedRN></DemoTOButtonThemedRN>
            <ButtonP><TextP>{t(`${i18nPrefix}.buttons.btnFromPaper`)}</TextP></ButtonP>
        </ScrollView>
    );
}

export default DemoThemeScreen;
