import React from "react";
import {ScrollView} from "react-native";
import {Button, Text, View} from "../../components/base-ui";
import {Button as ButtonP, Text as TextP} from "react-native-paper";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../lang/short-t";
import styles from "./styles";
import containerStyle from "../../containers";
import BunnyConstants from "../../utils/constants";

const DemoThemeScreen = () => {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.DemoTheme');

    return (
        <ScrollView contentContainerStyle={[containerStyle.centralized, {height: '100%'}]}>
            <Button title={st(`btnCustom`)} onPress={BunnyConstants.fnNoop}/>
            <ButtonP><TextP>{st(`btnFromPaper`)}</TextP></ButtonP>
            <View style={styles.demoShadow}>
                <Text>{st(`demoShadow`)}</Text>
            </View>
        </ScrollView>
    );
}

export default DemoThemeScreen;
