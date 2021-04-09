import React, {useState} from "react";
import {ButtonTO, TextInput, View, Text} from "../../components/UI";
import {LinearGradientIcon} from "../../components/LinearGradientIcon";
import {useThemeLabor} from "../../providers/theme-labor";
import {
    checkColor,
    deltaEDes,
    diffColorsByRGBA, stringToHex,
    stringToRGB
} from "../../utils/color";
import {PaletteKeys, ThemeColorKeys, ThemeName} from "../../types";
import {NativeSyntheticEvent, ScrollView, TextInputKeyPressEventData} from "react-native";
import {createStyles} from "./styles";
import {useSizeLabor} from "../../providers/size-labor";
import {palette} from "../../utils";
import {Card} from "../../containers";
import {collectBLResult} from "../../store/actions";
import {blError} from "../../helpers";
import {useDispatch} from "react-redux";


export function PlaygroundScreen() {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = createStyles(sizeLabor, themeLabor)

    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
                <LinearGradientIcon name="leaf" colors={['#fff', '#0f0']} size={40}/>
            </View>

        </ScrollView>
    )
}
