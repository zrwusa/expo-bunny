import * as React from "react";
import {View} from "../../../components/UI";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../providers/i18nLabor";
import getContainerStyles from "../../../containers";
import {useSizeLabor} from "../../../providers/sizeLabor";
import {useThemeLabor} from "../../../providers/themeLabor";
import {Card} from "../../../containers/Card";

function DrawerHomeScreen() {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.DrawerHome');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    return (
        <View style={containerStyles.screen}>
            <Card title={st(`title`)}>
            </Card>
        </View>
    );
}

export default DrawerHomeScreen;
