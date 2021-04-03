import * as React from "react";
import {View, Button, Text} from "../../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../../providers/i18n-labor";
import {Card, createContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {createStyles} from "./styles";
import {ShowVideo} from "../../../components/Video/Video";

export function IGHomeScreen() {
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.IGHome');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = createContainerStyles(sizeLabor, themeLabor);
    const styles = createStyles(sizeLabor, themeLabor)
    return (
        <View style={[containerStyles.Screen]}>
            <ShowVideo
                source={{
                    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                }}
            />
        </View>
    );
}
