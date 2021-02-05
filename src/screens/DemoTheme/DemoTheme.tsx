import React from "react";
import {ScrollView} from "react-native";
import {Button, ButtonTO, Text, TextBtn, View} from "../../components/base-ui";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../lang/short-t";
import {getStyles} from "./styles";
import BunnyConstants from "../../utils/constants";
import getContainerStyles from "../../containers";

const DemoThemeScreen = () => {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.DemoTheme');
    const styles = getStyles();
    const containerStyles = getContainerStyles()

    return (
        <ScrollView contentContainerStyle={[containerStyles.centralized, {height: '100%'}]}>
            <Button title={st(`btnCustom`)} onPress={BunnyConstants.fnNoop}/>
            <ButtonTO><TextBtn>{st(`btnFromPaper`)}</TextBtn></ButtonTO>
            <View style={styles.demoShadow}>
                <Text>{st(`demoShadow`)}</Text>
            </View>
        </ScrollView>
    );
}

export default DemoThemeScreen;
