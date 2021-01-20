import * as React from "react";
import {View, Text} from "../../../components/base-ui";
import containerStyle from "../../../containers/box";
import {useTranslation} from "react-i18next";

export function TabHomeScreen() {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.TabHome';
    return (<View>
        <View style={containerStyle.box}>
            <Text>{t(`${i18nPrefix}.title`)}</Text>
        </View>
    </View>);
}

export default TabHomeScreen;
