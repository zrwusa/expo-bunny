import React from "react";
import {createStyles} from "./styles";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {IcoMoon} from "../UI";
import {LinearGradientIconProps} from "./LinearGradientIcon";

export function LinearGradientIcon(props:LinearGradientIconProps) {
    const {name, size, colors} = props;
    const sizeDefault = 40, colorsDefault = ['#fff', '#0f0']

    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = createStyles(sizeLabor, themeLabor)
    return (
        <IcoMoon
            name={name}
            size={size || sizeDefault}
            color={colors?colors[1]:colorsDefault[1]}
        />
    )
}
