import React from "react";
import {getStyles} from "./styles";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {IcoMoon} from "../UI";
import {LinearGradientIconProps} from "./LinearGradientIcon";

export function LinearGradientIcon(props: LinearGradientIconProps) {
    const {name, size, colors} = props;
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {theme} = themeLabor;
    const {designsBasedOn} = sizeLabor
    const {wp} = designsBasedOn.iphoneX
    const finalSize = size || wp(20),
        colorsDefault = [theme.colors.btnBackground, theme.colors.btnBackground2];
    const styles = getStyles(sizeLabor, themeLabor)
    return (
        <IcoMoon
            name={name}
            size={finalSize}
            color={colors ? colors[0] : colorsDefault[0]}
        />
    )
}
