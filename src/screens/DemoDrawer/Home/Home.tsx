import * as React from "react";
import {View} from "../../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {Card, createContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";

function DrawerHomeScreen() {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.DrawerHome');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = createContainerStyles(sizeLabor, themeLabor);
    return (
        <View style={containerStyles.Screen}>
            <Card title={st(`title`)}>
            </Card>
        </View>
    );
}

export default DrawerHomeScreen;
