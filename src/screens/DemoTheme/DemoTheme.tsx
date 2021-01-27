import React from "react";
import {ScrollView} from "react-native";
import {DemoTextRNThemed, DemoButtonTORNThemed, Text, View} from "../../components/base-ui";
import {Button as ButtonP, Text as TextP} from "react-native-paper";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../i18n/short-t";
import styles from "./styles";
import containerStyle from "../../containers";

const DemoThemeScreen = () => {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.DemoTheme';
    const st = stFactory(t, i18nPrefix);

    return (
        <ScrollView contentContainerStyle={[containerStyle.centralized, {height: '100%'}]}>
            <DemoButtonTORNThemed>
                <DemoTextRNThemed>{st(`btnCustom`)}</DemoTextRNThemed>
            </DemoButtonTORNThemed>
            <ButtonP><TextP>{st(`btnFromPaper`)}</TextP></ButtonP>
            <View style={styles.demoShadow}>
                <Text>{st(`demoShadow`)}</Text>
            </View>
        </ScrollView>
    );
}

export default DemoThemeScreen;
