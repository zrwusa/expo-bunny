import * as React from "react";
import {Text, View} from "../../../components/UI";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {getContainerStyles} from "../../../containers";
import {getSharedStyles} from "../../../helpers/shared-styles";
import {useBunnyKit} from "../../../hooks/bunny-kit";

function TabHomeScreen() {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.TabHome');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    return (
        <View style={[containerStyles.Screen, sharedStyles.centralized]}>
            <Text>{st(`title`)}</Text>
        </View>
    );
}

export default TabHomeScreen;
