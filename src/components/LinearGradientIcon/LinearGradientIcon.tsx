import React from "react";
import {IcoMoon, View} from "../UI";
import MaskedView from '@react-native-community/masked-view'
import {LinearGradient, LinearGradientProps} from 'expo-linear-gradient';
import {createStyles} from "./styles";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {IcoMoonProps} from "../../types";
import {StyleProp, TextStyle} from "react-native";

export type LinearGradientIconProps =IcoMoonProps & { style?: StyleProp<TextStyle> } & LinearGradientProps

export function LinearGradientIcon(props: LinearGradientIconProps) {
    const {name, size, colors, start, end, locations, ...rest} = props;
    const sizeDefault = 40, colorsDefault = ['#fff', '#0f0'],
        startDefault = {x: 0, y: 0}, endDefault = {x: 0, y: 1};

    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = createStyles(sizeLabor, themeLabor)
    return (
        <View style={{width: size, height: size}} {...rest}>
            <MaskedView
                style={{flex: 1, flexDirection: 'row', height: size}}
                maskElement={
                    <View
                        style={{
                            backgroundColor: 'transparent',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <IcoMoon
                            name={name}
                            size={size || sizeDefault}
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
