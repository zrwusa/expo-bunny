import {ColorDiffWithPaletteItem, ColorDiffWithThemeColorsItem, ColorInputItem} from "../../types";
import {Text, View} from "../UI";
import {CopyableText} from "../CopyableText";
import React from "react";
import {createStyles} from "./styles";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";

export const ColorValuesCard = (props: { item: ColorDiffWithThemeColorsItem | ColorDiffWithPaletteItem | ColorInputItem }) => {
    const {item} = props
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = createStyles(sizeLabor,themeLabor)
    return <View>
        <View style={styles.row}>
            <Text>hex</Text>
            <CopyableText>{item.hex}</CopyableText>
            <View style={[styles.colorPanel, {backgroundColor: item.hex}]}/>
        </View>
        <View style={styles.row}>
            <Text>RGB</Text>
            <CopyableText>{item.RGB}</CopyableText>
            <View style={[styles.colorPanel, {backgroundColor: item.RGB}]}/>
        </View>
        <View style={styles.row}>
            <Text>HSL</Text>
            <CopyableText>{item.HSL}</CopyableText>
            <View style={[styles.colorPanel, {backgroundColor: item.HSL}]}/>
        </View>
    </View>
}
