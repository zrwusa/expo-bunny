import * as React from "react";
import {View} from "../../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../../providers/i18n-labor";
import {Card, getContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";

function DrawerHomeScreen() {
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.DrawerHome');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    return (
        <View style={containerStyles.Screen}>
            <Card title={st(`title`)}>
            </Card>
        </View>
    );
}

export default DrawerHomeScreen;
