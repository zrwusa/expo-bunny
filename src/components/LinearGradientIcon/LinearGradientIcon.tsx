import React from "react";
import {IcoMoon, View} from "../UI";
import MaskedView from '@react-native-community/masked-view'
import {LinearGradient, LinearGradientProps} from 'expo-linear-gradient';
import {createStyles} from "./styles";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {IcoMoonProps} from "../../types";
import {StyleProp, TextStyle} from "react-native";

export type LinearGradientIconProps = IcoMoonProps & Omit<LinearGradientProps, 'colors'> & {
    colors?: string[],
    style?: StyleProp<TextStyle>
}

export function LinearGradientIcon(props: LinearGradientIconProps) {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {theme} = themeLabor;
    const {name, size, colors, start, end, locations, ...rest} = props;
    const {designsBasedOn} = sizeLabor
    const {wp} = designsBasedOn.iphoneX
    const finalSize = size || wp(20),
        colorsDefault = [theme.colors.btnBackground, theme.colors.btnBackground2],
        startDefault = {x: 0, y: 0},
        endDefault = {x: 0, y: 1};

    const styles = createStyles(sizeLabor, themeLabor)
    return (
        <View style={{width: finalSize, height: finalSize}} {...rest}>
            <MaskedView
                style={{flex: 1, flexDirection: 'row', width: finalSize, height: finalSize}}
                maskElement={
                    <View
                        style={{
                            backgroundColor: 'transparent',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <IcoMoon
                            name={name}
                            size={finalSize}
                            color={colors ? colors[0] : colorsDefault[0]}
                        />
                    </View>
                }>
                <LinearGradient
                    locations={locations}
                    start={start || startDefault} end={end || endDefault}
                    colors={colors || colorsDefault}
                    style={{flex: 1}}
                />
            </MaskedView>
        </View>
    )
}
