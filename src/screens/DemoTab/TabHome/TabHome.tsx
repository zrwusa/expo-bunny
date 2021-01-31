import * as React from "react";
import {View, Text} from "../../../components/base-ui";
import containerStyle from "../../../containers";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../lang/short-t";

function TabHomeScreen() {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.TabHome');
    return (
        <View style={[containerStyle.screen]}>
            <View style={containerStyle.card}>
                <Text>{st(`title`)}</Text>
            </View>
        </View>
    );
}

export default TabHomeScreen;
