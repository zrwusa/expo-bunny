import * as React from "react";
import {View, Text} from "../../../components/base-ui";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../lang/short-t";
import getContainerStyles from "../../../containers";
import {useSizer} from "../../../styles/sizer";
import {useTheme} from "../../../styles/theme";
import {Card} from "../../../containers/Card";

function DrawerHomeScreen() {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.DrawerHome');
    const sizer = useSizer();
    const theme = useTheme();
    const containerStyles = getContainerStyles(sizer, theme);
    return (
        <View style={containerStyles.screen}>
            <Card title={st(`title`)}>
            </Card>
        </View>
    );
}

export default DrawerHomeScreen;
