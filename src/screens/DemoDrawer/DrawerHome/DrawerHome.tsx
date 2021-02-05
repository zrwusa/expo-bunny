import * as React from "react";
import {View, Text} from "../../../components/base-ui";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../lang/short-t";
import getContainerStyles from "../../../containers";

function DrawerHomeScreen() {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.DrawerHome');
    const containerStyles = getContainerStyles()
    return (
        <View style={containerStyles.screen}>
            <View style={containerStyles.card}>
                <Text>{st(`title`)}</Text>
            </View>
        </View>
    );
}

export default DrawerHomeScreen;
